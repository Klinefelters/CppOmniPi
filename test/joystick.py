import cv2


class Joystick():
    def __init__(self, deadzone:float = .15, max:float = 50, center = (0,0)):
        self.deadzone = deadzone
        self.max = max
        self.center = center
        self.active = False
        self.max_color = (0, 0, 255)
        
    def activate(self):
        self.active = True
        self.max_color = (0, 255, 0)
        
    def deactivate(self):
        self.active = False
        self.max_color = (0, 0, 255)
        
    def draw(self, frame):
        # Max Circle
        cv2.circle(frame, self.center, int(self.max), self.max_color, 1)
        
        # Deadzone Circle
        cv2.circle(frame, self.center, int(self.max * self.deadzone), (0, 0, 0), 1)
        
        return frame