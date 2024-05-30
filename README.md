# Install

Database:

```
cd ./mongo && docker-compose up -d
```

Backend:

```
cd ./backend && npm i
```

Frontend:

```
cd ./frontend && npm i
```

# Run

Backend:

```
cd ./backend && npm run start:dev # Will default run on port 3001
```

Frontend:

```
cd ./frontend && npm start # Will default run on port 3000
```

# Environment

Backend:

```
PORT=
CORS_FRONTEND=
MONGODB_ENDPOINT=
```

Frontend:

```
PORT=
BACKEND_ENDPOINT=
```

# Build

```
# From the backend/ directory
docker build -t chat-app-backend:<version> .
docker tag chat-app-backend:<version> containers.hellnet.se/chat-app-backend:<version>
docker push containers.hellnet.se/chat-app-backend:<version>

# From the frontend/ directory
docker build -t chat-app-frontend:<version> .
docker tag chat-app-frontend:<version> containers.hellnet.se/chat-app-frontend:<version>
docker push containers.hellnet.se/chat-app-frontend:<version>

```

Run container:

```
docker run --name chat-app-db \
  -p 27017:27017 \
  -v mongo-data:/data/db \
  mongo:7.0.9

docker run --name chat-app-backend \
  -e PORT=3001 \
  -e CORS_FRONTEND=http://chat-app-frontend:3000
  -e MONGODB_ENDPOINT=
  -p 3001:3001 \
  chat-app-backend:<version>

docker run --name chat-app-frontend \
  -e PORT=<port> \
  -p <port>:<port> \
  chat-app-frontend:<version>
```
