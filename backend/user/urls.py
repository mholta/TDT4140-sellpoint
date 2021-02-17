from django.urls import path
from .views import UserView, UserList, UserDetailedView


urlpatterns = [
    path('', UserView.as_view()),
    path('all', UserList),
    path('<pk>', UserDetailedView.as_view())
]