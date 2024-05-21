# Install

```
npm install
```

# Run

```
npm server.js
```

Run server on different port:

```
PORT=1337 node server.js
```

# Build

```
docker build -t chat-app:<version> .

docker tag chat-app:<version> containers.hellnet.se/chat-app:<version>

docker push containers.hellnet.se/chat-app:<version>
```

Run container:

```
docker run --name chat-app -e PORT=<port> -p <port>:<port> chat-app:<version>
```
