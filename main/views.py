from django.http import HttpResponse
from django.http import JsonResponse
from django.shortcuts import redirect, render
import json
from .organizer import callPlace

jsonObj = {}
# Create your views here.
def main(request):
  return render(request, "index.html")


def uploadFile(request):
  global jsonObj
  
  if request.method == "POST":
    jsonObj = json.load(request.FILES["file"])
  
  return redirect("/")
  
def uploadInput(request):
  return JsonResponse(jsonObj)

def optimize(request):
  global jsonObj
  callPlace(jsonObj)
  return JsonResponse(jsonObj)