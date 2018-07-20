#!/bin/bash

# cron-refresh_masternode_count_image.sh
# pulls, resizes, and places an image from service that hasn't installed ssl
# self-hosting the content avoids mixed-content/insecure browser warnings

# source image is updated once an hour.
# production crontab config. check every 10 past so it's reasonably fresh
#
# 10 * * * * /home/ubuntu/build/dash-website/script/cron-refresh_masternode_count_image.sh
#

FILEPATH=/tmp/masternode_count.png
rm -f $FILEPATH
curl -s http://178.254.23.111/~pub/masternode_count.png -o $FILEPATH

if [[ -e $FILEPATH ]]; then
  convert /tmp/masternode_count.png -crop 813x525+6+6 /tmp/masternode_count-crop-813x525.png
  cp -f /tmp/masternode_count-crop-813x525.png /data/_site/assets/img/masternode_count-crop-813x525.png
fi
