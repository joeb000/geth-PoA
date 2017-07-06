#!/bin/sh

FILEPATH=`dirname $0`
cd $FILEPATH
export CLIQUE=`pwd`

echo 'Initializing new Clique PoA Chain'
geth --datadir $CLIQUE/datadir --port 30310 init ./clique_genesis.json

echo 'Preparing to run geth in console mode. Please copy this command to clipboard:'
echo ''
echo "loadScript('${CLIQUE}/setup.js')"
echo ''
read -p "Press any key to continue... " -n1 -s
geth --datadir $CLIQUE/datadir --port 30310 console
