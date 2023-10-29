from django.urls import path
from .views import ask_for_sql, answer_sql

urlpatterns = [
    path('', ask_for_sql, name='ask_for_sql'),
    path('chat', answer_sql, name='answer_sql'),
]