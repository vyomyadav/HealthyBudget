from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.forms import FileInput

from HealthyBudget.models import User
from myapi.models import Profile

class UserUpdateForm(forms.ModelForm):
    class Meta:
        model = User 
        fields = ['email', 'phone_number']

class ProfileUpdateForm(forms.ModelForm):
    first_name = forms.CharField(widget=forms.TextInput(attrs={'class': 'bg-light form-control', 'placeholder': 'Emma'}))
    last_name = forms.CharField(widget=forms.TextInput(attrs={'class': 'bg-light form-control', 'placeholder': 'Smith'}))
    email = forms.EmailField(widget=forms.TextInput(attrs={'class': 'bg-light form-control', 'placeholder': 'Emma@example.com'}))
    phone = forms.CharField(widget=forms.TextInput(attrs={'class': 'bg-light form-control', 'placeholder': '+1 (929) 666-898'}))

    class Meta:
        model = Profile
        fields = ['image', 'first_name', 'last_name', 'phone', 'email', 'country', 'city', 'state']

        widgets = {
            'image': FileInput(attrs={"onchange": "loadFile(event)", "class": "upload"})  
        }
        