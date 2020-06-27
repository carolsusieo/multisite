FROM node:10
#Create app directory
WORKDIR /usr/src/app1
#Install app dependencies
COPY package*.json ./

RUN npm install --verbose
#Copy app source code
COPY . .

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout  \
	&& ln -sf /dev/stderr

EXPOSE 8001
CMD ["npm", "start"]
