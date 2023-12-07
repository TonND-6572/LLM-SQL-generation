from django.shortcuts import render
from django.http import JsonResponse
from django.shortcuts import HttpResponse
from django.core import serializers
from django.views.decorators.http import require_http_methods
from .apps import HomeConfig
import json
from typing import Dict, List
# Create your views here.

@require_http_methods(["GET"])
def ask_for_sql(request):
    context = {}
    return render(request, 'index.html', context=context)


utils = HomeConfig('home', __name__)
utils.ready()

@require_http_methods(["POST"])
def answer_sql(request):
    try:
        json_data = json.loads(request.body.decode('utf-8'))
        question = json_data.get('question', '')
        print("question:", question)
        answer = utils.inference(question)
        response_data = {'answer': answer}
        return JsonResponse(response_data)
    except json.JSONDecodeError as e:
        print("JSON decoding error:", str(e))
        return JsonResponse({'error': 'Invalid JSON data'}, status=400)