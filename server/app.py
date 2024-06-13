# app.py
from flask import Flask, jsonify, request, session, make_response
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from models import db, User, Task
from datetime import datetime
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = os.urandom(24)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)
CORS(app, supports_credentials=True)

bcrypt = Bcrypt(app)

@app.route('/')
def hello_world():
    return 'Twoja przygoda zaprowadziła Cię za daleko!'

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data['username']
    password = data['password']
    user = User.query.filter_by(username=username).first()
    if user and user.check_password(password):
        session['user_id'] = user.id
        session['username'] = user.username
        return jsonify({'message': 'Logowanie przebiegło pomyślnie','id': user.id, 'username': user.username, 'level': user.level, 'exp_points': user.exp_points}), 200
    return jsonify({'message': 'Niepoprawne dane logowania'}), 400

@app.route('/api/data')
def get_data():
    data = {'message': 'Witamy na zapleczu!'}
    return jsonify(data)

@app.route('/api/user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404
    return jsonify({'id': user.id, 'username': user.username, 'level': user.level, 'exp_points': user.exp_points}), 200

@app.route('/api/users', methods=['GET', 'POST'])
def users():
    if request.method == 'GET':
        users = User.query.all()
        users_data = [{'id': user.id, 'username': user.username} for user in
                      users]
        return jsonify(users_data)
        pass
    elif request.method == 'POST':
        data = request.json
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return jsonify({'message': 'Nie podano loginu lub hasła'}), 400

        if User.query.filter_by(username=username).first():
            return jsonify({'message': 'Podany użytkownik już istnieje'}), 400

        new_user = User(username=username)
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({'message': 'Rejestracja przebiegła pomyślnie'}), 201
        pass


@app.route('/api/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    session.pop('username', None)
    return jsonify({'message': 'Wylogowano pomyślnie'}), 200


@app.route('/api/tasks', methods=['GET', 'POST'])
def create_task():
    if request.method == 'GET':
        tasks = Task.query.all()
        tasks_data = [{'id': task.id, 'description': task.description, 'exp_points': task.exp_points,
                       'difficulty': task.difficulty,'completed': task.completed} for task in
                      tasks]
        return jsonify(tasks_data)
        pass
    elif request.method == 'POST':
        data = request.json
        user_id = data['user_id']
        description = data['description']
        exp_points = data['exp_points']
        difficulty = data['difficulty']
        deadline = data['deadline']

        user = User.query.get(user_id)
        if not user:
            return jsonify({'message': 'User not found'}), 404

        new_task = Task(
            description=description,
            exp_points=exp_points,
            difficulty=difficulty,
            deadline=datetime.strptime(deadline, '%Y-%m-%dT%H:%M'),
            user=user
        )
        db.session.add(new_task)
        db.session.commit()

        return jsonify({'message': 'Task created successfully'}), 201


@app.route('/api/tasks/<int:user_id>', methods=['GET'])
def get_tasks(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'Nie znaleziono użytkownika'}), 404

    tasks = Task.query.filter_by(user_id=user_id).all()
    return jsonify([task.to_dict() for task in tasks])

@app.route('/api/tasks/complete/<int:task_id>', methods=['POST'])
def complete_task(task_id):

    task = Task.query.get(task_id)
    if not task:
        return jsonify({'message': 'Nie znaleziono zadania'}), 404

    task.complete_task()
    db.session.commit()

    return jsonify({'message': 'Zadanie zakończone pomyślnie'}), 200

# ranking
@app.route('/api/users/ranking', methods=['GET'])
def get_user_ranking():
    users = User.query.order_by(User.level.desc()).all()
    users_data = [{'username': user.username, 'level': user.level} for user in
                  users]
    return jsonify(users_data)
    pass


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(port=5000, debug=True)