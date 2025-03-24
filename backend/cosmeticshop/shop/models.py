from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.contrib.auth.models import User

class Product(models.Model):
    CATEGORY_CHOICES = [
        ('lips', 'Lips'),
        ('face', 'Face'),
        ('eyes', 'Eyes'),
        ('home', 'Home'),
        ('bestseller', 'Bestseller'),
        ('new', 'New'),
        ('skincare', 'Skincare'),
        # Add more categories if needed
    ]

    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to='products/')  # Store images in 'media/products/'
    shades = models.CharField(max_length=50)  # Example: "3 shades"
    rating = models.IntegerField()  # Example: 5
    perprice = models.CharField(max_length=50)  # Example: "728.57/g"
    price = models.DecimalField(max_digits=10, decimal_places=2)  # Example: 5100.25
    category = models.CharField(max_length=10, choices=CATEGORY_CHOICES, default='home')

    def __str__(self):
        return self.title

class UserRole(models.Model):
    ROLE_CHOICES = [
        ('premium', 'Premium'),
        ('normal', 'Normal'),
    ]
    
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)

    def __str__(self):
        return f"{self.user.username} - {self.get_role_display()}"



# class Favorite(models.Model):
#     # user = models.ForeignKey(User, on_delete=models.CASCADE)
#     item_name = models.CharField(max_length=255)
#     item_url = models.URLField(blank=True, null=True)
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return self.item_name



# class CartItem(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     product = models.ForeignKey(Product, on_delete=models.CASCADE)
#     quantity = models.PositiveIntegerField(default=1)

# class WishlistItem(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     product = models.ForeignKey(Product, on_delete=models.CASCADE)

# class Review(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     product = models.ForeignKey(Product, on_delete=models.CASCADE)
#     rating = models.IntegerField(choices=[(i, i) for i in range(1, 6)])
#     comment = models.TextField()
