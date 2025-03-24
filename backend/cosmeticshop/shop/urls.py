from django.urls import path
from . import views

# ,product_detail,
#     cart_list, cart_detail,
#     wishlist_list, wishlist_detail,
#     review_list, review_detail
urlpatterns = [
    path('products/', views.product_list, name='product-list'),
    path('products/<int:product_id>/', views.product_detail, name='product-detail'),
    path('user/info/', views.get_user_info, name='user-info'), 

    # path('favorites/', favorite_list_create, name='favorite-list-create'),
    # path('favorites/<int:pk>/', favorite_delete, name='favorite-delete'),

    # path('cart/', cart_list, name='cart-list'),
    # path('cart/<int:pk>/', cart_detail, name='cart-detail'),

    # path('wishlist/', wishlist_list, name='wishlist-list'),
    # path('wishlist/<int:pk>/', wishlist_detail, name='wishlist-detail'),

    # path('reviews/', review_list, name='review-list'),
    # path('reviews/<int:pk>/', review_detail, name='review-detail'),
]
