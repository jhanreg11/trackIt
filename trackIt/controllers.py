from trackIt import app, db
from flask import request, jsonify
from trackIt.models import *
from flask_login import login_user, current_user, logout_user, login_required
from datetime import datetime, timedelta

@app.route('/api/sign-up', methods=['POST'])
def post_user():
    data = request.get_json(force=True)
    hashed_pw = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    user = User.add_user(data['username'], hashed_pw)
    if user:
        login_user(user)
        return jsonify({'success': True, 'user': user.to_json()})
    else:
        return jsonify({'success': False})

@app.route('/api/sign-in', methods=['POST'])
def get_user():
    data = request.get_json(force=True)
    username = data['username']
    password = data['password']
    user = User.query.filter_by(username=username).first()
    if user:
        if user.check_password(password):
            login_user(user)
            return jsonify({'success': True, 'user': user.to_json()})
    return jsonify({'success': False})

@app.route('/api/sign-out', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({'success': True})

@app.route('/api/user', methods=['GET'])
def get_users():
    return jsonify({'users': [user.to_json() for user in User.query.all()]})

@app.route('/api/entry', methods=['GET'])
@login_required
def get_entries():
    entries = []
    params = request.args.to_dict()
    items = [item for item in current_user.items]
    for item in items:
        entries += item.entries
    if 'order' in params:
        if params['order'] == 'date':
            Entry.sort(entries)
    #if 'per' in params:
     #   print('I made it')
        # filter out all entries not within the per
    return jsonify({'entries': [entry.to_json() for entry in entries]})

@app.route('/api/entry', methods=['POST'])
@login_required
def post_entry():
    data = request.get_json(force=True)

    if 'price' in data:
        price = data['units'] * data['price']
    else:
        price = data['units'] * Item.query.filter_by(id=data['item_id']).first().price
    entry = Entry.add_entry(data['item_id'], data['units'], price)
    if entry:
        return jsonify({'success': True, 'entry': entry.to_json()})
    else:
        return jsonify({'success': False, 'current_user': current_user.username})

@app.route('/api/item', methods=['GET'])
@login_required
def get_items():
    return  jsonify({'items': [item.to_json() for item in current_user.items]})

@app.route('/api/item', methods=['POST'])
@login_required
def post_item():
    data = request.get_json(force=True)
    print(current_user.id, data['name'], data['price'])
    item = Item.add_item(current_user.id, data['name'], data['price'])
    if item:
        return jsonify({'success': True, 'item': item.to_json()})
    else:
        return jsonify({'success': False, "current_user": current_user.username})

@app.route('/api/totals', methods=['GET'])
@login_required
def get_totals():
    params = request.args.to_dict()
    profits = 0
    sales = 0
    purchs = 0
    per = 0
    if 'per' in params:
        per = params['per']
    for x in current_user.items:
        for y in x.entries:
            if y.date >= datetime.utcnow() - timedelta(days=int(per)):
                profits += y.amt
                if y.amt > 0:
                    sales += y.amt
                else:
                    purchs += y.amt

    return jsonify({'totals': {'profits': profits, 'sales': sales, 'purchs': -purchs}})



