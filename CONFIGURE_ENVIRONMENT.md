# we use the following enviroment configuration file, pulled and edited from the course demo project

1. Install NVM (Node Version Manager) to manage the Node installation.

 # Let's install NVM to manage the node instillation on Linux:
 
 1.1 $> curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
 1.2 $> source ~/.bashrc
 1.3 $> nvm --version ## should show "0.39.1"

 # Let's install NVM to manage the node instillation On MacOS:

 1.1 $> brew update
 1.2 $> brew install nvm
 1.3 $> mkdir ~/.nvm
 1.4 $> echo "export NVM_DIR=~/.nvm\nsource \$(brew --prefix nvm)/nvm.sh" >> ~/.zshrc
 1.5 $> source ~/.zshrc
 1.6 $> nvm --version ## should show "0.39.2"

2. Install Node

 # let's install the LTS version of Node 16.17.0
 $> nvm install 16.17.0 ## should show "Now using node v16.17.0 (npm v8.15.0)"

3. Install that Angular CLI globally (so that you can access from any directory)

 # option -g installs globally
 $> npm install -g @angular/cli

 # check that Angular is indeed installed
 $> ng version 

 # note- you may also need to re-install locally when running code in your IDE once or twice.
 # you can do this by using the same code in the terminal of your IDE

4. Spawn the Angular development server and access the front page

 $> cd gui

 # install all necessary node packages
 $> npm install

 # spawn development server in your machine and opens front page in
 # your browser (option "--open does that")
 $> ng serve --open


You can create you own Angular project by running the command below 
and replacing <project-name> with your preferred name:

 $> ng new <project-name> 

