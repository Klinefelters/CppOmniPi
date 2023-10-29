from controller import Controller

class SharedData():
    def __init__(self):
        
        self.deadzone_threshold = .15
        
        self.landmark_max = 300
        
        self.controller = Controller()