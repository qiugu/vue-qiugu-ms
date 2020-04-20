#! /bin/bash

git add -A

if [[ $1 && $2 ]]
then
  git commit -m "$1: $2"
  git push origin master
elif [[ $1 && $2 && $3 ]]
then
  git commit -m "$1 $2"
  git push origin "$3"
else
  echo "ERROR: 请输入提交信息"
fi
