"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, BlockedTokens
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token, create_refresh_token, get_jwt
from flask_bcrypt import Bcrypt

api = Blueprint('api', __name__)
app = Flask(__name__)
crypto = Bcrypt(app)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def new_user():
    print("signing up")
    email = request.json.get('email')
    password = request.json.get('password')
    password = crypto.generate_password_hash(password, 10).decode('utf-8')
    print(email)
    user = User(email=email, password = password, is_active = True)
    db.session.add(user)
    db.session.commit()
    return jsonify({'msg':"user created"}), 200

@api.route('/login', methods = ['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')
    user = User.query.filter(User.email == email).first()
    if user is None:
        return jsonify({'msg':"Login fail"}), 401
    if not crypto.check_password_hash(user.password, password):
        return jsonify({'msg':"Login fail"}), 401
    token = create_access_token(identity = user.id)
    refresh_token = create_refresh_token(identity= user.id)
    return jsonify({'accessToken':token, 'refreshToken': refresh_token})

@api.route('/refresh', methods=["POST"])
@jwt_required(refresh=True)
def refresh_token():
    user_id = get_jwt_identity()
    token = create_access_token(identity = user.id)
    return jsonify({'accessToken':token, 'refreshToken': refresh_token})


@api.route('/logout', methods = ['POST'])
@jwt_required()
def logout():
    jti = get_jwt()["jti"]
    token = BlockedTokens(token_id = jti)
    db.session.add(token)
    db.session.commit()
    return jsonify({'msg':'Logged out'})


@api.route('/private')
@jwt_required()
def get_user_info():
    user_id =  get_jwt_identity()
    user = User.query.get(user_id)
    return jsonify(user.serialize())
    
