from flask import render_template, flash, redirect, url_for
from trackIt.models import User, Item, Entry
from trackIt import app, db, bcrypt
from trackIt.forms import NewEntryForm, LoginForm, RegistrationForm

@app.route("/", methods=['GET' ,'POST'])
def home():
	return render_template('index.html', saleForm=NewEntryForm(), purchForm=NewEntryForm())

@app.route('/login', methods=['GET', 'POST'])
def login():
	form = LoginForm();
	if form.validate_on_submit(): 
		return redirect(url_for('home'))
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
		return redirect(url_for('home'))
	return render_template('register.html', form=form)