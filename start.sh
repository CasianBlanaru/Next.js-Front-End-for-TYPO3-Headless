#!/bin/sh
set -x
echo "=== Railway Deployment Debug ==="
echo "PORT: ${PORT}"
echo "NODE_ENV: ${NODE_ENV}"
echo "Working directory: $(pwd)"
echo "\n=== Directory contents ==="
ls -la
echo "\n=== .next directory ==="
ls -la .next/ 2>&1 || echo "No .next directory"
echo "\n=== .next/standalone ==="
ls -la .next/standalone/ 2>&1 || echo "No standalone directory"
echo "\n=== Checking for server files ==="
find .next -name "server.js" -o -name "*.js" | head -20

if [ -f ".next/standalone/server.js" ]; then
  echo "\n=== Running standalone server ==="
  cd .next/standalone
  cp -r ../../public ./public 2>&1 || echo "Public copy failed or already exists"
  cp -r ../.next/static ./.next/static 2>&1 || echo "Static copy failed or already exists"
  echo "Starting server on port ${PORT:-3000}"
  PORT=${PORT:-3000} exec node server.js
else
  echo "\n=== Running next start (fallback) ==="
  echo "Starting next on port ${PORT:-3000}"
  PORT=${PORT:-3000} exec npx next start -H 0.0.0.0 -p ${PORT:-3000}
fi
