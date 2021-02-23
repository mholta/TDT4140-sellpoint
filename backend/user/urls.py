from django.urls import path
from .views import user_view, UserDetailedView, user_list,user


urlpatterns = [
    path('', user_view),
    path('<pk>', UserDetailedView.as_view()),
    path('post/', user_list),
    path('all/', user.as_view())
]