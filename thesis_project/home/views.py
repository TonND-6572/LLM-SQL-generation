from django.shortcuts import render
from django.http import JsonResponse
from django.shortcuts import HttpResponse
from django.core import serializers
from django.views.decorators.http import require_http_methods
from .apps import HomeConfig
# Create your views here.

@require_http_methods(["GET"])
def ask_for_sql(request):
    context = {}
    return render(request, 'index.html', context=context)


utils = HomeConfig('home', __name__)
utils.ready()

@require_http_methods(["POST"])
def answer_sql(request):
    tables = {
        "people_name": ["id", "name"],
        "people_age": ["people_id", "age"]
    }
    if request.method == "POST" and request.headers.get('x-requested-with') == 'XMLHttpRequest':
        form_data = request.POST
        question = form_data.get('question')
        answer = utils.inference(question=question, tables=tables)
        response_data = {
            'answer': answer
        }
        return JsonResponse(response_data)
    return JsonResponse({'error': 'Invalid request'}, status=400)
