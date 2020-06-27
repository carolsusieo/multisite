FROM node:8
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
COPY package*.json ./

RUN npm install
# Copy app source code
COPY . .

RUN ln -sf /dev/stdout  \
	&& ln -sf /dev/stderr

#Expose port and start application
#if port changed here, also change in .env
EXPOSE 3002
CMD [ "npm", "start" ]
