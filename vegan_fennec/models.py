from django.db import models

class SoilMoisture(models.Model):
    time = models.DateTimeField()
    value = models.FloatField()
    field = models.CharField(max_length=100)
    measurement = models.CharField(max_length=100)
    soil_type = models.CharField(max_length=100)