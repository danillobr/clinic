#!/usr/bin/env bash
set -e

npm run migration:run
npm run seed:admin
npm run dev