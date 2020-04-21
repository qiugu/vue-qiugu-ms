#! /bin/bash

if [[ $1 && $2 ]]
then
  cd ../
  git add -A .
  git commit -m "$1: $2"
  git push origin master
elif [[ $1 && $2 && $3 ]]
then
  cd ../
  git add -A .
  git commit -m "$1 $2"
  git push origin "$3"
else
  echo "ERROR: 请输入提交信息"
  exit 0
fi
