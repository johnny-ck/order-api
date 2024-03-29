# FROM node:latest
# WORKDIR /src/app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build
# EXPOSE 3000
# CMD ["node", "build/index.js"]

FROM node:latest
WORKDIR /src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["node", "build/index.js"]