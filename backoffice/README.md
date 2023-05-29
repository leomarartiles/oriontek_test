# wTracking Backoffice

BackOffice wTracking, vehicles, billings, setting management for wTracking

pm2 start npm --name wTracking-BackOffice -- run server-default  --execPort=40091
pm2 start npm --name wTracking-BackOffice -- run backoffice
pm2 start npm --name "API-WTRACKING" -- run api

sudo git remote add upstream git@vcs.aglrd.com:agl/wtracking-backoffice.git
sudo git pull upstream main

pm2 start npm --name WT-BackOffice -- run backoffice