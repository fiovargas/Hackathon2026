#!/bin/sh
set -e

until python manage.py showmigrations > /dev/null 2>&1; do
  sleep 2
done

python manage.py migrate --noinput

python manage.py seed

exec python manage.py runserver 0.0.0.0:8000
