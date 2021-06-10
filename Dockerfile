FROM node:16.3.0

WORKDIR /app
COPY package.json .
ARG my_env
RUN if [ "$my_env" = "dev" ]; then npm install; else npm install --only=prod;fi

COPY code code

CMD ["npm", "start"]