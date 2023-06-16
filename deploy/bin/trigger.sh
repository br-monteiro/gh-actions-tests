#!/bin/bash

# ENVIRONMENT=${1:-$ENVIRONMENT}
# TAG=${2:-$TAG}
# THEME=${6:-$THEME}
# NAMESPACE=${3:-$NAMESPACE}

config_file=k8s-$ENVIRONMENT-$TAG.txt

envsubst < deploy/$THEME/$ENVIRONMENT-resources.txt > $config_file

cat $config_file
