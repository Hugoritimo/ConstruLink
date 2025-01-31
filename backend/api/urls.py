from django.urls import path
from .views import ProductView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('products/', ProductView.as_view(), name='product-list'),
]
