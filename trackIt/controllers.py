from trackIt import app, db
from flask import request, jsonify
from trackIt.models import *
from flask_login import login_user, current_user, logout_user, login_required

@app.route('/sign-up', methods=['POST'])
def post_user():
    data = request.get_json(force=True)
    hashed_pw = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    user = User.add_user(data['username'], hashed_pw)
    if user:
        login_user(user)
        return jsonify({'success': True, 'user': user.to_json()})
    else:
        return jsonify({'success': False})

@app.route('/sign-in', methods=['POST'])
def get_user():
    data = request.get_json(force=True)
    username = data['username']
    password = data['password']
    user = User.query.filter_by(username=username).first()
    if user:
        if user.check_password(password):
            login_user(user)
            return jsonify(user.to_json())
    return jsonify({'error': 'There was an error signing in'})

@app.route('/api/entry', methods=['GET'])
@login_required
def get_entries():
    entries = []
    items = [item for item in current_user.items]
    for item in items:
        entries += item.entries

    return jsonify({'entries': [entry.to_json() for entry in entries]})

@app.route('/api/entry', methods=['POST'])
@login_required
def post_entry():
    data = request.get_json(force=True)
    entry = Entry.add_entry(data['item_id'], data['units'], data['price'])
    if entry:
        return jsonify({'success': True, 'entry': entry.to_json()})
    else:
        return jsonify({'success': False})

@app.route('/api/item', methods=['GET'])
@login_required
def get_items():
    return  jsonify({'items': [item.to_json() for item in current_user.items]})

@app.route('/api/item', methods=['POST'])
@login_required
def post_item():
    data = request.get_json(force=True)
    item = Item.add_item(current_user.id, ['name'], data['price'])
    if item:
        return jsonify({'success': True, 'item': item.to_json()})
    else:
        return jsonify({'success': False})



