from flask import Blueprint, jsonify, request
from robot import Robot

events_bp = Blueprint('events', __name__)

robot = Robot()

@events_bp.route('/control', methods=['POST'])
def control_robot():
    data = request.get_json()
    x = data.get('x', 0)
    y = data.get('y', 0)
    r = data.get('r', 0)
    robot.move(x, y, r)
    return jsonify({"message": "Robot moved successfully"})

