from flask import Flask, render_template, url_for, jsonify, request, redirect, flash
from flask_cors import CORS
import csv
import re
import os
from dotenv import load_dotenv
import logging

app = Flask(__name__)
CORS(app)

logging.basicConfig(filename='app.log', level=logging.ERROR)

load_dotenv()
# This is necessary for flashing messages
app.secret_key = os.getenv('APP_SECRET_KEY')

@app.route('/')
def index():
    return render_template('index.html')

EMAIL_REGEX = re.compile(r"[^@]+@[^@]+\.[^@]+")

import csv
from flask import Flask, request, flash, redirect, url_for

# ... (other parts of your code)

@app.route('/subscribe', methods=['POST'])
def subscribe():
    try:
        email = request.form.get('email')
        school = request.form.get('school')
        other_school = request.form.get('other-school') if school == 'other' else ''
        year = request.form.get('year')

        # Validate email
        if not EMAIL_REGEX.match(email):
            flash('Invalid email format. Please enter a valid email address.', 'error-message')
            return redirect(url_for('index'))

        # Check for duplicate email
        existing_emails = []
        with open('output/subscribers.csv', 'r', newline='') as csvfile:
            reader = csv.reader(csvfile)
            logging.info(reader)
            existing_emails = [row[0] for row in reader]
            logging.info(existing_emails)

        if email in existing_emails:
            flash('This email is already subscribed.', 'error-message')
            return redirect(url_for('index'))

        # Append the data to a CSV file
        with open('output/subscribers.csv', 'a', newline='') as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow([email, school, other_school, year])

        flash('Successfully subscribed! We will notify you when we launch.', 'success')
        return redirect(url_for('index'))
    except Exception as e:
        logging.error("Error in subscribe: %s", str(e))
        flash('An unexpected error occurred. Please try again later.', 'error-message')
        return redirect(url_for('index'))



if __name__ == '__main__':
    app.run()
