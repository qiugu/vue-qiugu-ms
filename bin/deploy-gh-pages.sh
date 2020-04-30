#! /bin/bash

cd ../
npm uninstall mockjs
npm i mockjs -S
npm run build

git add .

git commit -m "$1: $2"

git subtree push --prefix=dist https://github.com/qiugu/vue-qiugu-ms.git gh-pages
