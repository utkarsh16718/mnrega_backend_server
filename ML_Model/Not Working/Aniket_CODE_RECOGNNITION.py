from keras.models import load_model
from keras.preprocessing import image
from keras.applications.vgg16 import preprocess_input
import numpy as np
import imageio
import json
import sys
from os import path

request_no = sys.argv[2]
image_url = sys.argv[1]

img = imageio.imread(image_url)
img = np.resize(img, (256, 256, 3))
model=load_model('./ml/model2.h5')
x=image.img_to_array(img)
x=np.expand_dims(x,axis=0)
img_data=preprocess_input(x)
predictions= model.predict(img_data)
class_names=['Black Sea Sprat',
 'Gilt-Head Bream',
 'Hourse Mackerel',
 'Red Sea Breams',
 'Sea Bass',
 'Shrimp',
 'Striped Red Mullet',
 'Trout']
predicted_class = class_names[np.argmax(predictions)]
print(np.argmax(predictions))
confidence = round(100 * (np.max(predictions[0])), 2)
print(predicted_class,confidence)
print("Predicted label: ",class_names[np.argmax(predictions)])

filename = './results.json'
listObj = []

# Check if file exists
if path.isfile(filename) is False:
    raise Exception("File not found")

# Read JSON file
with open(filename) as fp:
    listObj = json.load(fp)
    print('listObj', listObj)

# Verify existing list

fp.close()
print(listObj)

print(type(listObj))

listObj.append({
    "request": request_no,
    "prediction": predicted_class,
    "confidence":confidence
})

with open(filename, 'w') as json_file:
    json.dump(listObj, json_file,
              indent=4,
              separators=(',', ': '))
json_file.close()

print('Successfully appended to the JSON file')