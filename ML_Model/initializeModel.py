import csv
import os
import sys

import boto3
import tensorflow as tf
from tensorflow.keras import models, layers
import matplotlib.pyplot as plt

# path of datsets

# path of datsets
#
# # set aws credentials
# s3 = boto3.resource('s3', aws_access_key_id='AKIAQVWCUMEC62WL74BI',
#     aws_secret_access_key='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')
# bucket = s3.Bucket('videotofotos')
#
#
# s3_folder ="datasets/"
# local_dir = None
# for obj in bucket.objects.filter(Prefix=s3_folder):
#     target = obj.key if local_dir is None \
#         else os.path.join(local_dir, os.path.relpath(obj.key, s3_folder))
#     if not os.path.exists(os.path.dirname(target)):
#         os.makedirs(os.path.dirname(target))
#     if obj.key[-1] == '/':
#         continue
#     bucket.download_file(obj.key, target)



train_dir = "/home/anon/Documents/GitHub/mnrega_backend_server/ML_Model/datasets"

## important constants

BATCH_SIZE = 32
IMAGE_SIZE = 256
Channels = 3  # RGB
Epochs = 50

##dataset

dataset = tf.keras.preprocessing.image_dataset_from_directory(
    train_dir,
    seed=123,
    shuffle=True,
    image_size=(IMAGE_SIZE, IMAGE_SIZE),
    batch_size=BATCH_SIZE

)

class_names = dataset.class_names
with open('label.csv', 'w') as f:
    write = csv.writer(f)
    write.writerow(class_names)

## spliting the datasets into train,val,test

train_size = 0.8
z = int(len(dataset) * train_size)
train_ds = dataset.take(z)
test_ds = dataset.skip(z)
val_size = 0.1
k = int(len(dataset) * val_size)
val_ds = test_ds.take(k)
test_ds = test_ds.skip(k)

### resize and rescale

resize_and_rescale = tf.keras.Sequential([
    layers.experimental.preprocessing.Resizing(IMAGE_SIZE, IMAGE_SIZE),
    layers.experimental.preprocessing.Rescaling(1. / 255),
])

### Data Augumentation
"""
data_augumentation = tf.keras.Sequential([
    layers.experimental.preprocessing.RandomFlip("horizontal_and_vertical"),
    layers.experimental.preprocessing.RandomRotation(0.2),
])
### Applying Data Augumentation on train dataset
train_ds = train_ds.map(
                lambda x, y: (data_augumentation(x, training=True), y)
).prefetch(buffer_size=tf.data.AUTOTUNE)
"""

### Building the Model

input_shape = (BATCH_SIZE, IMAGE_SIZE, IMAGE_SIZE, Channels)
n_classes = len(class_names)
model = models.Sequential([
    resize_and_rescale,
    layers.Conv2D(32, kernel_size=(3, 3), activation='relu', input_shape=input_shape),
    layers.MaxPooling2D((2, 2)),
    layers.Conv2D(64, kernel_size=(3, 3), activation='relu'),
    layers.MaxPooling2D((2, 2)),
    layers.Conv2D(64, kernel_size=(3, 3), activation='relu'),
    layers.MaxPooling2D((2, 2)),
    layers.Conv2D(64, (3, 3), activation='relu'),
    layers.MaxPooling2D((2, 2)),
    layers.Conv2D(64, (3, 3), activation='relu'),
    layers.MaxPooling2D((2, 2)),
    layers.Conv2D(64, (3, 3), activation='relu'),
    layers.MaxPooling2D((2, 2)),
    layers.Flatten(),
    layers.Dense(64, activation='relu'),
    layers.Dense(n_classes, activation='softmax'),
])
model.build(input_shape=input_shape)

##summary

model.summary()

## compiling the model

model.compile(
    optimizer='adam',
    loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=False),
    metrics=['accuracy']

)

history = model.fit(
    train_ds,
    batch_size=BATCH_SIZE,
    validation_data=val_ds,
    verbose=1,
    epochs=Epochs,
)

### Save the model

model = model.save("face_rec.h5")