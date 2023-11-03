import cv2
import numpy as np


class Camera(object):
    def __init__(self):
        self.cap = cv2.VideoCapture(0)

    def gen_frames(self):
        while True:
            frame = np.zeros((480, 640, 3), dtype=np.uint8)
            _, buffer = cv2.imencode('.jpg', frame)
            frame_data = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n'
                   + frame_data + b'\r\n')
