from rest_framework import generics
from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from .serializers import UserSerializer
from .models import User
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

# GET - all users
class all_users(generics.ListAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer

# Use cases
# POST - log in
# DELETE - delete user
# PUT - update user
@api_view(['POST','PUT','DELETE'])
def user_view(request):
  
  # Create user
  if request.method == 'POST':
    # Checks is user with email exists in db
    if (User.objects.all().filter(email=request.data['email']).count() > 0):
      # Get user with matching email
      user = User.objects.get(email=request.data['email'])

      # Print password in dev env
      print('Password:')
      print(user.password)

      # Checks if password matches
      if (request.data['password'] == user.password):
        # Send json responce with the user object
        serializer = UserSerializer(user, many = False)
        return JsonResponse(serializer.data, safe=False)
      else:
        # If passowrd is wrong
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    else:
      # If user is not found with email
      return Response(status=status.HTTP_404_NOT_FOUND)

  # Update user
  elif request.method == 'PUT':
    # Find user with id og send 404 if not found
    try:
        user = User.objects.get(pk=request.data['id'])
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    # Prepare for updating current user
    serializer = UserSerializer(user, data=request.data)
    if serializer.is_valid():
      # Update user object
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  # Delete user
  elif request.method == 'DELETE':
    # Find user object and delete user
    User.objects.get(pk=request.data['pk']).delete()
    return HttpResponse()

# GET - user by id
class user_by_id(generics.RetrieveAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer

# POST - create a new user 
@api_view(['POST'])
def user_list(request):

  # Create a new user 
  if request.method == 'POST':
    # Create serializer with data from new user object
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
      # Save user
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    # TODO: Implement error handling when trying to post a user that already exists
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


