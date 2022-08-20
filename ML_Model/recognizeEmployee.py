import os
import cv2
from mtcnn import MTCNN
import numpy as np
from PIL import Image
from numpy import asarray 
import matplotlib.pyplot as plt
from keras.models import load_model
import csv
import sys
import json
import requests

image_path = sys.argv[0]
attendanceId = sys.argv[1]


with open("label.csv") as f:
    reader = csv.reader(f)
    my_list = list(reader)
    classes = my_list[0]

detector = MTCNN()
model = load_model("face_rec_model.h5")

img = image_path
present_employees_ids = []
output = detector.detect_faces(img)

cv2.imshow("window",img)
print(output)

print(len(output))
no_faces = len(output)
count = 10
for j in output:
    bounding_box = j['box']
    if j['confidence'] > 0.98:
        cv2.rectangle(img,(bounding_box[0],bounding_box[1]), (bounding_box[0]+bounding_box[2],bounding_box[1]+bounding_box[3]),(255,0,0),2)
        img_ = img[bounding_box[1]:bounding_box[1]+bounding_box[3],bounding_box[0]:bounding_box[0]+bounding_box[2]]
        img_ = cv2.resize(img_,(256,256))
        x = Image.img_to_array(img_)
        x = np.expand_dims(x, axis=0)
        images = np.vstack([x])
        pred = model.predict(images)

        if pred[0][np.argmax(pred)] >= 0.75:
            present_employees_ids.append(classes[np.argmax(pred)])
        
        print("Predicted: "+classes[np.argmax(pred)])

#step-2 mark attendance put request to node js api

response = requests.put(url = 'http://127.0.0.1:3000/markAttendence',
                        json={ 
                            "attendanceId": attendanceId,
                            "presentemployeeIds": present_employees_ids
                            }
                        )


