from flask import render_template, flash, redirect, url_for
from flask_login import login_user, current_user, logout_user, login_required
from trackIt.models import User, Item, Entry
from trackIt import app, db, bcrypt
from trackIt.forms import NewEntryForm, LoginForm, RegistrationForm


@app.route("/home", methods=['GET' ,'POST'])
@login_required
def home():
	return render_template('index.html', saleForm=NewEntryForm(), purchForm=NewEntryForm())

@app.route('/', methods=['GET', 'POST'])
def login():
	form = LoginForm()
	if form.validate_on_submit():
		user = User.query.filter_by(username=form.username.data).first()
		if user and bcrypt.check_password_hash(user.password, form.password.data):
			login_user(user, remember=form.remember.data)
			return redirect(url_for('home'))
		else:
			flash('Login Unsuccessful', 'failure')
	return render_template('login.html', form=form)

@app.route('/register', methods=['GET', 'POST'])
def register():
	form = RegistrationForm()
	if form.validate_on_submit():
		hashed_pw = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
		user = User(username=form.username.data, password=hashed_pw, email=form.email.data)
		db.session.add(user)
		db.session.commit()
		flash('Welcome new user!', 'success')
		return redirect(url_for('login'))
	print(form.errors)
	return render_template('register.html', form=form)

@app.route('/logout')
def logout():
	logout_user()
	return redirect(url_for('home'))
