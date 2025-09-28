from flask import Flask, render_template, request, redirect, url_for, session
from flask_migrate import Migrate
import os

# Initialization

app = Flask(__name__)

app.config['SECRET_KEY'] = 'AudioVisualizer'

# Routes

@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'GET':
        return render_template('home.html')
    if request.method == 'POST':
        songname = request.form.get('songname')
        authorname = request.form.get('authorname')
        audio = request.files['audio']

        if audio and audio.filename.endswith('.mp3'):
            filename = audio.filename
            filepath = os.path.join('static/songuploads', filename)
            audio.save(filepath)

        session["song"] = {
            "audio": filename, 
            "songname": songname, 
            "author": authorname}
        
        return redirect(url_for('player'))

@app.route('/player')
def player():
    song = session.get('song')
    if not song:
        return redirect(url_for('home'))

    return render_template('index.html', 
                           songname=song['songname'], 
                           author=song['author'],
                           audio=song['audio']
                           )

# Run

if __name__ == '__main__':
    app.run(debug=True)