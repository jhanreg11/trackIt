from flask import render_template, flash, redirect, url_for, request
from flask_login import login_user, current_user, logout_user, login_required
from trackIt.models import User, Item, Entry
from trackIt import app, db, bcrypt
from trackIt.forms import NewEntryForm, LoginForm, RegistrationForm, NewItemForm

@app.route("/home", methods=['GET' ,'POST'])
@login_required
def home():
	#itemList = NewEntryForm.choices
	#for x in current_user.items:
	#	itemList += (x.id, x.name)
	#print(itemList)

	itemForm = NewItemForm()
	saleForm = NewEntryForm()
	purchForm = NewEntryForm()

	purchForm.item.choices = [(x.id, x.name) for x in Item.query.filter_by(user_id=current_user.id).all()]
	saleForm.item.choices = [(x.id, x.name) for x in Item.query.filter_by(user_id=current_user.id).all()]

	if purchForm.validate_on_submit():
		item = Item.query.filter_by(id=purchForm.item.data).first()
		if purchForm.amt.data:
			amt = -(purchForm.amt.data * purchForm.units.data)
		else:
			amt = -(units * item.price)
		purch = Entry(item=item, units=purchForm.units.data, amt=amt)
		db.session.add(purch)
		db.session.commit()

	if saleForm.validate_on_submit():
		print("Alabaster")

	if itemForm.validate_on_submit():
		print('\n\nitem form submitted\n\n')
		item = Item(name=itemForm.name.data, price=itemForm.amt.data, user_id=current_user.id)
		db.session.add(item)
		db.session.commit()
		purchForm.item.choices = [(x.id, x.name) for x in Item.query.filter_by(user_id=current_user.id).all()]
		saleForm.item.choices = [(x.id, x.name) for x in Item.query.filter_by(user_id=current_user.id).all()]
		itemForm.name.data = None
		itemForm.amt.data = None
	return render_template('index.html', saleForm=saleForm, purchForm=purchForm, itemForm=itemForm)

@app.route('/', methods=['GET', 'POST'])
def login():
	form = LoginForm()
	if form.validate_on_submit():
		user = User.query.filter_by(username=form.username.data).first()
		if user and bcrypt.check_password_hash(user.password, form.password.data):
			login_user(user, remember=form.remember.data)
			next_page = request.args.get('next')
			return redirect(next_page) if next_page else redirect(url_for('home'))
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
		db.session.refresh(user)
		nullItem = Item(name='None', price=0, user_id=user.id)
		db.session.add(nullItem)
		db.session.commit()
		flash('Welcome new user!', 'success')
		return redirect(url_for('login'))
	print(form.errors)
	return render_template('register.html', form=form)

@app.route('/logout')
def logout():
	logout_user()
	return redirect(url_for('login'))

@app.route('/sales_record')
@login_required
def sales_record():
	user_id = current_user.id
	entries = Entry.query.filter_by(id=user_id).all()
	return render_template('sales.html', entries=entries, Item=Item)
