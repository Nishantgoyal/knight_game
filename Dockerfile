FROM node:16.3.0

WORKDIR /app
COPY package.json .
RUN npm install
COPY code code
CMD ["npm", "start"]