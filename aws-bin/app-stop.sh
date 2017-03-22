#!/usr/bin/env bash

if pgrep -f '@angular/cli'; then
  kill `pgrep -f '@angular/cli'` > /home/ec2-user/app-stop.log
fi

exit 0
