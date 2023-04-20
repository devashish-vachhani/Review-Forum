[![CI](https://github.ncsu.edu/csc510-spring2023/CSC-510-Project/actions/workflows/testing.yml/badge.svg)](https://github.ncsu.edu/csc510-spring2023/CSC-510-Project/actions/workflows/testing.yml)
![](https://img.shields.io/badge/Coverage-66%25-5A7302.svg?style=flat&logoColor=white&color=green&prefix=$coverage$)

[![Language](https://img.shields.io/badge/language-HTML-orange.svg)](https://html.spec.whatwg.org/)
[![Language](https://img.shields.io/badge/language-TypeScript-blue.svg)](https://www.typescriptlang.org/)
[![Language](https://img.shields.io/badge/language-CSS-purple.svg)](https://www.w3.org/TR/CSS/#css)

[![Framework](https://img.shields.io/badge/framework-Angular-red.svg)](https://angular.io/)
[![Dependency](https://img.shields.io/badge/dependency-Firebase-yellow.svg)](https://firebase.google.com/)

![](https://img.shields.io/static/v1?label=Group&message=7&color=<blue>)
[![Collaborators](https://img.shields.io/badge/Collaborators-4-orange.svg?style=flat)](https://github.ncsu.edu/csc510-spring2023/CSC-510-Project/graphs/contributors)
# ReviewForum

## Project Description

RateReads is an online website that allows university students to rate, review, and interact with other students regarding assigned course textbooks. Students will be able to search for required textbooks by class, rate textbooks, have discussions about class materials, and request new books be added to the site as courseworks changes over the years.

### Scenarios
1. Interact with a textbook (search, visit, like, comment)
2. Submit a request for a new textbook listing
3. Review a textbook

### Scenario Changes:

Pitch proposal: https://docs.google.com/presentation/d/1OnToDL7ojjW1qlgyJHYdH6HPSR_w1TMUuk7awm-Gsas/edit?usp=sharing

Feature 1:
* One search bar for both university and text search with a dropdown to choose search type
* "Write a review" button was moved to be above review section

Feature 2:
* Scenario now starts on the book request page since the feature is about book requests
* Book request button moved to book search page
* Removed dropdown of book suggestions when requesting a book as it would clutter the form once the amount of available books grew
* Course selections was changed to a dropdown to ensure tag uniformity
* Added a text field to specify the book's description and image to make accepting and rejecting book requests easier for admins
* Instead of telling users they will be updated by email they are given a notification and can view their book request status on a seperate page

Feature 3:
* The post button is not greyed out, instead it will show a warning message if the user has not specified a rating when clicked

## Technologies & Frameworks
1. Frontend: Typescript, Angular, HTML/CSS, Bootstrap
2. Backend: Node.js
3. Database: Firebase
4. Testing: Jasmine, Cypress, Protractor, Firebase Emulator

## Testing
1. Acceptance tests: GUI, Service
2. Non-acceptance tests: Unit, Integration, End-to-end

## Project Management
https://github.ncsu.edu/csc510-spring2023/CSC-510-Project/projects/1

## Setup Instructions
https://github.ncsu.edu/csc510-spring2023/CSC-510-Project/blob/main/CONFIGURE_ENVIRONMENT.md
