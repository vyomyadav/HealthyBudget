from django.shortcuts import render
from django.http import JsonResponse
from .models import Transaction, Budget, User
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt, csrf_protect
import json
from dateutil import parser
from decimal import Decimal, InvalidOperation
import logging

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from myapi.serializers import UserSerializer

logger = logging.getLogger(__name__)

@csrf_exempt
@require_http_methods(["POST"])
def add_transaction(request):
    try:
        data = json.loads(request.body)
        title = data.get('title')
        amount = data.get('amount')
        transaction_type = data.get('type')  # 'income' or 'expense'
        category = data.get('category')
        description = data.get('description')
        date_str = data.get('date')

        # Validate all fields are provided
        if not (title and transaction_type and category and description and date_str):
            return JsonResponse({'message': 'All fields are required!'}, status=400)

        # Validate and convert amount
        try:
            amount = Decimal(amount)
        except (InvalidOperation, TypeError, ValueError):
            return JsonResponse({'message': 'Amount must be a positive number!'}, status=400)
        if amount <= 0:
            return JsonResponse({'message': 'Amount must be a positive number!'}, status=400)

        # Validate and parse date
        try:
            date_obj = parser.parse(date_str).date()
        except ValueError:
            return JsonResponse({'message': 'Invalid date format!'}, status=400)

        # Create and save transaction
        transaction = Transaction(
            title=title,
            amount=amount,
            type=transaction_type,
            category=category,
            description=description,
            date=date_obj
        )
        transaction.save()
        return JsonResponse({'message': f'{transaction_type.capitalize()} Added'}, status=200)
    except Exception as e:
        logger.exception("Error adding transaction")
        return JsonResponse({'message': 'Server Error'}, status=500)

@csrf_exempt
@require_http_methods(["GET"])
def get_transactions(request):
    try:
        # Query both incomes and expenses
        transactions = list(Transaction.objects.all().values().order_by('-created_at'))
        return JsonResponse(transactions, safe=False, status=200)
    except Exception as e:
        logger.exception("Error retrieving transactions")
        return JsonResponse({'message': 'Server Error'}, status=500)

@csrf_exempt
@require_http_methods(["DELETE"])
def delete_transaction(request, id):
    try:
        transaction = Transaction.objects.get(pk=id)
        transaction_type = transaction.type  # Save the type for the response message
        transaction.delete()
        return JsonResponse({'message': f'{transaction_type.capitalize()} Deleted'}, status=200)
    except Transaction.DoesNotExist:
        return JsonResponse({'message': 'Transaction not found'}, status=404)
    except Exception as e:
        logger.exception("Error deleting transaction")
        return JsonResponse({'message': 'Server Error'}, status=500)

@csrf_exempt
@require_http_methods(["POST"])
def add_budget(request):
    try:
        data = json.loads(request.body)
        title = data.get('title')
        amount = data.get('amount')
        date_str = data.get('date')
        description = data.get('description')

        if not (title and amount and date_str and description):
            return JsonResponse({'message': 'All fields are required!'}, status=400)

        try:
            amount = Decimal(amount)
        except (InvalidOperation, TypeError, ValueError):
            return JsonResponse({'message': 'Amount must be a positive number!'}, status=400)

        if amount <= 0:
            return JsonResponse({'message': 'Amount must be greater than zero!'}, status=400)

        try:
            date_obj = parser.parse(date_str).date()
        except ValueError:
            return JsonResponse({'message': 'Invalid date format!'}, status=400)

        budget = Budget(
            title=title,
            amount=amount,
            date=date_obj,
            description=description
        )
        budget.save()
        return JsonResponse({'message': 'Budget Added'}, status=200)
    except Exception as e:
        logger.exception("Error adding budget")
        return JsonResponse({'message': 'Server Error'}, status=500)

@csrf_exempt
@require_http_methods(["GET"])
def get_budgets(request):
    try:
        budgets = list(Budget.objects.all().values().order_by('-created_at'))
        return JsonResponse(budgets, safe=False, status=200)
    except Exception as e:
        logger.exception("Error retrieving budgets")
        return JsonResponse({'message': 'Server Error'}, status=500)

@csrf_exempt
@require_http_methods(["DELETE"])
def delete_budget(request, id):
    try:
        budget = Budget.objects.get(pk=id)
        budget.delete()
        return JsonResponse({'message': 'Budget Deleted'}, status=200)
    except Budget.DoesNotExist:
        return JsonResponse({'message': 'Budget not found'}, status=404)
    except Exception as e:
        logger.exception("Error deleting budget")
        return JsonResponse({'message': 'Server Error'}, status=500)

