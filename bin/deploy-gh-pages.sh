#! /bin/bash

cd ../
npm run build

git add .

git commit -m "$1: $2"

git subtree push --prefix=dist https://github.com/qiugu/vue-qiugu-ms.git gh-pages
