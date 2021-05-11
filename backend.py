from flask import Flask, send_from_directory, request, jsonify
import json
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, support_credentials=True)

@app.route("/")
def base():
    print('hello')
    return send_from_directory('public', 'index.html')

@app.route('/<path:path>')
def static_files(path):
    return send_from_directory('public', path)

@app.route("/data") # api :)))
@cross_origin(supports_credentials=True)
def get_data():
    with open('data.json') as f:
        data = json.load(f)
    print('retrieved data')
    return data


@app.route('/add/<addType>', methods=['POST'])
@cross_origin(supports_credentials=True)
def add_info(addType):
    with open('data.json') as f:
        data_dict = json.load(f)
    data_dict[addType].append(request.json)
    with open('data.json', 'w') as f:
        json.dump(data_dict, f)
    print(f"adding to {addType}")
    print('successfully saved info!') # idk is this valid; if not, just redirect to /
    return jsonify(request.json)

if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=8000)

