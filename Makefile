build:
	sudo apt install mongodb
	sudo apt install npm
	sudo apt install nodejs
	curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
	sudo apt-get install -y nodejs
	npm install

run: 
	node server.js
	
