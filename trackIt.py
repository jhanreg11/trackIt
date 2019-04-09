from flask import Flask, render_template, flash, redirect, url_for
from forms import RegistrationForm, LoginForm
app = Flask(__name__)

app.config['SECRET_KEY'] = '31f214ac7307802de7160100ec7a549b'

@app.route("/")
def home():
    return render_template('index.html')

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
    	flash('Welcome new user!', 'success')
    	return redirect(url_for('home'))
    return render_template('register.html', form=form)
