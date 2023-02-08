from flask import jsonify, request, Response
from camera import get_frame

def create_routes(app):
    @app.route('/video')
    def video():
        return Response(get_frame(), mimetype='multipart/x-mixed-replace; boundary=frame')
    
    @app.route('/get_user_data', methods=['POST'])
    def get_user_data():
        user_id = request.json['userId']
        return jsonify({'message': 'User data retrieved', 'user_id': user_id})