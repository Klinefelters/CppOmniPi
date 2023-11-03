import cv2


class Camera(object):
    def __init__(self):
        self.cap = cv2.VideoCapture(0)

    def gen_frames(self):
        while True:
            _, frame = self.cap.read()
            _, buffer = cv2.imencode('.jpg', frame)
            frame_data = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n'
                   + frame_data + b'\r\n')
