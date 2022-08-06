#!/bin/bash
set -e

USER="admin"
DBNAME="tampoff"
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "Using database $DBNAME"

CONFIG=" dbname=$DBNAME user=$USER"

######### user
for file in ${DIR}/user/*.schema.*sql
do
  psql "$CONFIG" -f "$file"
done

for file in ${DIR}/user/*.function.*sql
do
  psql "$CONFIG" -f "$file"
done

######### mock
for file in ${DIR}/mock/*.sql
do
  psql "$CONFIG" -f "$file"
done
