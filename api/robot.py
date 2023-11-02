from l298n import L298N


class Robot:

    def __init__(self):
        """
        Initialize a robot with four L298N motor controllers for movement.

        This constructor sets up the L298N motor controllers for the four wheels of the robot.

        Args:
            None

        Returns:
            None
        """
        self.frontLeft = L298N(
            in1=27,
            in2=17,
            en=22,
        )
        self.backLeft = L298N(
            in1=26,
            in2=19,
            en=13,
        )
        self.frontRight = L298N(
            in1=20,
            in2=21,
            en=16,
        )
        self.backRight = L298N(
            in1=24,
            in2=23,
            en=25,
        )

        self.motors = [self.frontLeft, self.backLeft,
                       self.frontRight, self.backRight]

    def release(self):
        """
        Release control of all motors, effectively stopping the robot.

        This method releases control of all motors, setting them to a neutral state, which stops the robot.

        Args:
            None

        Returns:
            None
        """
        for motor in self.motors:
            motor.release()

    def move(self, vx: float, vy: float, theta: float):
        """
        Move the robot based on specified linear and angular velocities.

        This method controls the robot's movement by adjusting the motor speeds according to the provided
        linear velocity (vx), lateral velocity (vy), and angular velocity (theta). The velocities are
        used to determine the appropriate motor speeds for movement.

        Args:
            vx (float): Linear velocity (forward/backward)
            vy (float): Lateral velocity (sideways)
            theta (float): Angular velocity (rotation)

        Returns:
            None
        """
        denominator = max(abs(vy) + abs(vx) + abs(theta), 1)
        self.frontLeft.move((vy + vx + theta) / denominator)
        self.backLeft.move((vy - vx + theta) / denominator)
        self.frontRight.move((vy - vx - theta) / denominator)
        self.backRight.move((vy + vx - theta) / denominator)
