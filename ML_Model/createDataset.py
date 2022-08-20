import boto3
import os
import sys
import shutil
import cv2
from mtcnn import MTCNN
from botocore.exceptions import ClientError

# set aws credentials
s3 = boto3.resource('s3', aws_access_key_id='AKIAQVWCUMEC62WL74BI',
aws_secret_access_key='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')
bucket = s3.Bucket('videotofotos')

# downloading folder
prefix = 'registrationVideo/'
for object in bucket.objects.filter(Prefix = 'registrationVideo/'):
    if object.key == prefix:
        os.makedirs(os.path.dirname(object.key), exist_ok=True)
        continue
    bucket.download_file(object.key, object.key)



#
#
#
#
#
#
#
#
os.mkdir("/home/anon/Desktop/Cap/datasets")
for tempName in os.listdir('/home/anon/Desktop/Cap/registrationVideo'):
    # Playing video from file:
    print(tempName)
    print("/home/anon/Desktop/Cap/registrationVideo/" + str(tempName))
    cap = cv2.VideoCapture("./registrationVideo/" + str(tempName))
    # cap = cv2.VideoCapture("./registrationVideo/example1.mp4")
    frms = cap.get(cv2.CAP_PROP_FRAME_COUNT)
    #print(frames)
    #fps = cap.get(cv2.CAP_PROP_FPS)
    #print(type(fps))
    #time = round(frms/fps)
    os.mkdir("/home/anon/Desktop/Cap/datasets/" + tempName.replace(".mp4",""))
    detector = MTCNN()

    currentFrame = 0
    while(currentFrame<=frms):
    #while(300):
        # Capture frame-by-frame
        ret, frame = cap.read()

        # Saves image of the current frame in jpg file
        name = '/home/anon/Desktop/Cap/datasets/' + str(tempName.replace(".mp4","")) + "/" + str(currentFrame) + '.jpg'
        faces = detector.detect_faces(frame)
        print ('Creating...' + name)
        if faces != []:
            for person in faces:
                bounding_box = person['box']
                if person['confidence']>0.98:
                    cv2.rectangle(frame,(bounding_box[0],bounding_box[1]), (bounding_box[0]+bounding_box[2],bounding_box[1]+bounding_box[3]),(255,0,0),2)
                    frames = cv2.resize(frame[bounding_box[1]:bounding_box[1]+bounding_box[3],bounding_box[0]:bounding_box[0]+bounding_box[2]],(256,256))
                    if not cv2.imwrite(name, frames):
                         raise Exception("Could not write image")

        # To stop duplicate images
        #currentFrame += (time//4)
        currentFrame += 15

    # When everything done, release the capture
    cap.release()
    cv2.destroyAllWindows()




s3_client = boto3.client('s3', aws_access_key_id='AKIAQVWCUMEC62WL74BI',
    aws_secret_access_key='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')
for tempName in os.listdir('./datasets'):
    folder_name = str(tempName)
    s3_client.put_object(Bucket='videotofotos', Key=('datasets/'+folder_name+'/') )


    def upload_my_file(bucket, folder, file_to_upload, file_name):
        key = folder+"/"+file_name
        try:
            response = s3_client.upload_file(file_to_upload, bucket, key, ExtraArgs={'ACL':'public-read'})
        except ClientError as e:
            print(e)
            return False
        except FileNotFoundError as e:
            print(e)
            return False
        return True

    #Upload file
    for i in os.listdir('./datasets/'+folder_name):
        upload_my_file("videotofotos", "datasets/"+folder_name, "./datasets/"+tempName+"/"+str(i), str(i))

## Try to remove tree; if failed show an error using try...except on screen
try:
    shutil.rmtree('/home/anon/Desktop/Cap/datasets')
    shutil.rmtree('/home/anon/Desktop/Cap/registrationVideo')
except OSError as e:
    print("Error: %s - %s." % (e.filename, e.strerror))



#
# s3_client = boto3.client('s3', aws_access_key_id='AKIAQVWCUMEC62WL74BI',
#     aws_secret_access_key='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')
#
# s3_client.delete_object(Bucket='videotofotos', Key=('registrationVideo/') )