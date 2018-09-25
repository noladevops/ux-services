# build environment
FROM node:9.4
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY nginx.conf /usr/src/app/nginx.conf
COPY package.json /usr/src/app/package.json
RUN npm install --silent
RUN npm install react-scripts@1.1.1 -g --silent
COPY . /usr/src/app
RUN npm run build


FROM tobi312/rpi-nginx
COPY --from=0 /usr/src/app/build/ /usr/share/nginx/html
## Copy the default nginx.conf provided by tiangolo/node-frontend
COPY --from=0 /usr/src/app/nginx.conf /etc/nginx/sites-enabled/default

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
