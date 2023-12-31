from flask import Flask, render_template, url_for, jsonify, request, redirect, flash
from flask_cors import CORS
import csv
import re
import os
from dotenv import load_dotenv
import logging
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask_mail import Mail, Message

app = Flask(__name__)
app.config['MAIL_SERVER'] = "smtp.googlemail.com"
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = ""
app.config['MAIL_PASSWORD'] = ""


CORS(app)
mail = Mail(app)

logging.basicConfig(filename='app.log', level=logging.ERROR)

load_dotenv()
# This is necessary for flashing messages
app.secret_key = os.getenv('APP_SECRET_KEY')

@app.route('/')
def index():
    return render_template('index.html')


EMAIL_REGEX = re.compile(r"[^@]+@[^@]+\.[^@]+")


@app.route('/subscribe', methods=['POST'])
def subscribe():
    try:
        email = request.form.get('email')
        school = request.form.get('school')
        other_school = request.form.get(
            'other-school') if school == 'other' else ''
        year = request.form.get('year')

        # Validate email
        if not EMAIL_REGEX.match(email):
            flash(
                'Invalid email format. Please enter a valid email address.', 'error-message')
            return redirect(url_for('index'))

        # Check for duplicate email
        existing_emails = []
        with open('output/subscribers.csv', 'r', newline='') as csvfile:
            reader = csv.reader(csvfile)
            existing_emails = [row[0] for row in reader if len(row) > 0]
            logging.info('Content of CSV (reader): %s', list(reader))
        # Log the extracted emails
            logging.info('Extracted emails (existing_emails): %s',
                         existing_emails)

        if email in existing_emails:
            flash('This email is already subscribed.', 'error-message')
            return redirect(url_for('index'))

        # Append the data to a CSV file
        with open('output/subscribers.csv', 'a', newline='') as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow([email, school, other_school, year])

        flash('Successfully subscribed!', 'success')
        return redirect(url_for('index'))
    except Exception as e:
        logging.error("Error in subscribe: %s", str(e))
        flash('An unexpected error occurred. Please try again later.', 'error-message')
        return redirect(url_for('index'))


@app.route('/contact')
def contact():
    return render_template('contact.html')


@app.route('/send_message', methods=['POST'])
def send_message():
    msg_body = request.form.get('message')
    name = request.form.get('name')
    contacter_email = request.form.get('email')
    sender = os.getenv('GMAIL')
    print(sender)
    title = "NEW MESSAGE from " + name
    msg = Message("new message", sender=sender,
                  recipients=["contact@courselynx.com"])
    data = {
        'app_name': "COURSELYNX",
        'contacter': contacter_email,
        'body': msg_body,
        'title': title,
    }

    msg.html = render_template("email.html", data=data)

    try:
        print(data)
        mail.send(msg)
        return redirect(url_for('index'))
    except Exception as e:
        print(e)
        return f"the email was not sent {e}"


if __name__ == '__main__':
    app.run()
