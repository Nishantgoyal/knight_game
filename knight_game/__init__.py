from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

moves = []

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/move", methods=["POST"])
def move():
    data = request.get_json()
    moves.append(data['coordinate'])
    print(f'{moves = }')
    return jsonify(result=data['coordinate']) # return the result to JavaScript

