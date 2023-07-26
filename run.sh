#!/bin/bash

sudo apt install -y redis-server
redis-server &

python -m pip install -r requirements.txt
flask --app knight_game run --debug