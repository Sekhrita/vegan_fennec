from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SoilMoistureViewSet, influx_data

router = DefaultRouter()
router.register(r'soilmoisture', SoilMoistureViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('influxdata/', influx_data),
]