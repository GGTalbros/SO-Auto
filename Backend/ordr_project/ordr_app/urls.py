# ordr_app/urls.py

from django.urls import path
from .views import GenerateORDRSheetView
from .views import GenerateRDR1SheetView

urlpatterns = [
    path('generate-ordr/', GenerateORDRSheetView.as_view(), name='generate-ordr'),
     
    path('generate-rdr1/', GenerateRDR1SheetView.as_view(), name='generate_rdr1'),
   
]


