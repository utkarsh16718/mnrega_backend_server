import shutil

import boto3
import csv

import os
from keras.models import Sequential
from keras.layers import Conv2D, MaxPooling2D, Dense, Flatten, Dropout
from tensorflow.keras.layers import BatchNormalization
from tensorflow.keras.preprocessing.image import ImageDataGenerator


# set aws credentials
s3 = boto3.resource('s3', aws_access_key_id='AKIAQVWCUMEC62WL74BI',
    aws_secret_access_key='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')
bucket = s3.Bucket('videotofotos')


s3_folder ="datasets/"
local_dir = None
for obj in bucket.objects.filter(Prefix=s3_folder):
    target = obj.key if local_dir is None \
        else os.path.join(local_dir, os.path.relpath(obj.key, s3_folder))
    if not os.path.exists(os.path.dirname(target)):
        os.makedirs(os.path.dirname(target))
    if obj.key[-1] == '/':
        continue
    bucket.download_file(obj.key, target)



train_dir = '../datasets/'
#test_dir = "C:/Users/adars/Desktop/datasets/face-recognition/AI/datasets/test/"

generator = ImageDataGenerator(rescale=1./255, rotation_range=30, shear_range=0.3,
                               zoom_range=0.3, horizontal_flip=True, fill_mode='nearest')
train_ds = generator.flow_from_directory(
    train_dir, target_size=(256, 256), batch_size=32)
len(train_ds)

classes = list(train_ds.class_indices.keys())
with open("./label.csv", "w") as f:
    write = csv.writer(f)
    write.writerow(classes)
print(classes)

model = Sequential()
model.add(Conv2D(32, kernel_size=(3, 3),
          activation='relu', input_shape=(256, 256, 3)))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(BatchNormalization())
model.add(Conv2D(64, kernel_size=(3, 3), activation='relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(BatchNormalization())
model.add(Conv2D(64, kernel_size=(3, 3), activation='relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(BatchNormalization())
model.add(Conv2D(96, kernel_size=(3, 3), activation='relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(BatchNormalization())
model.add(Conv2D(32, kernel_size=(3, 3), activation='relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(BatchNormalization())
model.add(Dropout(0.2))
model.add(Flatten())
model.add(Dense(128, activation='relu'))
# model.add(Dropout(0.3))
model.add(Dense(len(classes), activation='softmax'))
model.compile(
    loss='categorical_crossentropy',
    optimizer='adam',
    metrics=["accuracy"])
model.summary()
history = model.fit(train_ds, epochs=5, batch_size=32)

model = model.save('face_rec_model.h5')


# try:
#     shutil.rmtree('/home/anon/Documents/GitHub/mnrega_backend_server/ML_Model/datasets')
# except OSError as e:
#     print("Error: %s - %s." % (e.filename, e.strerror))