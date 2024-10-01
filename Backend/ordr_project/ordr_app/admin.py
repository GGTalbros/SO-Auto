from django.contrib import admin

# Register your models here.
# ordr_app/admin.py


from .models import ExcelFile

@admin.register(ExcelFile)
class ExcelFileAdmin(admin.ModelAdmin):
    list_display = ['file', 'uploaded_at']
    list_filter = ['uploaded_at']
    search_fields = ['file']

