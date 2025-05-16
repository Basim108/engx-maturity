#!/bin/bash

workspace_id=1
workspace_dsl=./arch/src/workspace.dsl
  
if [ $# = 1 ]; then
  workspace_id=$1
elif [ $# = 2 ]; then
  workspace_id=$1
  workspace_dsl=$2
fi

if [ ! -f "$workspace_dsl" ]; then
    echo "workspace id is $workspace_id"
    echo "workspace dsl is $workspace_dsl"
    
    echo "[!] dsl file was not found"
    echo "Run example: ./push_workspace.sh 1 ../src/workspace.dsl"
    exit 1
fi

docker run -it --rm -v $PWD:/usr/local/structurizr --net="host" structurizr/cli push \
           -url http://localhost:8080/api \
           -id $workspace_id \
           -key $ENGX_STRUCTURIZR_API_KEY \
           -secret $ENGX_STRUCTURIZR_API_SECRET \
           -archive false \
           -workspace $workspace_dsl 
