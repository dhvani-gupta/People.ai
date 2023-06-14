from django.db import models

# Create your models here.
class Btp(models.Model):
    is_male = models.SmallIntegerField(null= True)
    is_phd = models.SmallIntegerField(null= True)
    is_jammu = models.SmallIntegerField(null= True)
    experience = models.IntegerField(null=True)
    result = models.FloatField(null = True)