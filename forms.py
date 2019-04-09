from flask_wtf import FlaskForm
from wtforms import Field, StringField, PasswordField, SubmitField, BooleanField
from wtforms.validators import DataRequired, Length, Email, EqualTo

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
