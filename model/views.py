from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from model.models import Btp
import joblib
import pandas as pd

class ModelView(APIView):


    def post(self,request):
        data = request.data
        is_male_ = data["is_male"]
        is_jammu_= data["is_jammu"]
        is_phd_ = data["is_phd"]
        experience_ = data["experience"]
        loaded_object = joblib.load('/home/dhvani/Desktop/BTP/btp/model/joblib_file/model.joblib')
        data = [is_male_,is_jammu_,is_phd_,experience_]
        X_new = pd.DataFrame([data]).values
        predictions = loaded_object.predict(X_new)
        btpinstance = Btp.objects.create(is_male=is_male_,is_jammu=is_jammu_,is_phd = is_phd_,experience = experience_,result= predictions)

        return Response({"result":predictions},status= "200")