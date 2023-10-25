import cv2
import mediapipe as mp
import math
import numpy as np

# Initialize MediaPipe hands module
mp_hands = mp.solutions.hands
hands = mp_hands.Hands()

# Open a camera feed
cap = cv2.VideoCapture(0)

# Define the deadzone threshold for the distance
deadzone_threshold = 30.0  # Adjust as needed

while True:
    ret, frame = cap.read()
    if not ret:
        continue

    # Flip the frame horizontally
    frame = cv2.flip(frame, 1)

    # Convert BGR image to RGB
    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    # Detect hands in the frame
    results = hands.process(frame_rgb)

    if results.multi_hand_landmarks:
        for idx, hand_landmarks in enumerate(results.multi_hand_landmarks):
            # Get landmarks for the thumb and pointer finger
            thumb_tip = hand_landmarks.landmark[mp_hands.HandLandmark.THUMB_TIP]
            index_tip = hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_TIP]

            # Convert landmarks to pixel coordinates
            thumb_x, thumb_y = int(thumb_tip.x * frame.shape[1]), int(thumb_tip.y * frame.shape[0])
            index_x, index_y = int(index_tip.x * frame.shape[1]), int(index_tip.y * frame.shape[0])

            # Calculate distance between thumb and pointer finger tips
            distance = math.sqrt((thumb_x - index_x) ** 2 + (thumb_y - index_y) ** 2)

            # Calculate angle
            angle = math.degrees(math.atan2(index_y - thumb_y, index_x - thumb_x))

            # Draw red circle around thumb tip
            cv2.circle(frame, (thumb_x, thumb_y), 10, (0, 0, 255), -1)  # Red color

            # Draw blue circle around pointer finger tip
            cv2.circle(frame, (index_x, index_y), 10, (255, 0, 0), -1)  # Blue color

            # Label the hand as "Left Hand" or "Right Hand"
            label_x = thumb_x + 20
            label_y = thumb_y - 20
            label = "Right Hand" if idx == 0 else "Left Hand"  # Flipped labels
            cv2.putText(frame, label, (label_x, label_y), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)

            # If the distance is above the deadzone threshold, draw a line
            if distance > deadzone_threshold:
                # Create a gradient line from green to red based on distance
                color = (0, int(255 * (1 - distance / 300)), int(255 * (distance / 300)))

                # Draw a line connecting thumb and pointer finger tips
                cv2.line(frame, (thumb_x, thumb_y), (index_x, index_y), color, 2)

            # Print distance and angle
            print(f"{label}: Distance: {distance:.2f} pixels, Angle: {angle:.2f} degrees")

    # Display the frame with landmarks
    cv2.imshow("Hand Joystick", frame)

    if cv2.waitKey(1) & 0xFF == 27:  # Press 'Esc' to exit
        break

cap.release()
cv2.destroyAllWindows()
