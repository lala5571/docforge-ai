from django.db import models
import uuid

class Document(models.Model):
    FORMAT_CHOICES = [
        ('ppt', 'PowerPoint'),
        ('word', 'Word Document'),
    ]
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('generated', 'Generated'),
        ('paid', 'Paid'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='documents', null=True, blank=True)
    topic = models.CharField(max_length=500)
    format = models.CharField(max_length=10, choices=FORMAT_CHOICES)
    instructions = models.TextField(blank=True)
    template_file = models.FileField(upload_to='templates/', blank=True)
    watermarked_file = models.FileField(upload_to='watermarked/', blank=True)
    clean_file = models.FileField(upload_to='clean/', blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} — {self.topic}"