from trackIt import db, login_manager, bcrypt
from datetime import datetime
from flask_login import UserMixin


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(50), nullable=False)
    items = db.relationship('Item', backref='user', lazy=True)

    def add_user(username, password):
        user = User(username=username, password=password)
        db.session.add(user)
        try:
            db.session.commit()
        except:
            return False
        return user

    def to_json(self):
         return {'id': self.id,
                'username': self.username,
                'password': self.password
                }

    def check_password(self, regular_password):
        return bcrypt.check_password_hash(self.password, regular_password)

class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False, default='0')
    price = db.Column(db.Float(precision=2, asdecimal=True), nullable=False, default=0)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    entries = db.relationship('Entry', backref='item', lazy=True)
    total = db.Column(db.Float(precision=2, asdecimal=True), nullable=False, default=0)

    def to_json(self):
        return {'id': self.id,
                'name': self.name,
                'total': self.total,
                'user_id': self.user_id
        }

    def add_item(user_id, name, price):
        item = Item(name=name, price=price, user_id=user_id)
        db.session.add(item)
        db.session.commit()


class Entry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    item_id = db.Column(db.Integer, db.ForeignKey('item.id'), nullable=False)
    units = db.Column(db.Integer, nullable=False, default=0)
    amt = db.Column(db.Float(precision=2, asdecimal=True), nullable=False, default=0)
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def to_json(self):
        return {'id': self.id,
                'item_id': self.item_id,
                'units': self.units,
                'amt': self.amt,
                'date': {'day': self.date.day,
                         'month': self.date.month,
                         'year': self.date.year}
                }

    def add_entry(item_id, units, price):
        entry = Entry(item_id = item_id, units=units, amt=price*units)
        db.session.add(entry)
        item = Item.query.filter_by(id=item_id).first()
        item.total += price*units
        db.session.commit()

