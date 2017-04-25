#!/usr/bin/env bash

if pgrep -f '@angular/cli'; then
    exit 0
fi

"@angular/cli service not running." > app-validate.log

exit 1
