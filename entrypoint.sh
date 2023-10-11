#!/bin/sh

if [ -n "$HOST_8080" ]; then
  sed -i "s|localhost:8080|$HOST_8080|g" /usr/share/nginx/html/assets/env.js
fi

if [ -n "$HOST_8081" ]; then
  sed -i "s|localhost:8081|$HOST_8081|g" /usr/share/nginx/html/assets/env.js
fi

if [ -n "$HOST_8082" ]; then
  sed -i "s|localhost:8082|$HOST_8082|g" /usr/share/nginx/html/assets/env.js
fi

nginx -g 'daemon off;'