from flask import Flask, render_template
from forms import RegistrationForm, LoginForm
app = Flask(__name__)

app.config['SECRET_KEY'] = '31f214ac7307802de7160100ec7a549b'

@app.route("/")
def home():
    return render_template("index.html")

@app.route('/login')
def login():
    form = LoginForm();
    return render_template('login.html', form=form)

@app.route('/register')
def register():
    form = RegistrationForm()
    return render_template('register.html', form=form)
