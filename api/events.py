from flask import Blueprint, jsonify, request, Response
from camera import Camera
from mockRobot import Robot

events_bp = Blueprint('events', __name__)

robot = Robot()
camera = Camera()


@events_bp.route('/control', methods=['POST'])
def control_robot():
    data = request.get_json()
    x = data.get('x', 0)
    y = data.get('y', 0)
    r = data.get('r', 0)
    robot.move(x, y, r)
    return jsonify({"message": "Robot moved successfully"})


@events_bp.route('/video_feed')
def video_feed():
    return Response(camera.gen_frames(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')
