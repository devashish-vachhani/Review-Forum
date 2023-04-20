# Environment setup
1. Install Node.js from https://nodejs.org/en/download.
2. Install Angular CLI: `npm install -g @angular/cli`

# Deployment
1. The project is deployed at 

# To set up the project locally:
1. Clone the project repository: `git clone https://github.ncsu.edu/csc510-spring2023/CSC-510-Project.git`
2. Navigate to the project directory: `cd CSC-510-Project`
3. Install the required dependencies: `npm install`

## Development server
1. Start the development server: `ng serve`
2. Open your browser on http://localhost:4200/

## Testing
### Unit and Integration tests
1. Run tests
    1. In watch mode: `ng test`
    2. In no-watch mode and get code coverage: `npm run test:ci` </br>
        To view the coverage information, navigate to the `/coverage/karma` directory in your project directory 

### End-to-end tests
1. Start the testing server: `npm run start:ci`
2. Run tests
    1. In a browser: `npm run cypress:open`
    2. In a headless browser and get code coverage: `npm run cypress:run` </br>
        To view the coverage information, navigate to the `/coverage/cypress` directory in your project directory 

### Acceptance tests
https://github.ncsu.edu/csc510-spring2023/CSC-510-Project/blob/main/tests-acceptance/CONFIGURE.md
