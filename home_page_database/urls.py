# home_page_database/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('expenses/add/', views.add_expense, name='add_expense'),
    path('expenses/', views.get_expenses, name='get_expenses'),
    path('expenses/delete/<int:id>/', views.delete_expense, name='delete_expense'),
    # Add URL patterns for Income views similarly

    path('incomes/add/', views.add_income, name='add_income'),
    path('incomes/', views.get_incomes, name='get_incomes'),
    path('incomes/delete/<int:id>/', views.delete_income, name='delete_income'),
]
