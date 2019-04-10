from flask_wtf import FlaskForm
from wtforms import Field, StringField, PasswordField, SubmitField, BooleanField, SelectField
from wtforms.validators import DataRequired, Length, Email, EqualTo, NumberRange

itemListTest = [('HB', 'Hamburger'), ('CB', 'Cheeseburger'), ('FR', 'Fries'), ('HD', 'Hotdog')]

class RegistrationForm(FlaskForm):
    username = StringField('Username', validators = [DataRequired(), Length(min=2, max=20)])
    email = StringField('Email', validators = [DataRequired(), Email()])
    password = PasswordField('Password', validators = [DataRequired()])
    passwordConf = PasswordField('Confirm Password', validators = [DataRequired(), EqualTo('Password')])
    submit  = SubmitField('Sign up')

class LoginForm(FlaskForm):
    username = StringField('Username', validators = [DataRequired(), Length(min=2, max=20)])
    password = PasswordField('Password', validators = [DataRequired()])
    remember = BooleanField('Remember me')
    submit  = SubmitField('Login')

class NewEntryForm(FlaskForm):
	item = SelectField('item', choices=itemListTest)
	units = StringField('Units', validators=[DataRequired(), NumberRange(min=1, message="Please enter a positive number.")])
	amtDollars = StringField('Amount$ (optional)', validators = [NumberRange(message="Please enter a number.")])
	amtCents = StringField('.', validators=[NumberRange(0, 2)])
	submit = SubmitField('Enter')