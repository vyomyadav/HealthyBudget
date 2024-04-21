from django.shortcuts import render
from django.http import JsonResponse
from .models import Income, Expense
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
import json
from dateutil import parser
from decimal import Decimal, InvalidOperation

"""
@csrf_exempt
@require_http_methods(["POST"])
def add_income(request):
    try:
        data = json.loads(request.body)
        title = data.get('title')
        amount = data.get('amount')
        category = data.get('category')
        description = data.get('description')
        date = data.get('date')

        if not (title and category and description and date):
            return JsonResponse({'message': 'All fields are required!'}, status=400)

        if amount <= 0 or not isinstance(amount, (int, float)):
            return JsonResponse({'message': 'Amount must be a positive number!'}, status=400)

        income = Income(title=title, amount=amount, category=category, description=description, date=date)
        income.save()
        return JsonResponse({'message': 'Income Added'}, status=200)
    except Exception as e:
        return JsonResponse({'message': 'Server Error'}, status=500)
"""

import logging

logger = logging.getLogger(__name__)
@csrf_exempt
@require_http_methods(["POST"])
def add_income(request):
    try:
        data = json.loads(request.body)
        title = data.get('title')
        amount = data.get('amount')
        category = data.get('category')
        description = data.get('description')
        date = data.get('date')

        if not (title and category and description and date):
            return JsonResponse({'message': 'All fields are required!'}, status=400)

        try:
            amount = float(amount)  # Convert amount to float
        except ValueError:
            return JsonResponse({'message': 'Amount must be a number!'}, status=400)

        if amount <= 0:
            return JsonResponse({'message': 'Amount must be a positive number!'}, status=400)

        try:
            parsed_date = parser.isoparse(date).date()  # Convert ISO format to date
        except ValueError:
            return JsonResponse({'message': 'Invalid date format!'}, status=400)

        income = Income(title=title, amount=amount, category=category, description=description, date=parsed_date)
        income.save()
        return JsonResponse({'message': 'Income Added'}, status=200)
    except Exception as e:
        return JsonResponse({'message': 'Server Error'}, status=500)

@csrf_exempt
@require_http_methods(["GET"])
def get_incomes(request):
    try:
        incomes = list(Income.objects.all().values().order_by('-created_at'))
        return JsonResponse(incomes, safe=False, status=200)
    except Exception as e:
        return JsonResponse({'message': 'Server Error'}, status=500)

@csrf_exempt
@require_http_methods(["DELETE"])
def delete_income(request, id):
    try:
        income = Income.objects.get(pk=id)
        income.delete()
        return JsonResponse({'message': 'Income Deleted'}, status=200)
    except Income.DoesNotExist:
        return JsonResponse({'message': 'Income not found'}, status=404)
    except Exception as e:
        return JsonResponse({'message': 'Server Error'}, status=500)
    


"""
def add_expense(request):
    try:
        data = json.loads(request.body)
        title = data.get('title')
        amount = data.get('amount')
        category = data.get('category')
        description = data.get('description')
        date = data.get('date')

        if not (title and category and description and date):
            return JsonResponse({'message': 'All fields are required!'}, status=400)

        if amount <= 0 or not isinstance(amount, (int, float)):
            return JsonResponse({'message': 'Amount must be a positive number!'}, status=400)

        expense = Expense(title=title, amount=amount, category=category, description=description, date=date)
        expense.save()
        return JsonResponse({'message': 'Expense Added'}, status=200)
    except Exception as e:
        return JsonResponse({'message': 'Server Error'}, status=500)
"""
@csrf_exempt
@require_http_methods(["POST"])
def add_expense(request):
    try:
        data = json.loads(request.body)
        title = data.get('title')
        amount = data.get('amount')
        category = data.get('category')
        description = data.get('description')
        date_str = data.get('date')  # Use date_str to clarify that this is a string

        if not (title and category and description and date_str):
            return JsonResponse({'message': 'All fields are required!'}, status=400)

        # Convert amount to Decimal for financial calculations
        try:
            amount = Decimal(amount)
        except (InvalidOperation, TypeError, ValueError):
            return JsonResponse({'message': 'Amount must be a positive number!'}, status=400)

        if amount <= 0:
            return JsonResponse({'message': 'Amount must be a positive number!'}, status=400)

        # Parse the date string into a date object
        try:
            date_obj = parser.parse(date_str).date()
        except ValueError:
            return JsonResponse({'message': 'Invalid date format!'}, status=400)

        expense = Expense(title=title, amount=amount, category=category, description=description, date=date_obj)
        expense.save()
        return JsonResponse({'message': 'Expense Added'}, status=200)
    except Exception as e:
        return JsonResponse({'message': 'Server Error: {}'.format(e)}, status=500)

@csrf_exempt
@require_http_methods(["GET"])
def get_expenses(request):
    try:
        expenses = list(Expense.objects.all().values().order_by('-created_at'))
        return JsonResponse(expenses, safe=False, status=200)
    except Exception as e:
        return JsonResponse({'message': 'Server Error'}, status=500)

@csrf_exempt
@require_http_methods(["DELETE"])
def delete_expense(request, id):
    try:
        expense = Expense.objects.get(pk=id)
        expense.delete()
        return JsonResponse({'message': 'Expense Deleted'}, status=200)
    except Expense.DoesNotExist:
        return JsonResponse({'message': 'Expense not found'}, status=404)
    except Exception as e:
        return JsonResponse({'message': 'Server Error'}, status=500)