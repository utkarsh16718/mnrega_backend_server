print("Model Predictiong")

import boto3
import os
import sys
import shutil
s3 = boto3.resource('s3') # assumes credentials & configuration are handled outside python in .aws directory or environment variables
s3 = boto3.resource('s3', aws_access_key_id='AKIAQVWCUMEC62WL74BI',
aws_secret_access_key='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')
bucket = s3.Bucket('videotofotos')
def download_s3_folder(bucket_name, s3_folder, local_dir=None):
    """
    Download the contents of a folder directory
    Args:
        bucket_name: the name of the s3 bucket
        s3_folder: the folder path in the s3 bucket
        local_dir: a relative or absolute directory path in the local file system
    """
    bucket = s3.Bucket(bucket_name)
    for obj in bucket.objects.filter(Prefix=s3_folder):
        target = obj.key if local_dir is None \
            else os.path.join(local_dir, os.path.relpath(obj.key, s3_folder))
        if not os.path.exists(os.path.dirname(target)):
            os.makedirs(os.path.dirname(target))
        if obj.key[-1] == '/':
            continue
        bucket.download_file(obj.key, target)


# try:
#     download_s3_folder('videotofotos','datasets', '/home/anon/Documents/GitHub/mnrega_backend_server/ML_Model/dataset')
# except:
#     print("Wrong Image URL")

image_url = sys.argv[1]
attendanceId = sys.argv[2]
groupImagelink = image_url

# try:
#     os.mkdir("/home/anon/Documents/GitHub/mnrega_backend_server/ML_Model/temp")
# except FileExistsError:
#     # directory already exists
#     pass

import wget
print(groupImagelink)
try:
    wget.download(groupImagelink,'/home/anon/Documents/GitHub/mnrega_backend_server/ML_Model/' + "newImage.jpg")
except:
    pass



# Making Attendance 
import face_recognition as fr
import os
import cv2
import face_recognition
import numpy as np
from time import sleep


def get_encoded_faces():
    """
    looks through the faces folder and encodes all
    the faces

    :return: dict of (name, image encoded)
    """
    encoded = {}

    for dirpath, dnames, fnames in os.walk("/home/anon/Documents/GitHub/mnrega_backend_server/ML_Model/dataset"):
        for f in fnames:
            if f.endswith(".jpg") or f.endswith(".jpeg"):
                face = fr.load_image_file("/home/anon/Documents/GitHub/mnrega_backend_server/ML_Model/dataset/" + f)
                encoding = fr.face_encodings(face)[0]
                encoded[f.split(".")[0]] = encoding

    return encoded


def unknown_image_encoded(img):
    """
    encode a face given the file name
    """
    face = fr.load_image_file("/home/anon/Documents/GitHub/mnrega_backend_server/ML_Model/dataset/" + img)
    encoding = fr.face_encodings(face)[0]

    return encoding


def classify_face(im):
    """
    will find all of the faces in a given image and label
    them if it knows what they are

    :param im: str of file path
    :return: list of face names
    """
    faces = get_encoded_faces()
    faces_encoded = list(faces.values())
    known_face_names = list(faces.keys())

    img = cv2.imread(im, 1)
    #img = cv2.resize(img, (0, 0), fx=0.5, fy=0.5)
    #img = img[:,:,::-1]
 
    face_locations = face_recognition.face_locations(img)
    unknown_face_encodings = face_recognition.face_encodings(img, face_locations)

    face_names = []
    for face_encoding in unknown_face_encodings:
        # See if the face is a match for the known face(s)
        matches = face_recognition.compare_faces(faces_encoded, face_encoding)

        #print(matches)
        name = "Unknown"

        # use the known face with the smallest distance to the new face
        face_distances = face_recognition.face_distance(faces_encoded, face_encoding)
        #print(face_distances)
        #print(np.argmin(face_distances))
        best_match_index = np.argmin(face_distances)
        #print(best_match_index)
        #print(known_face_names)
        #print(best_match_index)
        #print(matches[best_match_index])
        if matches[best_match_index]:
            name = known_face_names[best_match_index]
        else:
            name = "unknown"
        face_names.append(name)

        for (top, right, bottom, left), name in zip(face_locations, face_names):
            # Draw a box around the face
            cv2.rectangle(img, (left-20, top-20), (right+20, bottom+20), (255, 0, 0), 2)

            # Draw a label with a name below the face
            cv2.rectangle(img, (left-20, bottom -15), (right+20, bottom+20), (255, 0, 0), cv2.FILLED)
            font = cv2.FONT_HERSHEY_DUPLEX
            cv2.putText(img, name, (left -20, bottom + 15), font, 1.0, (255, 255, 255), 2)
    l = list(set(face_names))
    print(l)
    presnt_emp =l
    import requests
    # payload = '{\"attendanceId\":"'+attendanceId+'",\"presentemployeeIds\": "'+present_employees_ids+'"\r\n\t}'
    # print(attendanceId)
    # payload = '{\"attendanceId\":' + str(attendanceId) + ',\"presentemployeeIds\": ' + str(present_employees_ids)+ '\r\n\t}'
    payload={
        "attendanceId": attendanceId,
        "presentemployeeIds": presnt_emp
    }
    response = requests.put(url = 'http://127.0.0.1:3000/markAttendence',
                            data=payload
                            )
    print("No. of present employees :" + str(len(l)))
    # print("PRESENT EMOPLYEE IDS",end="")
    # Display the resulting image

        #cv2.imshow('Video', img)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        return face_names 
    
present_employees_ids = classify_face("/home/anon/Documents/GitHub/mnrega_backend_server/ML_Model/newImage.jpg")
#step-2 mark attendance put request to node js api
# print(response)
# print("PRESENT EMOPLYEE IDS",end="")
# print(present_employees_ids)
try:
    os.remove('/home/anon/Documents/GitHub/mnrega_backend_server/ML_Model/newImage.jpg')
except OSError as e:
    print("Error: %s - %s." % (e.filename, e.strerror))