FROM node:20
WORKDIR /app
COPY package.json .
RUN npm install
ENV PORT=5000
COPY . .
CMD ["npm", "start"]

