FROM node:16-slim

WORKDIR /var/www/app

# OS TOOLS
RUN apt-get update

COPY . .

RUN apt-get install -y git

RUN npm ci --quiet

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]
