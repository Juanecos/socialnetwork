FROM node:22

WORKDIR /app

COPY ./app/package*.json ./

RUN npm install

COPY ./app .
COPY ./app/wait-for-it.sh /app/wait-for-it.sh
RUN chmod +x /app/wait-for-it.sh
EXPOSE 3000

CMD ["sh", "-c", "./wait-for-it.sh postgres:5432 -t 60 -- npx prisma migrate dev --name init && npm run start"]