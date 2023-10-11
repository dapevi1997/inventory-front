FROM nginx:alpine
COPY ./dist/inventory-front/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
EXPOSE 4200
CMD ["/entrypoint.sh"]