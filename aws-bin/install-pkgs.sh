#!/usr/bin/env bash

source /home/ec2-user/.bash_profile
sudo chown -R $(whoami) ~/.npm

npm install > /home/ec2-user/install-pkgs.log
