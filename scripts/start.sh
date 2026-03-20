#!/bin/bash
set -e

DATA_DIR="${DATA_DIR:-/app/data}"
DB_PATH="$DATA_DIR/prod.db"
SEED_DB="/app/prisma/dev.db"

# Ensure data directory exists
mkdir -p "$DATA_DIR"

# If no production DB exists, copy the seed database
if [ ! -f "$DB_PATH" ]; then
  echo "No production database found. Copying seed database..."
  if [ -f "$SEED_DB" ]; then
    cp "$SEED_DB" "$DB_PATH"
    echo "Seed database copied to $DB_PATH"
  else
    echo "Warning: No seed database found at $SEED_DB"
  fi
fi

# Start the Next.js server
echo "Starting Next.js server..."
exec node server.js
