import os, io
from google.cloud import vision
import pandas as pd
import imagemodify 

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = r"apiKey\GoogleVision.json"

client = vision.ImageAnnotatorClient()

file_name = 'img4.png'
image_path = f'img\{file_name}'

def detectText(image):
    #open image
    with io.open(image_path, 'rb') as image_file:
        content = image_file.read()

    #get image elements 
    image = vision.types.Image(content=content)

    #img text onli 
    #response = client.text_detection(image=image)
    #texts = response.text_annotations

    response = client.document_text_detection(image=image)
    imagemodify.drawAllBlock(content, response)
    #modifi image 
    #imagemodify.drawAllvertices(content, texts)
        

detectText(image_path)