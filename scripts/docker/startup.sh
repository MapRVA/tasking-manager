#!/bin/sh
set -e

echo "Building React application with runtime environment variables..."
cd /usr/src/app
yarn build

echo "Copying built files to nginx directory..."
cp -r /usr/src/app/build/* /usr/share/nginx/html/

echo "Starting nginx..."
exec nginx -g "daemon off;"
