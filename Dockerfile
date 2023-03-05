FROM node:16

WORKDIR /app

COPY package* ./

RUN npm install ts-node-dev

RUN npm install --ignore-scripts
   
COPY --chown=node:node ./ ./

EXPOSE 3333

ENTRYPOINT [ "./bin/setup.sh" ]
