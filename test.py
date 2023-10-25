import cv2
from joystick import Joystick


cap = cv2.VideoCapture(0)

frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

left = Joystick(
    max = int(frame_width/4),
    center=(int(frame_width/4),int(frame_height/2))
    )
right = Joystick(
    max = int(frame_width/4),
    center=(int(3*frame_width/4),int(frame_height/2))
    )

joysticks = [left, right]

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        continue
    
    frame = cv2.flip(frame, 1)
    
    for joystick in joysticks:
        frame = joystick.draw(frame)
    
    cv2.imshow('Hand Landmarks', frame)

    if cv2.waitKey(1) & 0xFF == 27:  # Press 'Esc' to exit
        break