# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Product 
# , CartItem, WishlistItem, Review
from .serializers import ProductSerializer ,CustomTokenObtainPairSerializer , UserSerializer
# , CartItemSerializer, WishlistItemSerializer, ReviewSerializer , UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import UserRole





# @api_view(['POST'])
# @permission_classes([AllowAny])
# def create_user(request):
    
#     serializer = UserSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data)
    

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def get_user_info(request):
#     user = request.user
#     data = {
#         'username': user.username
#     }
#     return Response(data)
# ---------------------------- PRODUCTS ---------------------------- #

def product_list(request):
    category = request.GET.get('category', None)  # Get category from query params
    if category:
        products = Product.objects.filter(category=category)
    else:
        products = Product.objects.all()
    
    serializer = ProductSerializer(products, many=True)
    return JsonResponse(serializer.data, safe=False)

def product_detail(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    serializer = ProductSerializer(product)
    print(serializer)
    return JsonResponse(serializer.data, safe=False)

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

@api_view(['POST'])
@permission_classes([AllowAny])
def create_user(request):
    
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    user = request.user

    # Retrieve user's role from UserRole model
    user_role = UserRole.objects.filter(user=user).first()
    role = user_role.role if user_role else "normal"  # Default to "normal" if no role is assigned

    print(role)

    data = {
        'username': user.username,
        'role': role
    }
    return Response(data)

# @method_decorator(csrf_exempt, name='dispatch')
# def favorite_list_create(request):
#     """Handles listing and creating favorite items."""
#     if request.method == "GET":
#         favorites = Favorite.objects.filter(user=request.user)
#         serializer = FavoriteSerializer(favorites, many=True)
#         return JsonResponse(serializer.data, safe=False)
    
#     elif request.method == "POST":
#         data = json.loads(request.body)
#         serializer = FavoriteSerializer(data=data)
#         if serializer.is_valid():
#             serializer.save(user=request.user)
#             return JsonResponse(serializer.data, status=201)
#         return JsonResponse(serializer.errors, status=400)

# @method_decorator(csrf_exempt, name='dispatch')
# def favorite_delete(request, pk):
#     """Handles deleting a favorite item."""
#     if request.method == "DELETE":
#         favorite = get_object_or_404(Favorite, id=pk, user=request.user)
#         favorite.delete()
#         return JsonResponse({"message": "Favorite deleted successfully"}, status=204)

#     return JsonResponse({"error": "Method not allowed"}, status=405)

# @api_view(['GET', 'POST'])
# def product_list(request):
#     if request.method == 'GET':
#         products = Product.objects.all()
#         serializer = ProductSerializer(products, many=True)
#         return Response(serializer.data)
    
#     elif request.method == 'POST':
#         serializer = ProductSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['GET', 'PUT', 'DELETE'])
# def product_detail(request, pk):
#     product = get_object_or_404(Product, pk=pk)
    
#     if request.method == 'GET':
#         serializer = ProductSerializer(product)
#         return Response(serializer.data)
    
#     elif request.method == 'PUT':
#         serializer = ProductSerializer(product, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#     elif request.method == 'DELETE':
#         product.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

# # ---------------------------- CART ---------------------------- #

# @api_view(['GET', 'POST'])
# @permission_classes([IsAuthenticated])
# def cart_list(request):
#     if request.method == 'GET':
#         cart_items = CartItem.objects.filter(user=request.user)
#         serializer = CartItemSerializer(cart_items, many=True)
#         return Response(serializer.data)
    
#     elif request.method == 'POST':
#         serializer = CartItemSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save(user=request.user)  # Assign logged-in user
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['GET', 'PUT', 'DELETE'])
# @permission_classes([IsAuthenticated])
# def cart_detail(request, pk):
#     cart_item = get_object_or_404(CartItem, pk=pk, user=request.user)
    
#     if request.method == 'GET':
#         serializer = CartItemSerializer(cart_item)
#         return Response(serializer.data)
    
#     elif request.method == 'PUT':
#         serializer = CartItemSerializer(cart_item, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#     elif request.method == 'DELETE':
#         cart_item.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

# # ---------------------------- WISHLIST ---------------------------- #

# @api_view(['GET', 'POST'])
# @permission_classes([IsAuthenticated])
# def wishlist_list(request):
#     if request.method == 'GET':
#         wishlist_items = WishlistItem.objects.filter(user=request.user)
#         serializer = WishlistItemSerializer(wishlist_items, many=True)
#         return Response(serializer.data)
    
#     elif request.method == 'POST':
#         serializer = WishlistItemSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save(user=request.user)  # Assign logged-in user
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['GET', 'PUT', 'DELETE'])
# @permission_classes([IsAuthenticated])
# def wishlist_detail(request, pk):
#     wishlist_item = get_object_or_404(WishlistItem, pk=pk, user=request.user)
    
#     if request.method == 'GET':
#         serializer = WishlistItemSerializer(wishlist_item)
#         return Response(serializer.data)
    
#     elif request.method == 'PUT':
#         serializer = WishlistItemSerializer(wishlist_item, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#     elif request.method == 'DELETE':
#         wishlist_item.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

# # ---------------------------- REVIEWS ---------------------------- #

# @api_view(['GET', 'POST'])
# @permission_classes([IsAuthenticated])
# def review_list(request):
#     if request.method == 'GET':
#         reviews = Review.objects.all()
#         serializer = ReviewSerializer(reviews, many=True)
#         return Response(serializer.data)
    
#     elif request.method == 'POST':
#         serializer = ReviewSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save(user=request.user)  # Assign logged-in user
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['GET', 'PUT', 'DELETE'])
# @permission_classes([IsAuthenticated])
# def review_detail(request, pk):
#     review = get_object_or_404(Review, pk=pk, user=request.user)
    
#     if request.method == 'GET':
#         serializer = ReviewSerializer(review)
#         return Response(serializer.data)
    
#     elif request.method == 'PUT':
#         serializer = ReviewSerializer(review, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#     elif request.method == 'DELETE':
#         review.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)
