from flask import Flask
from flask import request, make_response, jsonify
from flask_restful import reqparse, abort, Api, Resource
from flask_pymongo import PyMongo
from bson.json_util import dumps
from uuid import uuid4
from alpha_vantage.timeseries import TimeSeries
import jwt
from datetime import datetime
import bcrypt
from pytz import timezone
import pytz

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://stock-club:stock-club1@ds155213.mlab.com:55213/heroku_n7zk6r5p"
app.config["SECRET_KEY"] = "J\x049E3\xc9r\xac \xccwR\xc8&\xaa\x02+\xb3\xd1\xb2}\xfe3\x95"
mongo = PyMongo(app)
api = Api(app)


ALPHA_VANTAGE_API_KEY = 'ETOGY4QLPL5GS9HH'
av = TimeSeries(key=ALPHA_VANTAGE_API_KEY, output_format='json')



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
    fund = mongo.db.funds.find_one({ 'userId': 'general' })
    total = fund['available'] + fund['used'] + fund['pending']
    return '{"available": ' + str(fund['available']) + ', "used": ' + str(fund['used']) + ', "pending": ' + str(fund['pending']) + ', "total": ' + str(total) + '}'

@app.route('/funds/<string:user_id>', methods=['GET'])
def getMemberFunds(user_id):
    fund = mongo.db.funds.find_one({ "userId": user_id })
    if fund is None:
        return '{"available": ' + str(0) + ', "used": ' + str(0) + ', "pending": ' + str(0) + ', "total": ' + str(0) + '}'
    else:
        total = fund['available'] + fund['used'] + fund['pending']
        return '{"available": ' + str(fund['available']) + ', "used": ' + str(fund['used']) + ', "pending": ' + str(fund['pending']) + ', "total": ' + str(total) + '}'

@app.route('/funds', methods=['POST'])
def postFunds():
    data = request.json
    newAmount = data['amount']
    previousAmount = 0
    generalFund = mongo.db.funds.find_one({ 'userId': 'general' })
    fund = mongo.db.funds.find_one( { "userId": data["userId"] })
    if fund is None:
        mongo.db.funds.insert_one({'userId': data["userId"], 'available': newAmount, 'used': 0, 'pending': 0})
    else:
        previousAmount = fund['available']
        mongo.db.funds.update_one({ 'userId': data['userId'] }, { '$set': { 'available': int(previousAmount) + int(newAmount) } })
    mongo.db.funds.update_one({ 'userId': 'general' }, { '$set': { 'available': int(generalFund['available']) + int(newAmount) } })
    resp = 'Added $' + str(newAmount) + ' to funds. Total is now $' + str(int(previousAmount) + int(newAmount))
    print(resp)
    return generate_response(resp)


##################
## STOCKS API'S ##
##################
@app.route('/stocks', methods=['GET'])
def getStocks():
    stockList = []
    stocks = mongo.db.stocks.find()
    if stocks is None:
        return jsonify([])
    else:
        tickerList = []
        for stock in Stocks:
            tickerList.append(stock['ticker'])
        meta, batchStockQuotes = av.get_batch_stock_quotes(symbols=(tickerList))
        tz = timezone(meta['3. Time Zone'])
        print('hello' + batchStockQuotes)
        for stock in Stocks:
            for quote in batchStockQuotes:
                if stock['ticker'] == quote['1. symbol']:
                    stock['currentPrice'] = quote['2. price']
                    stock['totalValue'] = stock['numberOfShares'] * stock['currentValue']
                    date = datetime.strptime(quote['4. timestamp'], '%Y-%m-%d %H:%M:%S')
                    date_utc = tz.localize(datetime_object).total_seconds()
                    stock['timestamp'] = date_utc
                    stockList.append(stock)
        return jsonify(stocks)

@app.route('/stocks/<string:search_string>', methods=['GET'])
def searchTickers(search_string):
    searchResult = av.get_symbol_search(search_string)
    print('batch stocks: ' + str(jsonify(searchResult)))
    return jsonify(searchResult)


# Expected payload:
# ticker: string
# pricePerShare: number
# numberOfShares: number (negative for sell, positive for buy)

# Stocks db stucture:
# ticker: string
# numberOfShares: number


# TODO: 
# - add error handling
# - add deleting stocks
# - update general fund when buying/selling stocks

@app.route('/stocks', methods=['POST'])
def postStocks():
    data = request.json
    ticker = data['ticker']
    pricePerShare = int(data['pricePerShare'])
    numberOfShares = int(data['numberOfShares'])
    buying = numberOfShares > 0
    fund = mongo.db.funds.find_one({ 'userId': 'general' })
    stock = mongo.db.stocks.find_one( { 'ticker': ticker })

    if buying and numberOfShares * pricePerShare > fund['available']:
        # throw error: not enough available funds to purchase stock
        print('ERROR: not enough available funds to purchase stock')

    if stock is None:
        if buying:
            #buying new stock
            mongo.db.stocks.insert_one({ 'ticker': ticker, 'numberOfShares': int(numberOfShares) })
        else:
            # throw error: trying to sell stock that doesn't exist
            print('Error: trying to sell stock that doesn\'t exist')
    else:
        #stock exists, add or subtract from it
        if buying:
            mongo.db.stocks.update_one({ 'ticker': ticker }, { '$set': { 'numberOfShares': int(stock['numberOfShares']) + int(numberOfShares) } })
        else:
            # selling shares of a stock
            if numberOfShares > stock['numberOfShares']:
                # throw error: trying to sell more shares than owned
                print('ERROR: trying to sell more shares than owned')
            else:
                mongo.db.stocks.update_one({ 'ticker': ticker }, { '$set': { 'numberOfShares': int(stock['numberOfShares']) + int(numberOfShares) } })
    return generate_response('hi')


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