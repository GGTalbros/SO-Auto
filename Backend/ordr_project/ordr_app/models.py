from django.db import models

# Create your models here.
# ordr_app/models.py

from django.db import models

class ExcelFile(models.Model):
    file = models.FileField(upload_to='uploads/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Excel file uploaded on {self.uploaded_at}"
