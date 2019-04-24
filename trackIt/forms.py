from flask_wtf import FlaskForm
from wtforms import Field, StringField, PasswordField, SubmitField, BooleanField, SelectField, DecimalField, IntegerField
from wtforms.validators import DataRequired, Length, Email, EqualTo, NumberRange, ValidationError

from flask_login import current_user

from trackIt import db
from trackIt.models import User, Item

class RegistrationForm(FlaskForm):
	username = StringField('Username', validators = [DataRequired(), Length(min=2, max=20)])
	email = StringField('Email', validators = [DataRequired(), Email()])
	password = PasswordField('Password', validators = [DataRequired()])
	passwordConf = PasswordField('Confirm Password', validators = [DataRequired(), EqualTo('password')])
	submit  = SubmitField('Sign up')

	def validate_username(self, username):
		user  = User.query.filter_by(username=username.data).first()
		if user:
			raise ValidationError('That username is already taken.')

	def validate_password(self, password):
		user  = User.query.filter_by(password=password.data).first()
		if user:
			raise ValidationError('That password is already taken. ')

class LoginForm(FlaskForm):
	username = StringField('Username', validators = [DataRequired(), Length(min=2, max=20)])
	password = PasswordField('Password', validators = [DataRequired()])
	remember = BooleanField('Remember me')
	submit  = SubmitField('Login')

class NewSaleForm(FlaskForm):
	item = SelectField('Item', choices=[(0, 'None')])
	units = IntegerField('Units', validators=[DataRequired()])
	amt = DecimalField('Price Per Unit ($)', places=2, rounding=None)
	submitSale = SubmitField('Enter')

class NewPurchForm(FlaskForm):
	item = SelectField('Item', choices=[(0, 'None')])
	units = IntegerField('Units', validators=[DataRequired()])
	amt = DecimalField('Price Per Unit ($)', places=2, rounding=None)
	submitPurch = SubmitField('Enter')

class NewItemForm(FlaskForm):
	name = StringField('Name', validators = [DataRequired(), Length(min=1, max=20)])
	amt = DecimalField('Price Per Unit ($)', validators = [DataRequired()], places=2, rounding=None)
	submitItem = SubmitField('Enter')

	def validate_name(self, name):
		item = Item.query.filter_by(user_id=current_user.id, name = str(self.name.data)).first()
		if item:
			raise ValidationError('You have already created an item with this name.')