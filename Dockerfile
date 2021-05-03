FROM lambci/lambda:build-nodejs12.x

MAINTAINER PRX <sysadmin@prx.org>
LABEL org.prx.lambda="true"

WORKDIR /app
EXPOSE 8080

RUN yum install -y -q rsync && yum clean all && rm -rf /var/cache/yum

ENTRYPOINT [ "npm", "run" ]
CMD [ "test" ]

ADD package.json .
RUN npm install
ADD . .
RUN npm run build
