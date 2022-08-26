import os
import cv2
from mtcnn import MTCNN
import numpy as np
from PIL import Image
from numpy import asarray 
import matplotlib.pyplot as plt
from keras.models import load_model
import tensorflow as tf
import csv
import sys
import json
import requests
import wget
import shutil
import imageio 

image_url = sys.argv[1]
attendanceId = sys.argv[2]

img = imageio.imread(image_url)



with open("/home/ubuntu/desktop/mnrega_backend_server/ML_Model/label.csv") as f:
    reader = csv.reader(f)
    my_list = list(reader)
    classes = my_list[0]

model = load_model("/home/ubuntu/desktop/mnrega_backend_server/ML_Model/face_rec_model.h5")

detector = MTCNN()
model = load_model("/home/ubuntu/desktop/mnrega_backend_server/ML_Model/face_rec_model.h5")
 

present_employees_ids = []
output = detector.detect_faces(img)

#cv2.imshow("window",img)
print(output)
print("hello")
print(len(output))
no_faces = len(output)
count = 10
print("SECTION_1")
for j in output:
    print("SECTION_2")
    bounding_box = j['box']
    if j['confidence'] > 0.98:
        print("SECTION_3")
        cv2.rectangle(img,(bounding_box[0],bounding_box[1]), (bounding_box[0]+bounding_box[2],bounding_box[1]+bounding_box[3]),(255,0,0),2)

        img_ = img[bounding_box[1]:bounding_box[1]+bounding_box[3],bounding_box[0]:bounding_box[0]+bounding_box[2]]
        
        x = np.resize(img, (256, 256, 3))
        
        # x = cv2.resize(img_,(256,256))
                                          
                                                                                                                                                                    
        x = tf.keras.preprocessing.image.img_to_array(x)
        
        x = np.expand_dims(x, axis=0)
        images = np.vstack([x])
        pred = model.predict(images, batch_size=32, verbose=1)

        if pred[0][np.argmax(pred)] >= 0.75: 
            print("SECTION_4")                                                                                                                                           
            present_employees_ids.append(classes[np.argmax(pred)])

        print("Predicted: "+classes[np.argmax(pred)])
            
#step-2 mark attendance put request to node js api

response = requests.put(url = 'http://127.0.0.1:3000/markAttendence',
                        json={ 
                            "attendanceId": attendanceId,
                            "presentemployeeIds": present_employees_ids
                            }
                        )
print(present_employees_ids)



