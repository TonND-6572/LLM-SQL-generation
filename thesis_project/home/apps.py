from django.apps import AppConfig
from typing import List, Dict
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

class HomeConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "home"
    path = 'home'

    def ready(self):
        # Load the model and tokenizer when the app starts
        model_name = 'juierror/flan-t5-text2sql-with-schema-v2'
        self.model = AutoModelForSeq2SeqLM.from_pretrained(model_name)
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)

    def get_prompt(self, tables, question):
        prompt = f"""convert question and table into SQL query. tables: {tables}. question: {question}"""
        return prompt

    def prepare_input(self, question: str, tables: Dict[str, List[str]]):
        tables = [f"""{table_name}({",".join(tables[table_name])})""" for table_name in tables]
        tables = ", ".join(tables)
        prompt = self.get_prompt(tables, question)
        input_ids = self.tokenizer(prompt, max_length=512, return_tensors="pt").input_ids
        return input_ids

    def inference(self, question: str, tables: Dict[str, List[str]]) -> str:
        input_data = self.prepare_input(question=question, tables=tables)
        input_data = input_data.to(self.model.device)
        outputs = self.model.generate(inputs=input_data, num_beams=10, top_k=10, max_length=512)
        result = self.tokenizer.decode(token_ids=outputs[0], skip_special_tokens=True)
        return result
