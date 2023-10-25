from flask import Flask, render_template, url_for, jsonify, request, redirect, flash
from flask_cors import CORS
import csv
import re
import os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)

load_dotenv()
# This is necessary for flashing messages
app.secret_key = os.getenv('APP_SECRET_KEY')

@app.route('/')
def index():
    return render_template('index.html')

EMAIL_REGEX = re.compile(r"[^@]+@[^@]+\.[^@]+")

@app.route('/subscribe', methods=['POST'])
def subscribe():
    email = request.form.get('email')
    school = request.form.get('school')
    other_school = request.form.get('other-school') if school == 'other' else ''
    year = request.form.get('year')
    
    # Validate email
    if not EMAIL_REGEX.match(email):
        flash('Invalid email format. Please enter a valid email address.', 'error')
        return redirect(url_for('index'))

    # Append the data to a CSV file
    with open('output/subscribers.csv', 'a', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow([email, school, other_school, year])
    
    return redirect(url_for('index'))


if __name__ == '__main__':
    app.run()
