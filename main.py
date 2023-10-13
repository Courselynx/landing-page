from flask import Flask, render_template, url_for, jsonify, request, redirect, flash
from flask_cors import CORS
import csv
import re

app = Flask(__name__)
CORS(app)

# This is necessary for flashing messages


@app.route('/')
def index():
    return render_template('index.html')

EMAIL_REGEX = re.compile(r"[^@]+@[^@]+\.[^@]+")

@app.route('/subscribe', methods=['POST'])
def subscribe():
    email = request.form.get('email')
    
    if not EMAIL_REGEX.match(email):
        flash('Invalid email format. Please enter a valid email address.', 'error')
        return redirect(url_for('index'))

    with open('output/subscribers.csv', 'a', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow([email])
    
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run()
