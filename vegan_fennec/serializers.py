from rest_framework import serializers
from .models import SoilMoisture

class SoilMoistureSerializer(serializers.ModelSerializer):
    class Meta:
        model = SoilMoisture
        fields = '__all__'
