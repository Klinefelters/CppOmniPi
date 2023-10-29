from flask import Flask, request, jsonify
from robot import Robot

app = Flask(__name__)
robot = Robot()  # Assuming you have a Robot class with a move method.

@app.route('/control', methods=['POST'])
def control_robot():
    data = request.get_json()
    x = data.get('x', 0)
    y = data.get('y', 0)
    r = data.get('r', 0)
    robot.move(x, y, r)
    return jsonify({"message": "Robot moved successfully"})

if __name__ == '__main__':
    app.run()
