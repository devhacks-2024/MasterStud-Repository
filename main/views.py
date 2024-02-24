from django.http import HttpResponse
from django.template import loader
from django.shortcuts import render
import json

# Create your views here.
def main(request):
  return render(request, "index.html")


def upload_file(request):
    if request.method == "POST":
        jsonObj = json.load(request.FILES["file"])