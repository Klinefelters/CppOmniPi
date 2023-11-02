class Robot:

    def __init__(self):
        print("Declared")

    def release(self):
        print("Released")

    def move(self, vx: float, vy: float, theta: float):
        print(f"Moved: vx: {vx:.3f} | vy: {vy:.3f} | theta: {theta:.3f} | ")
