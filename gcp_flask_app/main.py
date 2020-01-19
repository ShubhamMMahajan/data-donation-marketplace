from flask import Flask, request, render_template,jsonify
import json
from pymongo import MongoClient
app = Flask(__name__)
listings = []
constant_price = 5
#description = "records how long your phone is in the case "
def add_listing(blockstack_id, name, about):
    new_listing = dict()
    new_listing['blockstack_id'] = blockstack_id 
    new_listing['price'] = constant_price
    new_listing['about'] = about
    new_listing['name'] = name
    listings.append(new_listing)

@app.route('/get_mongo')
def access_mongo_data():
    client = MongoClient('mongodb://35.185.249.125:27017/')
    db = client['yee']
    print("Connected to db")
    collection = db['radiks-server-data']
    print("Connected to collection")
    print(str(collection))
    print(str(collection.count_documents({})))
    print(str(collection.find()))
    return str(collection.find())
    #for post in collection.find():
    #    print(post)

@app.route('/get_data', methods=['PUT'])
def create_task():
    #blockstack_id = request.args.get('blockstack_id', "")
    blockstack_id = request.form['blockstack_id']
    name = request.form['name']
    about = request.form['about']
    add_listing(blockstack_id, name, about)
    return str(request.args)
    #return render_template('index.html', ids=listings)

@app.route('/')
def home():
    return render_template('index.html', ids=listings)



if __name__ == '__main__':
    app.run(debug=True)