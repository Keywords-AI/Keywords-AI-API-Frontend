from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny
# Create your views here.
from django.shortcuts import render

# Create your views here.
def index(request, *args, **kwargs):
    return render(request, template_name='frontend/index.html')

@api_view(['GET'])
@permission_classes([AllowAny])
@ensure_csrf_cookie
def get_csrf(request):
    response = Response({"success": "CSRF cookie set"})
    return response

@api_view(['POST'])
@permission_classes([AllowAny])
def hello_world(request):
    print(request.data)
    return Response({"success": "Hello, world!"})