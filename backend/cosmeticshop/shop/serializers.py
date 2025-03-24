from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product ,UserRole
# , CartItem, WishlistItem, Review
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        try:
            user_role = UserRole.objects.get(user=user)
            token['role'] = user_role.role
            
        except UserRole.DoesNotExist:
            token['role'] = 'undefined'  # Default value or error handling

        return token
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username","password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


# class FavoriteSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Favorite
#         fields = '__all__'


# class CartItemSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CartItem
#         fields = '__all__'

# class WishlistItemSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = WishlistItem
#         fields = '__all__'

# class ReviewSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Review
#         fields = '__all__'
