#!/bin/sh
echo "Starting Next.js on port: ${PORT:-3000}"
cd .next/standalone
PORT=${PORT:-3000} node server.js
