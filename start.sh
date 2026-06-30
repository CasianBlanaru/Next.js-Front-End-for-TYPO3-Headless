#!/bin/sh
echo "Starting Next.js on port: ${PORT}"
exec next start -H 0.0.0.0 -p "${PORT}"
