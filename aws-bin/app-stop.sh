#!/usr/bin/env bash

cd /home/ec2-user/lt-mvp-webapp
if pgrep -f '@angular/cli'; then
  kill `pgrep -f '@angular/cli'` > app-stop.log
fi

exit 0
