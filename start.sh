#!/bin/sh
echo "Starting Next.js on port: ${PORT:-3000}"
echo "Working directory: $(pwd)"
echo "Contents:"
ls -la .next/ 2>&1 || echo "No .next directory"
ls -la .next/standalone/ 2>&1 || echo "No standalone directory"

if [ -f ".next/standalone/server.js" ]; then
  echo "Running standalone server"
  cd .next/standalone
  cp -r ../../public ./public 2>&1 || echo "Public already copied"
  cp -r ../.next/static ./.next/static 2>&1 || echo "Static already copied"
  PORT=${PORT:-3000} node server.js
else
  echo "Standalone server not found, running next start"
  PORT=${PORT:-3000} npx next start -H 0.0.0.0 -p ${PORT:-3000}
fi
