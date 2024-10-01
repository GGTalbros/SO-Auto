# ordr_app/serializers.py

from rest_framework import serializers
from .models import ExcelFile

class ExcelFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExcelFile
        fields = ['file']
