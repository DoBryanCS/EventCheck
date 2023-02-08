from flask import jsonify, request, Response
from camera import get_frame
import connection_database

def create_routes(app):
    @app.route('/video')
    def video():
        return Response(get_frame(), mimetype='multipart/x-mixed-replace; boundary=frame')
    
    @app.route('/get_user_data', methods=['POST'])
    def get_user_data():
        user_id = request.json['userId']
        connection_database.get_user_data(user_id)
        return jsonify({'message': 'User data retrieved', 'user_id': user_id})
    
    @app.route('/delete_png', methods=['POST'])
    def delete_png():
        user_id = request.json['userId']
        png_id = request.json['pngId']
        connection_database.delete_png(user_id, png_id)
        return jsonify({'message': 'PNG deleted', 'user_id': user_id, 'png_id': png_id})