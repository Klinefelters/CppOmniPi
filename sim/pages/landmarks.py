import tkinter as tk
import cv2
from tkinter import ttk
from PIL import Image, ImageTk
import mediapipe as mp
import math


class Landmarks(tk.Frame):
    def __init__(self, parent, shared_data):
        super().__init__(parent)
        self.parent = parent
        self.grid()
        
        self.shared_data = shared_data
        self.deadzone_threshold = shared_data.deadzone_threshold
        
        # Initialize MediaPipe Hands
        self.mp_hands = mp.solutions.hands
        self.hands = self.mp_hands.Hands()
        self.mp_drawing = mp.solutions.drawing_utils
        
        self.label = tk.Label(self)
        self.label.pack(padx=20, pady=20)
        
        self.cap = cv2.VideoCapture(0)
        
        self.update()
    
    def update(self):
        ret, frame = self.cap.read()
        if ret:
            
            # Flip the frame horizontally
            frame = cv2.flip(frame, 1)
 
            # Convert the OpenCV image to a Tkinter PhotoImage
            frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

            # Process the frame and detect landmarks
            results = self.hands.process(frame)

            if results.multi_hand_landmarks:
                
                for idx, hand_landmarks in enumerate(results.multi_hand_landmarks):
                    # Get landmarks for the thumb and pointer finger
                    thumb_tip = hand_landmarks.landmark[self.mp_hands.HandLandmark.THUMB_TIP]
                    index_tip = hand_landmarks.landmark[self.mp_hands.HandLandmark.INDEX_FINGER_TIP]

                    # Convert landmarks to pixel coordinates
                    thumb_x, thumb_y = int(thumb_tip.x * frame.shape[1]), int(thumb_tip.y * frame.shape[0])
                    index_x, index_y = int(index_tip.x * frame.shape[1]), int(index_tip.y * frame.shape[0])

                    # Calculate distance between thumb and pointer finger tips
                    distance = math.sqrt((thumb_x - index_x) ** 2 + (thumb_y - index_y) ** 2)
                    
                    delta_x = thumb_x - index_x
                    delta_y = thumb_y - index_y

                    # Draw red circle around thumb tip
                    cv2.circle(frame, (thumb_x, thumb_y), 10, (0, 0, 255), -1)  # Red color

                    # Draw blue circle around pointer finger tip
                    cv2.circle(frame, (index_x, index_y), 10, (255, 0, 0), -1)  # Blue color

                    # Label the hand as "Left Hand" or "Right Hand"
                    label_x = thumb_x + 20
                    label_y = thumb_y - 20
                    label = "Right Hand" if idx == 0 else "Left Hand"  # Flipped labels
                    cv2.putText(frame, label, (label_x, label_y), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)
                    
                    # Label the x and y values
                    label_x = index_x + 20
                    label_y = index_y - 20
                    label = f"X: {-delta_x/self.shared_data.landmark_max:.2f} | Y: {delta_y/self.shared_data.landmark_max:.2f}"
                    cv2.putText(frame, label, (label_x, label_y), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 0), 2)

                    # If the distance is above the deadzone threshold, draw a line
                    if distance > .15:
                        # Create a gradient line from green to red based on distance
                        color = (int(255 * (1 - distance / self.shared_data.landmark_max)), int(255 * (distance / self.shared_data.landmark_max)), 0)

                        # Draw a line connecting thumb and pointer finger tips
                        cv2.line(frame, (thumb_x, thumb_y), (index_x, index_y), color, 2)

            img = Image.fromarray(frame)
            imgtk = ImageTk.PhotoImage(image=img)
            
            # Update the label with the new frame
            self.label.imgtk = imgtk
            self.label.configure(image=imgtk)
            self.label.after(10, self.update)  # Update every 10 milliseconds
    
    def on_exit(self):
        # Release the camera when the page is closed
        self.cap.release()

