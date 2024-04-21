"""
URL configuration for HealthyBudget project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from . import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('authentication.urls')),
    path('api/', include('myapi.urls')),
    path('budget/incomes/add/', views.add_income, name='add_income'),
    path('budget/expenses/add/', views.add_expense, name='add_expense'),
    path('budget/incomes/', views.get_incomes, name='get_incomes'),
    path('budget/expenses/', views.get_expenses, name='get_expenses'),
    path('budget/incomes/delete/<int:id>/', views.delete_income, name='delete_income'),
    path('budget/expenses/delete/<int:id>/', views.delete_expense, name='delete_expense'),
]
