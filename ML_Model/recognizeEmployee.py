import os
import sys

import cv2
import numpy as np
import tensorflow as tf
import numpy as np
import wget
from tensorflow.keras.applications.vgg16 import preprocess_input
from tensorflow.keras.models import load_model
from tensorflow.keras.utils import load_img, img_to_array
from tensorflow.keras.preprocessing import image
from mtcnn import MTCNN
import matplotlib.pyplot as plt
import csv


model = load_model('/home/anon/Documents/GitHub/mnrega_backend_server/ML_Model/face_rec.h5')
detector = MTCNN()
#path of image


image_url = sys.argv[1]
attendanceId = sys.argv[2]

try:
    os.mkdir("/home/anon/Documents/GitHub/mnrega_backend_server/ML_Model/tmp")
except FileExistsError:
    # directory already exists
    pass

image_path = "/home/anon/Documents/GitHub/mnrega_backend_server/ML_Model/tmp/image_temp.jpg"
image = wget.download(str(image_url),image_path)


img_path = image_path

with open('/home/anon/Documents/GitHub/mnrega_backend_server/ML_Model/label.csv') as f:
    reader = csv.reader(f)
    my_list = list(reader)
class_names = my_list[0]

img = cv2.imread(img_path)

output = detector.detect_faces(img)
present_employees_ids = []
#cv2.imshow("window",img)
print(output)

#print(len(output))
#no_faces = len(output)
#count = 10
for j in output:
    bounding_box = j['box']
    if j['confidence'] > 0.98:
        cv2.rectangle(img,(bounding_box[0],bounding_box[1]), (bounding_box[0]+bounding_box[2],bounding_box[1]+bounding_box[3]),(255,0,0),2)
        img_ = img[bounding_box[1]:bounding_box[1]+bounding_box[3],bounding_box[0]:bounding_box[0]+bounding_box[2]]
        img_ = np.resize(img_,(256,256,3))
        x = img_to_array(img_)
        x = np.expand_dims(x,axis=0)
        img_data = preprocess_input(x)
        predictions = model.predict(img_data)
        predicted_class = class_names[np.argmax(predictions)]
        present_employees_ids.append(predicted_class)
        print(np.argmax(predictions))
        confidence = round(100*(np.max(predictions[0])),2)
        print(confidence)
print(present_employees_ids)