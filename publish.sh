#/bin/bash

set -e

if [ -f output.zip ]
then
  rm output.zip
fi

zip -r output.zip . -x "*DS_Store" publish.sh

aws lambda update-function-code --function-name getCityFacts --zip-file fileb://output.zip
