from django.shortcuts import redirect, render
from django.http import HttpResponse
from django.contrib.auth import get_user_model, authenticate, login, logout
from django.contrib import messages
from django.core.mail import send_mail
from HealthyBudget import settings

# Create your views here.
def home(request):
    return render(request,"authentication/index.html")

def signup(request):
    if request.method == "POST":
        #username = request.POST.get('username')
        fname = request.POST.get('fname')
        lname = request.POST.get('lname')
        email = request.POST.get('email')
        phoneNumber = request.POST.get('phone')
        pass1= request.POST.get('pass1')
        pass2 = request.POST.get('pass2')

        User = get_user_model()

        if User.objects.filter(email=email):
            messages.error(request, "Email Address has already been used! Please try another one")
        
        if pass1 != pass2:
            messages.error(request, "Password didn't match!")
        


        myuser = User.objects.create_user(email, fname, lname, pass1)
        myuser.first_name = fname
        myuser.last_name = lname
        myuser.phone_number = phoneNumber 

        myuser.save()

        messages.success(request, "Your Account has been successfully created. We have sent you a confirmation email, please confirm your email in order to activate your account")


        #Welcome Email
        subject = "Email to Healthy Budget!"
        message = "Hello" + myuser.first_name + "!! \n" + "Welcome to Healthy Budget!! \n Thank you for using our app \n We have also sent you a confirmation email, please confirm your email address in order to activate your account. \n\n Thank you"
        from_email = settings.EMAIL_HOST_USER
        to_list = [myuser.email]
        try:
            send_mail(subject, message, from_email, to_list, fail_silently=False)
        except Exception as e:
            # Log the error or send it to your error tracking system
            print(e)
            messages.warning(request, "There was an error sending the welcome email. Please contact support.")

        return redirect('signin')


    return render(request, "authentication/signup.html")

def signin(request):
    if request.method == 'POST':
        email = request.POST['email']
        pass1 = request.POST.get('pass1')

        user = authenticate(request, email=email, password=pass1)

        if user is not None:
            login(request, user)
            fname = user.first_name
            return render(request, "authentication/index.html", {'fname': fname})
        else:
            messages.error(request, "The password is incorrect")
            return redirect('home')

    return render(request, "authentication/signin.html")

def signout(request):
    logout(request)
    messages.success(request, "Logged Out Successfully!")
    return redirect('home')