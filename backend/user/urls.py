from django.urls import path
from .views import user_view, user_by_id, user_list, all_users, user_view_from_token

urlpatterns = [

    # POST - log in
    # DELETE - delete user
    # PUT - update user
    path('', user_view),

    # GET - user by id
    path('<pk>', user_by_id.as_view()),

    # POST - create new user
    path('post/', user_list),

    # GET - all users
    path('all/', all_users.as_view()),

    # POST - get user with id and token
    path('from_token/', user_view_from_token),

]