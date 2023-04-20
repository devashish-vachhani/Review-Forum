import { defineConfig } from 'cypress'

export default defineConfig({
  
  e2e: {    
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('@cypress/code-coverage/task')(on, config)
      return config
    },
    'baseUrl': 'http://localhost:4200',
    "video": false,
  },
  
  
  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    specPattern: '**/*.cy.ts'
  },

  chromeWebSecurity: false,
  
})