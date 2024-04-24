from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.forms import FileInput

from myapi.models import User, Profile

class UserUpdateForm(forms.ModelForm):
    class Meta:
        model = User 
        fields = ['email', 'phone']

class ProfileUpdateForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['image', 'first_name', 'last_name', 'phone', 'email', 'country', 'city', 'state']

        widgets = {
            'image': FileInput(attrs={"onchange": "loadFile(event)", "class": "upload"})  
        }
        