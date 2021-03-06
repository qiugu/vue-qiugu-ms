#! /bin/bash

cd ../
npm uninstall mockjs
npm i mockjs -S
npm run build

git add .

if [[ $1 && $2 ]]
then
  git commit -m "$1: $2"

  git subtree push --prefix=dist https://github.com/qiugu/vue-qiugu-ms.git gh-pages
else
  echo "ERROR: 请输入提交信息"
  exit 0
fi
