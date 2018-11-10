from flask import Flask
from flask import request, make_response, jsonify
from flask_restful import reqparse, abort, Api, Resource
from flask_pymongo import PyMongo
from bson.json_util import dumps
from uuid import uuid4
import jwt
import datetime
import bcrypt

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://stock-club:stock-club1@ds155213.mlab.com:55213/heroku_n7zk6r5p"
app.config["SECRET_KEY"] = "J\x049E3\xc9r\xac \xccwR\xc8&\xaa\x02+\xb3\xd1\xb2}\xfe3\x95"
mongo = PyMongo(app)
api = Api(app)


####################
## Util Functions ##
####################
def generate_response(resp):
    return '{"message": "' + resp + '"}'

def encode_auth_token(user_id):
    """
    Generates the Auth Token
    :return: string
    """
    try:
        payload = {
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=0, seconds=5),
            'iat': datetime.datetime.utcnow(),
            'sub': user_id
        }
        return jwt.encode(
            payload,
            app.config.get('SECRET_KEY'),
            algorithm='HS256'
        )
    except Exception as e:
        return e

def decode_auth_token(auth_token):
    """
    Decodes the auth token
    :param auth_token:
    :return: integer|string
    """
    try:
        payload = jwt.decode(auth_token, app.config.get('SECRET_KEY'))
        return payload['sub']
    except jwt.ExpiredSignatureError:
        return 'Signature expired. Please log in again.'
    except jwt.InvalidTokenError:
        return 'Invalid token. Please log in again.'


###################
## MEMBERS API'S ##
###################
@app.route('/members', methods=['GET'])
def getMembers():
    members = mongo.db.members.find()
    memberList = []
    for member in members:
        member.pop('password')
        member.pop('_id')
        memberList.append(member)
    return jsonify(memberList)

@app.route('/members/<string:member_id>', methods=['DELETE'])
def deleteMember(member_id):
    mongo.db.members.delete_one({ "id": member_id })
    resp = 'deleted member with id: ' + member_id
    print(resp)
    return generate_response(resp)


#################
## FUNDS API'S ##
#################
@app.route('/funds', methods=['GET'])
def getFunds():
    funds = mongo.db.funds.find()
    available = 0
    used = 0
    pending = 0
    for fund in funds:
        available += fund['available']
        used += fund['used']
        pending += fund['pending']
    total = available + used + pending
    return '{"available": ' + str(available) + ', "used": ' + str(used) + ', "pending": ' + str(pending) + ', "total": ' + str(total) + '}'

# @app.route('/funds/<string:user_id>', methods=['GET'])
# def getFunds(user_id):
#    return dumps(mongo.db.funds.find({ "userId": user_id }))

@app.route('/funds', methods=['POST'])
def postFunds():
    data = request.json
    newAmount = data['amount']
    fund = mongo.db.funds.find_one( { "userId": data["userId"] })
    previousAmount = fund['available']
    mongo.db.funds.update_one({ 'userId': data['userId'] }, { '$set': { 'available': int(previousAmount) + int(newAmount) } })
    resp = 'Added $' + str(newAmount) + ' to funds. Total is now $' + str(int(previousAmount) + int(newAmount))
    print(resp)
    return generate_response(resp)


#################
## LOGIN API'S ##
#################
@app.route('/login', methods=['POST'])
def postLogin():
    try:
        data = request.json
        user = mongo.db.members.find_one( { "email": data['email'] })
        if user and bcrypt.checkpw(data['password'].encode('utf8'), user['password']):
            auth_token = encode_auth_token(user['id'])
            if auth_token:
                responseObject = {
                    'status': 'success',
                    'message': 'Successfully logged in.',
                    'auth_token': auth_token.decode()
                }
                return make_response(jsonify(responseObject)), 200
            else:
                responseObject = {
                    'status': 'fail',
                    'message': 'User does not exist.'
                }
                return make_response(jsonify(responseObject)), 404
        else:
            responseObject = {
                'status': 'fail',
                'message': 'User does not exist.'
            }
            return make_response(jsonify(responseObject)), 404
    except Exception as e:
        print(e)
        responseObject = {
            'status': 'fail',
            'message': 'Try again'
        }
        return make_response(jsonify(responseObject)), 500


####################
## REGISTER API'S ##
####################
@app.route('/register', methods=['POST'])
def postRegister():
    try:
        data = request.json
        user = mongo.db.members.find_one( { "email": data['email'] })
        if not user:
            try:
                id = str(uuid4())
                data['id'] = id
                data['password'] = bcrypt.hashpw(data['password'].encode('utf8'), bcrypt.gensalt())
                print('data: ' + str(data))
                mongo.db.members.insert_one(data)
                responseObject = {
                    'status': 'success',
                    'message': 'Successfully registered.',
                }
                return make_response(jsonify(responseObject)), 201
            except Exception as e:
                print(e)
                responseObject = {
                    'status': 'fail',
                    'message': 'Some error occurred. Please try again.'
                }
                return make_response(jsonify(responseObject)), 500
        else:
            responseObject = {
                'status': 'fail',
                'message': 'User already exists. Please Log in.',
            }
            return make_response(jsonify(responseObject)), 202
    except Exception as e:
        print(e)
        responseObject = {
            'status': 'fail',
            'message': 'Try again'
        }
        return make_response(jsonify(responseObject)), 500

if __name__ == '__main__':
    app.run(debug=True)