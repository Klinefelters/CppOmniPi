import RPi.GPIO as GPIO

class L298N:
    """
    Represents an L298N motor driver for Raspberry Pi.
    
    Args:
        in1 (int): GPIO pin number for input 1.
        in2 (int): GPIO pin number for input 2.
        en (int): GPIO pin number for enable (PWM control).
    """

    def __init__(self, in1:int, in2:int, en:int):
        """
        Initializes the L298N motor driver with the specified GPIO pins.

        Args:
            in1 (int): GPIO pin number for input 1.
            in2 (int): GPIO pin number for input 2.
            en (int): GPIO pin number for enable (PWM control).
        """
        self.in1 = in1
        self.in2 = in2
        self.en = en

        # Set the GPIO Board numbering type
        GPIO.setmode(GPIO.BCM)
        
        # Setup all of the needed pins
        GPIO.setup(self.in1, GPIO.OUT)
        GPIO.setup(self.in2, GPIO.OUT)
        GPIO.setup(self.en, GPIO.OUT)
        
        # Set the motor to off
        GPIO.output(self.in1, GPIO.LOW)
        GPIO.output(self.in2, GPIO.LOW)
        
        # Set up the PWM signal
        self.p = GPIO.PWM(en, 1000)
        
        # Start the PWM signal for speed control
        self.p.start(25)

    def release(self):
        """
        Releases GPIO resources, cleanup method.
        """
        GPIO.cleanup()

    def forward(self):
        """
        Sets the motor to move forward.
        """
        GPIO.output(self.in1, GPIO.HIGH)
        GPIO.output(self.in2, GPIO.LOW)

    def backward(self):
        """
        Sets the motor to move backward.
        """
        GPIO.output(self.in1, GPIO.LOW)
        GPIO.output(self.in2, GPIO.HIGH)

    def stop(self):
        """
        Stops the motor.
        """
        GPIO.output(self.in1, GPIO.LOW)
        GPIO.output(self.in2, GPIO.LOW)

    def move(self, velocity:float):
        """
        Moves the motor at the specified velocity/percent.

        Args:
            velocity (float): Motor velocity, where negative values indicate backward,
                              positive values indicate forward, and 0 stops the motor.
        """
        # Handle the direction
        if velocity < 0:
            self.backward()
        elif velocity > 0:
            self.forward()
        else:
            self.stop()

        # Handle the speed
        speed = abs(velocity)
        if speed > 1:
            speed = 1

        self.p.ChangeDutyCycle(speed * 100)