#!/bin/sh

if [ -n "$apiCommandService" ]; then
  sed -i "s|http://localhost:8080/|$apiCommandService|g" /usr/share/nginx/html/assets/env.js
fi

if [ -n "$apiQueryService" ]; then
  sed -i "s|http://localhost:8081/|$apiQueryService|g" /usr/share/nginx/html/assets/env.js
fi

if [ -n "$webSocketUrl" ]; then
  sed -i "s|localhost:8082/|$webSocketUrl|g" /usr/share/nginx/html/assets/env.js
fi

if [ -n "$authUrl" ]; then
  sed -i "s|http://localhost:8083/|$authUrl|g" /usr/share/nginx/html/assets/env.js
fi

nginx -g 'daemon off;'