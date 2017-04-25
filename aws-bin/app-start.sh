#!/usr/bin/env bash

source /home/ec2-user/.bash_profile
cd /home/ec2-user/lt-mvp-webapp
nohup npm run startProd > /home/ec2-user/app-start.log 2>&1 &
sleep 10
