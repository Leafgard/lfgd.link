FROM node:14.15.1-alpine

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

WORKDIR /home/node

# Copy app
COPY . .

# Install dependencies and build
RUN npm i
RUN npm run build

# Run app
ENV NODE_ENV=production
CMD ["npm", "run", "start"]

EXPOSE 3000