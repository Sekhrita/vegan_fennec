from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import SoilMoisture
from .serializers import SoilMoistureSerializer
from .services import get_soil_moisture_data
from datetime import datetime

class SoilMoistureViewSet(viewsets.ModelViewSet):
    queryset = SoilMoisture.objects.all()
    serializer_class = SoilMoistureSerializer

@api_view(['GET'])
def influx_data(request):
    start_date = request.GET.get('start_date', None)
    end_date = request.GET.get('end_date', None)
    min_threshold = request.GET.get('min_threshold', None)
    max_threshold = request.GET.get('max_threshold', None)

    if start_date and end_date:
        start_date = datetime.fromisoformat(start_date)
        end_date = datetime.fromisoformat(end_date)
        data = get_soil_moisture_data(start_date, end_date)

        alerts = []
        if min_threshold is not None and max_threshold is not None:
            min_threshold = float(min_threshold)
            max_threshold = float(max_threshold)
            alerts = [item for item in data if item['value'] < min_threshold or item['value'] > max_threshold]

        return Response({
            "data": data,
            "alerts": alerts
        })
    else:
        return Response({"error": "Please provide both start_date and end_date"}, status=400)
