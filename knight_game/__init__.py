from flask import Flask, render_template, request, jsonify
import redis
import json


app = Flask(__name__)

redisClient = redis.Redis(host='localhost', port=6379, decode_responses=True)
redisClient.delete('moves')


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/move", methods=["POST"])
def move():
    data = request.get_json()
    move = json.dumps(data['coordinate'])
    if data['move_type'] == "back":
        redisClient.lpop('moves')
    else:
        redisClient.lpush('moves', move)
    # return the result to JavaScript
    return jsonify(result=data['coordinate'])
