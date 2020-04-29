#! /bin/bash

cd ../
npm run build

git subtree push --prefix=dist https://github.com/qiugu/vue-qiugu-ms.git gh-pages
