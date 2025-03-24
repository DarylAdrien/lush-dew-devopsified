from django.contrib import admin
from django.urls import path,include
from shop import views
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from shop.views import CustomTokenObtainPairView 

urlpatterns = [
    path('admin/', admin.site.urls),

    path("api/user/register/", views.create_user, name="register"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),


    path('api/', include('shop.urls')),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)