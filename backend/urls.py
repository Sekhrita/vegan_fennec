from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('vegan_fennec/', include('vegan_fennec.urls')),
]