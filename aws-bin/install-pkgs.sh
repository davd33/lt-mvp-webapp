#!/usr/bin/env bash

source /home/ec2-user/.bash_profile
cd /home/ec2-user/lt-mvp-webapp
npm install > install-pkgs.log

# zone js bug: https://github.com/angular/zone.js/issues/746
npm install zone.js@0.8.7 > install-pkgs.zonejs.log
