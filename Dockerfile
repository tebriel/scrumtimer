FROM node

COPY . /src
RUN cd /src; npm install
run cd /src; npm install -g grunt-cli bower
RUN cd /src; grunt
RUN cd /src; bower --allow-root install

CMD cd /src; npm start
