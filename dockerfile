FROM node:14-alpine
WORKDIR /app
COPY . .
RUN yarn tsc
RUN yarn
CMD ["yarn" , "start"]
