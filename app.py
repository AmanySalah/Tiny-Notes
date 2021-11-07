# Import flask stuff ..
from flask import Flask, render_template, request, redirect, url_for, flash

# Import sqlalchemy to handle the db
from flask_sqlalchemy import SQLAlchemy

import os

from sqlalchemy.sql import func

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db/db.sqlite'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    Title = db.Column(db.String(1000), nullable=False)
    Note = db.Column(db.String(100000), nullable=True)
    Date = db.Column(db.DateTime(timezone=True), server_default=func.now())
    # user_id = db.Column(db.Integer)



@app.route('/')
def index():

    Notes = Note.query.all()

    return render_template('index.html', notes_list=Notes)


# add a note
@app.route('/add', methods=["POST"])
def add():
    
    # get the title of the note
    title = request.form.get("title")

    # get the note 
    note = request.form.get("note")

    # if the title is empty then redirect to the index page
    if title == "":
        return redirect(url_for("index"))

    # create a Note object
    newNote = Note(Title=title, Note=note)
    print(newNote.Title, newNote.Note)
    # try to add the object to the database
    try:
        db.session.add(newNote)
        db.session.commit()
        return redirect(url_for("index"))
        
    except:
        return "There was an issue adding your note."


# delete a note
@app.route('/delete/<int:Note_id>')
def delete(Note_id):

    # get the note from the data base
    note = Note.query.filter_by(id=Note_id).first()
    
    try:
        db.session.delete(note)
        db.session.commit()
        return redirect(url_for("index"))
    except:
        return "There was an issue deleting your note."


# delete a note
@app.route('/update/<int:Note_id>')
def update(Note_id):

    # get the note from the data base
    note = Note.query.filter_by(id=Note_id).first()
    # toggle the complete value
    note.complete = not note.complete

    # try to commit to the database
    try:
        db.session.commit()
        return redirect(url_for("index"))
    except:
        return "There was an issue deleting your note."


if __name__ == "__main__":
    
    db.create_all()
    port = int(os.environ.get('PORT', 5000))

    app.run(host = '0.0.0.0', port = port, debug=True)
