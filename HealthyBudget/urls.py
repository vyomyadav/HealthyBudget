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
from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from rest_framework.authtoken.views import obtain_auth_token
from . import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('authentication.urls')),
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
    path('api/', include('myapi.urls')),
    path('budget/transactions/add/', views.add_transaction, name='add_transaction'),
    path('budget/transactions/', views.get_transactions, name='get_transactions'),
    path('budget/transactions/delete/<int:id>/', views.delete_transaction, name='delete_transaction'),
    path('budget/budgets/add/', views.add_budget, name='add_budget'),
    path('budget/budgets/', views.get_budgets, name='get_budgets'),
    path('budget/budgets/delete/<int:id>/', views.delete_budget, name='delete_budget'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


