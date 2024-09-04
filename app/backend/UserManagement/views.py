from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponse
from django.contrib.auth import authenticate, login as auth_login
from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from .forms import UserCreationForm
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from rest_framework_simplejwt.tokens import RefreshToken
import json
import uuid
from rest_framework import status
from .serializers import UserSerializer

from django.http import HttpResponseRedirect

from rest_framework.views import APIView
# from rest_framework.permissions import IsAuthenticated

from .models import User

# from .forms import UserProfileForm
#pass=Aymene@@13+
#gmail=mo7a1@gmail.com


@csrf_exempt  # Disable CSRF for this view for testing purposes
def login(request):
    if request.method == 'POST':
        try:
            # Parse JSON data from request body
            data = json.loads(request.body.decode('utf-8'))
            # data = request.POST
            email = data.get('email')
            password = data.get('password')

            # Authenticate the user
            user = authenticate(request, email=email, password=password)
            print(f"Authenticated user: {email}, {password}, {user}")

            if user is not None:
                auth_login(request, user)

                # Generate JWT tokens
                refresh = RefreshToken.for_user(user)
                access_token = str(refresh.access_token)
                refresh_token = str(refresh)

                # Set the access token in the cookie
                response = JsonResponse({
                    'refresh_token': refresh_token,
                    'message': 'User authenticated successfully'
                })

                # response = HttpResponseRedirect('/dashboard')
                # Set the access token as a HttpOnly cookie
                response.set_cookie(
                    key='access_token',
                    value=access_token,
                    domain='localhost',
                    httponly=True,
                    secure=True,  # Ensure cookies are only sent over HTTPS
                    samesite='None'  # Adjust this according to your CSRF needs
                )
                
                return response
            else:
                return JsonResponse({'error': 'Invalid credentials'}, status=401)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    else:
        return render(request, 'login.html')
        # return JsonResponse({'error': 'Invalid request method'}, status=405)

def generate_random_username():
    prefix = 'moha_'
    suffix = str(uuid.uuid4())[:8]
    return prefix + suffix

@csrf_exempt  # Disable CSRF for this view for testing purposes
def register(request):
    if request.method == 'POST':
        try:
            # Parse the JSON data from the request body
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)

        # Initialize the form with the JSON data
        # insert dummy username into the data json using uuid
        dummy = generate_random_username()
        data.update({'username': dummy})
        print(f"Data: {data}")
        form = UserCreationForm(data)
        if form.is_valid():
            user = form.save(commit=False)
            user.save()
            return JsonResponse({'message': 'User created successfully'}, status=201)
        else:
            # Return form errors as JSON
            return JsonResponse(form.errors, status=400)
    else:
        return render(request, 'register.html')

def generate_random_username():
    prefix = 'moha_'
    suffix = str(uuid.uuid4())[:8]
    return prefix + suffix

@csrf_exempt  # Disable CSRF for this view for testing purposes
def register(request):
    if request.method == 'POST':
        try:
            # Parse the JSON data from the request body
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)

        # Initialize the form with the JSON data
        # insert dummy username into the data json using uuid
        dummy = generate_random_username()
        data.update({'username': dummy})
        print(f"Data: {data}")
        form = UserCreationForm(data)
        if form.is_valid():
            user = form.save(commit=False)
            user.save()
            return JsonResponse({'message': 'User created successfully'}, status=201)
        else:
            # Return form errors as JSON
            return JsonResponse(form.errors, status=400)
    else:
        return render(request, 'register.html')


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh',
        '/api/token/verify',
        '/api/login',
        '/api/register',
    ]

    return Response(routes)


def display_text(request):
    text = request.GET.get('text', '')
    return HttpResponse(f'Text: {text}')


# class UserProfileView(APIView):

#     def get(self, request):
#         try:
#             user = User.objects.first()
#         except User.DoesNotExist:
#             return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
#         serializer = UserSerializer(user)
#         return Response(serializer.data)

#     @csrf_exempt
#     def update(self, request):
#         if request.method == 'PUT':
#             try:
#                 user = User.objects.first()
#             except User.DoesNotExist:
#                 return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
#             serializer = UserSerializer(user, data=request.data)
#             if serializer.is_valid():
#                 serializer.save()
#                 Response['Access-Control-Allow-Origin'] = 'http://localhost:5173'
#                 return Response(serializer.data)
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#         else:
#             return Response({'error': 'method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

#     # def update(self, instance, validated_data):
#     #     instance.first_name = validated_data.get('first_name', instance.first_name)
#     #     instance.last_name = validated_data.get('last_name', instance.last_name)
#     #     instance.email = validated_data.get('email', instance.email)
#     #     instance.phone_number = validated_data.get('mobile_number', instance.phone_number)
#     #     instance.username = validated_data.get('username', instance.username)
#     #     instance.bio = validated_data.get('bio', instance.bio)
#     #     instance.save()
#     #     return instance


# ----------------------------------------------------------------------------------
# @api_view(['GET', 'PUT'])
# @csrf_exempt
# def user_profile(request):
#     if request.method == 'GET':
#         try:
#             user = User.objects.first()
#         except User.DoesNotExist:
#             return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
#         serializer = UserSerializer(user)
#         return Response(serializer.data)
    
#     if request.method == 'PUT':
#         try:
#             user = User.objects.first()
#         except User.DoesNotExist:
#             return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

# ----------------------------------------------------------------------------------

@csrf_exempt
@api_view(['GET'])
def get_user(request, pk):
    try:
        user = User.objects.get(id=pk)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    serializer = UserSerializer(user)
    return Response(serializer.data)

@csrf_exempt
@api_view(['PUT'])
def update_user(request, pk):
    if request.method == 'PUT':
        try:
            user = User.objects.get(id=pk)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)