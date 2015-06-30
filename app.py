#!flask/bin/python
import requests
from flask import Flask, render_template, request, jsonify
from flask.ext.sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://makersrow:12345@127.0.0.1:3306/Factories'
db = SQLAlchemy(app)

## Create Factory Model
class Factory(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(80))
	email = db.Column(db.String(120))
	address = db.Column(db.String(255))
	lat = db.Column(db.Float(10,6))
	long = db.Column(db.Float(10,6))
	tag = db.relationship('Tag', backref='factory', lazy='dynamic')

	def __init__(self, name, email, address, lat, long, tags = []):
		self.name = name
		self.email = email
		self.address = address
		self.lat = lat
		self.long = long
		self.tag = tags

## Create Tag Model
class Tag(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(50))
	factory_id = db.Column(db.Integer, db.ForeignKey('factory.id'))

	@property
	def serialize(self):
		return {
			'name': self.name
		}

	def __init__(self, name, factory_id):
		self.name = name
		self.factory_id = factory_id

db.create_all()


# Return Base template
@app.route('/')
def showHome():
    return render_template('base.html')

# Return all factories
@app.route('/api/factory', methods=['GET'])
def getFactories():
	results = Factory.query.all()
	json_results = []
	for result in results:
		d = {
			'id': result.id,
			'name': result.name,
			'email': result.email,
			'address': result.address,
			'lat': result.lat,
			'long': result.long,
			'tags': [tag.serialize for tag in result.tag.all()]
		}
		json_results.append(d)  

	return jsonify(factories = json_results, count = len(results), errors = "false")

## Create a New Factory
@app.route('/api/factory', methods=['POST'])
def newFactory():
	## Find coordingates and uniformly formatted address from Google geocoder api
	request_data = requests.get('https://maps.googleapis.com/maps/api/geocode/json?address='+request.form['street-address']+'&key=AIzaSyDGcAYOMHX5OlxEOsVdWiRpS692LX4SdRQ')
	request_data = request_data.json()
	formatted_address = [item["formatted_address"] for item in request_data["results"] if "formatted_address" in item]
	longitude = [item["geometry"]["location"]["lng"] for item in request_data["results"] if "geometry" in item]
	latitude = [item["geometry"]["location"]["lat"] for item in request_data["results"] if "geometry" in item]

	factory = Factory(name=request.form['factory-name'], email=request.form['email-address'], address=formatted_address[0], lat=latitude[0], long=longitude[0])
	db.session.add(factory)
	db.session.commit()

	for tag in request.form['factory-tags'].split(", "):
		new_tag = Tag(tag, factory.id)
		db.session.add(new_tag)
		db.session.commit()

	json_result = {
	 	'id': factory.id,
	 	'name': factory.name,
	 	'email': factory.email,
	 	'address': factory.address,
	 	'lat': factory.lat,
		'long': factory.long,
	 	'tags': [tag.serialize for tag in factory.tag.all()]
	 }
	return jsonify(factory = json_result, errors = "false")

## Return a factory with given id
@app.route('/api/factory/<factory_id>', methods=['GET'])
def getFactory(factory_id):
	factory = Factory.query.filter_by(id=factory_id).first()
	json_result = {
		'id': factory.id,
		'name': factory.name,
		'email': factory.email,
		'address': factory.address,
		'lat': factory.lat,
		'long': factory.long,
		'tags': [tag.serialize for tag in factory.tag.all()]
	}
	return jsonify(factory = json_result, errors = "false")

## Update a factory with given id
@app.route('/api/factory/<factory_id>', methods=['PUT'])
def updateFactory(factory_id):
	factory = Factory.query.filter_by(id=factory_id).first()
	## Find coordingates and uniformly formatted address from Google geocoder api
	if request.form['street-address']:
		request_data = requests.get('https://maps.googleapis.com/maps/api/geocode/json?address='+request.form['street-address']+'&key=AIzaSyDGcAYOMHX5OlxEOsVdWiRpS692LX4SdRQ')
		request_data = request_data.json()
		formatted_address = [item["formatted_address"] for item in request_data["results"] if "formatted_address" in item]
		longitude = [item["geometry"]["location"]["lng"] for item in request_data["results"] if "geometry" in item]
		latitude = [item["geometry"]["location"]["lat"] for item in request_data["results"] if "geometry" in item]
		factory.address = formatted_address[0]
		factory.long = longitude[0]
		factory.lat = latitude[0]

	if request.form['factory-name']:
		factory.name = request.form['factory-name']

	if request.form['email-address']:
		factory.email = request.form['email-address']

	db.session.commit()

	if request.form['factory-tags']:

		for tag in factory.tag.all():
			db.session.delete(tag)
			db.session.commit()

		for tag in request.form['factory-tags'].split(", "):
			new_tag = Tag(tag, factory.id)
			db.session.add(new_tag)
			db.session.commit()

	json_result = {
		'id': factory.id,
		'name': factory.name,
		'email': factory.email,
		'address': factory.address,
		'lat': factory.lat,
		'long': factory.long,
		'tags': [tag.serialize for tag in factory.tag.all()]
	}
	return jsonify(factory = json_result)

## Update a factory with given id
@app.route('/api/factory/<factory_id>', methods=['DELETE'])
def deleteFactory(factory_id):
	factory = Factory.query.filter_by(id=factory_id).first()
	db.session.delete(factory)
	db.session.commit()

	json_result = {
		'deleted': 'true',
		'error': 'false',
	}
	return jsonify(result = json_result)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)