#!/bin/bash

echo "hello"

echo "
#   ───────────────────────────── Start script ─────────────────────────────
"

echo "Do you want to delete the files on S3?"
read confirm01

case "$confirm01" in
[Yy])
  echo "Deleting objects on S3"
  if aws s3 rm s3://pse.mavericksbalitaan.com/ --recursive; then
    echo "Done deleting"
    echo "Building production."
    yarn build
    echo "Done building production."
    echo "Copying objects to S3 from out folder."
    aws s3 cp ./out/ s3://pse.mavericksbalitaan.com/ --recursive
    echo "Done copying."
  fi
  ;;
[Nn])
  exit 1
  ;;
*)
  echo default
  ;;
esac

echo "
#   ────────────────────────────── End script ──────────────────────────────
"
