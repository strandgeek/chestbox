FROM node:16 AS builder
# Create app directory
WORKDIR /usr/src/app
COPY . .

# Setup Webapp
WORKDIR /usr/src/app/webapp
RUN npm install --force && npm run build

# Setup API & Build App Bundle
WORKDIR /usr/src/app/api
RUN npm install && npm run build


FROM node:16
WORKDIR /root/
COPY --from=builder /usr/src/app ./
WORKDIR  /root/api
CMD ["npm", "start"]
