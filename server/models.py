# models.py
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates, relationship
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
})


db = SQLAlchemy(metadata=metadata)

class User(db.Model, SerializerMixin):
  __tablename__ = 'users'
  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String(80), unique=True, nullable=False)
  password_hash = db.Column(db.String(128), nullable=False)
  level = db.Column(db.Integer, default=1)
  exp_points = db.Column(db.Integer, default=0)

  tasks = relationship('Task', back_populates='user', cascade='all, delete-orphan')

  def set_password(self, password):
      self.password_hash = generate_password_hash(password)

  def check_password(self, password):
      return check_password_hash(self.password_hash, password)

  def add_exp(self, points):
      self.exp_points += points
      while self.exp_points >= 1000:
          self.exp_points -= 1000
          self.level += 1

  def __repr__(self):
      return f'<User {self.username}>'


class Task(db.Model, SerializerMixin):
    __tablename__ = 'tasks'
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(300), nullable=False)
    exp_points = db.Column(db.Integer, nullable=False)
    difficulty = db.Column(db.String(50), nullable=False)
    deadline = db.Column(db.DateTime, nullable=False)
    completed = db.Column(db.Boolean, default=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    user = relationship('User', back_populates='tasks')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'description': self.description,
            'exp_points': self.exp_points,
            'difficulty': self.difficulty,
            'deadline': self.deadline.isoformat(),
            'completed': self.completed
        }

    def complete_task(self):
        self.completed = True
        self.user.add_exp(self.exp_points)

    def __repr__(self):
        return f'<Task {self.description}>'