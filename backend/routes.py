from flask import jsonify, request, Response
from camera import get_frame
import connection_database

def create_routes(app):
    @app.route('/video/<user_id>')
    def video(user_id):
        return Response(get_frame(user_id), mimetype='multipart/x-mixed-replace; boundary=frame')
    
    @app.route('/get_user_data', methods=['POST'])
    def get_user_data():
        user_id = request.json['userId']
        connection_database.get_user_data(user_id)
        return jsonify({'message': 'User data retrieved', 'user_id': user_id})
    
    @app.route('/delete_png', methods=['DELETE'])
    def delete_png():
        user_id = request.json['userId']
        png_id = request.json['pngId']
        connection_database.delete_png(user_id, png_id)
        return jsonify({'message': 'PNG deleted', 'user_id': user_id, 'png_id': png_id})