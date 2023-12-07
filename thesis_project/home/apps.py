from django.apps import AppConfig
from typing import List, Dict
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

class HomeConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "home"
    path = 'home'

    def ready(self):
        # Load the model and tokenizer when the app starts
        # model_name = 'models/ViText2Sql-ViT5-finetuning-2'
        model_name = 'models/Ver3-ViText2Sql-ViT5'
        # model_name = 'models/ViText2Sql-ViT5'
        self.model = AutoModelForSeq2SeqLM.from_pretrained(model_name)
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)

    def inference(self, input):
        print('input')
        test_data = self.tokenizer(input, max_length=712, return_tensors="pt").input_ids
        test_data = test_data.to(self.model.device)
        output = self.model.generate(inputs = test_data, num_beams=10, top_k=10, max_length=512)
        return self.tokenizer.decode(output[0], skip_special_tokens=True, clean_up_tokenization_spaces=True)
