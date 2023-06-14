from django.urls import path
from model.views import ModelView
urlpatterns = [
    path('btp',ModelView.as_view(),name="btp"),
]