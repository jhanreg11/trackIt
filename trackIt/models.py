from trackIt import db, login_manager
from datetime import datetime
from flask_login import UserMixin

@login_manager.user_loader
def load_user(user_id):
	return User.query.get(int(user_id))

class User(UserMixin, db.Model):
	id = db.Column(db.Integer, primary_key=True)
	username = db.Column(db.String(20), unique=True, nullable=False)
	password = db.Column(db.String(50), nullable=False)
	email = db.Column(db.String(50), nullable=False, default='none@none.com')
	items = db.relationship('Item', backref='user', lazy=True)

	def __init__(self, username, email, password):
		self.username = username
		self.password = password
		self.email = email

	def __repr__(self):
		return "User('%r') id(%d)\n" % (self.username, self.id)

class Item(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(20), nullable=False, default='0')
	price = db.Column(db.Float(precision=2, asdecimal=True), nullable=False, default=0)
	rank = db.Column(db.Integer, nullable=False, default=0)
	user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
	entries = db.relationship('Entry', backref='item', lazy=True)

	def __repr__(self):
		return "Item id(%d) name(%r)" % (self.id, self.name)

class Entry(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	item_id = db.Column(db.Integer, db.ForeignKey('item.id'), nullable=False)
	#item = db.relationship('item', foreign_keys='Entry.item_id')
	units = db.Column(db.Integer, nullable=False, default=0)
	amt = db.Column(db.Float(precision=2, asdecimal=True), nullable=False, default=0)
	date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

	def __repr__(self):
		return "Entry: item_id({%d) id(%d)\n" % (self.item_id, self.id)

	def to_json(self):
		entry = {'id':self.id, 'item_id':self.item_id, 'units': self.units, 'amt': self.amt}
		return entry