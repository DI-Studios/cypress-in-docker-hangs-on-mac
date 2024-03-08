FROM cypress/factory as base

WORKDIR /cypress
COPY ./package.json ./package-lock*.json ./
RUN npm install
COPY . .