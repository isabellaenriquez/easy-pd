from flask import Flask, send_from_directory, request, jsonify, redirect, url_for
import json
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app, support_credentials=True)

@app.route("/")
def base():
    return send_from_directory('public', 'index.html')

@app.route('/<path:path>')
def static_files(path):
    return send_from_directory('public', path)

@app.route("/data") # api :)))
def get_data():
    if file_exists('data.json'):
        with open('data.json') as f:
            data = json.load(f)
        print('retrieved data')
        return data
    return json.dumps({})

@app.route('/create', methods=['POST'])
def create_profile():
    with open('data.json', 'w') as f:
        json.dump(request.json, f)
    print('successfully created profile!')
    return redirect(url_for('base'))

@app.route('/add/<addType>', methods=['POST'])
def add_info(addType):
    with open('data.json') as f:
        data_dict = json.load(f)
    if addType in data_dict:
        data_dict[addType].append(request.json) 
    else:
        data_dict[addType] = [request.json]
    
    with open('data.json', 'w') as f:
        json.dump(data_dict, f)
    print(f"adding to {addType}")
    print('successfully saved info!') 
    return jsonify(request.json)

''' Returns true if the specified file path exists.
'''
def file_exists(file_path):
    return os.path.exists(file_path)

if __name__ == "__main__":
    app.run(debug=True)

