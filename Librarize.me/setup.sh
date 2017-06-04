#!/bin/bash
function InstallEnv {
  sudo locale-gen C.UTF-8
}

function InstallNodeAndNpm {
  curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
  apt-get install nodejs -y
  apt-get install npm -y
  ln -s /home/vagrant/node_modules/ /vagrant/node_modules
  npm install /vagrant
  npm install -g node-dev
  npm install -g express-generator
  ln -s /usr/bin/nodejs /usr/local/bin/node
}

function InstallPostgre {
  apt-get install postgresql postgresql-client-common -y
  npm install -g sequelize-cli
  #connection postgres pour créer vagrant
  sudo -u postgres psql -c "CREATE USER vagrant WITH PASSWORD 'root'"
  sudo -u postgres psql -c "CREATE DATABASE librarize_dev"
}

echo 'Prepare the environement'; InstallEnv
echo 'Installing Node...'; InstallNodeAndNpm
echo 'Installing postgresql And sequelize-cli'; InstallPostgre

exit 0
