from flask import Flask
from flask_restful import Api, Resource, request
from flask_login import LoginManager, login_required, current_user, login_user
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
api = Api(app)
login_manager = LoginManager(app)
db = SQLAlchemy(app)

from trackIt.models import User, Item, Entry

class Signup(Resource):
    def post(self):
        json_data = request.form
        username = json_data['username']
        password = json_data['password']
        email = json_data['email']
        try:
            new_user = User(username=username, password=password, email=email)
            db.session.add(new_user)
            db.session.commit()
            null_item = Item(name='None', price=0, user_id=new_user.id)
            db.session.add(null_item)
            db.session.commit()
            return
        except:

