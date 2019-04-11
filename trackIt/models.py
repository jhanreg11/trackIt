from trackIt import db
from datetime import datetime

class User(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	username = db.Column(db.String(20), unique=True, nullable=False)
	password = db.Column(db.String(50), nullable=False)
	email = db.Column(db.String(50), nullable=False, default='none@none.com')
	items = db.relationship('Item', backref='user', lazy=True)

	def __repr__(self):
		return "User('%S') id(%d)\n" % self.username, self.id

class Item(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(20), nullable=False, default='0')
	price = db.Column(db.Float(precision=2, asdecimal=True), nullable=False, default=0)
	rank = db.Column(db.Integer, nullable=False, default=0)
	user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
	entries = db.relationship('Entry', backref='item', lazy=True)

	def __repr__(self):
		return "Item('%S') id(%d)\n" % self.name, self.id

class Entry(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	amt = db.Column(db.Float(precision=2, asdecimal=True), nullable=False, default=0)
	date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
	item_id = db.Column(db.Integer, db.ForeignKey('item.id'), nullable=False)

	def __repr__(self):
		return "Entry: item_id('%S') id(%d)\n" % self.item_id, self.id