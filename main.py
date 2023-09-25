from flask import Flask, render_template, url_for, jsonify, request
from flask_cors import CORS
import csv

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/save-email', methods=['POST'])
def save_email():
    email = request.json.get('email')
    
    if not email:
        return jsonify(success=False, message="No email provided"), 400

    try:
        with open('output/emails.csv', 'a', newline='') as csvfile:
            email_writer = csv.writer(csvfile)
            email_writer.writerow([email])
        return jsonify(success=True, message="Email saved successfully")
    except Exception as e:
        print(f"Error writing to CSV: {e}")
        return jsonify(success=False, message="Error saving email"), 500


if __name__ == '__main__':
    app.run()
