# bin/bash

if [ -d "dist" ]; then
  rm -r dist
fi
ng build;
firebase deploy;
