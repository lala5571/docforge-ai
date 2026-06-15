from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login
from .models import User

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    email = request.data.get('email')
    password = request.data.get('password')
    name = request.data.get('name', '')

    if not email or not password:
        return Response({'error': 'Email and password required'}, status=400)

    if User.objects.filter(email=email).exists():
        return Response({'error': 'Email already exists'}, status=400)

    user = User.objects.create_user(
        username=email,
        email=email,
        password=password,
        first_name=name
    )

    return Response({
        'message': 'Account created!',
        'user': {
            'id': str(user.id),
            'email': user.email,
            'name': user.first_name
        }
    }, status=201)


@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    email = request.data.get('email')
    password = request.data.get('password')

    user = authenticate(request, username=email, password=password)

    if user:
        login(request, user)
        return Response({
            'message': 'Login successful!',
            'user': {
                'id': str(user.id),
                'email': user.email,
                'name': user.first_name
            }
        })
    else:
        return Response({'error': 'Invalid email or password'}, status=400)


@api_view(['GET'])
def me(request):
    user = request.user
    return Response({
        'id': str(user.id),
        'email': user.email,
        'name': user.first_name,
        'total_documents': user.total_documents
    })