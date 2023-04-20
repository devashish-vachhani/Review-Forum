[![CI](https://github.ncsu.edu/csc510-spring2023/CSC-510-Project/actions/workflows/testing.yml/badge.svg)](https://github.ncsu.edu/csc510-spring2023/CSC-510-Project/actions/workflows/testing.yml)
![](https://img.shields.io/badge/Coverage-66%25-5A7302.svg?style=flat&logoColor=white&color=green&prefix=$coverage$)

[![Language](https://img.shields.io/badge/language-HTML-orange.svg)](https://html.spec.whatwg.org/)
[![Language](https://img.shields.io/badge/language-TypeScript-blue.svg)](https://www.typescriptlang.org/)
[![Language](https://img.shields.io/badge/language-CSS-purple.svg)](https://www.w3.org/TR/CSS/#css)

[![Framework](https://img.shields.io/badge/framework-Angular-red.svg)](https://angular.io/)
[![Dependencies](https://img.shields.io/badge/dependencies-Firebase-yellow.svg)](https://firebase.google.com/)

![](https://img.shields.io/static/v1?label=Group&message=7&color=<blue>)
[![Collaborators](https://img.shields.io/badge/Collaborators-4-orange.svg?style=flat)](https://github.ncsu.edu/csc510-spring2023/CSC-510-Project/graphs/contributors)
# ReviewForum: CSC 510 Final Project Documentation

## Project Description:

Our group’s webpage, Rate Reads, provides users with a review forum site that allows them the opportunity to explore potential textbooks linked to courses at their university. This review forum allows students to rate books and provide comments and feedback on how topical the listings of textbooks are to content discussed in various classes at a number of different universities. Students are also allowed to interact with one another through commenting as a means of discussing application of textbooks to course material and even solutions to unworked examples. Our platform hopes to help bridge the divide between professor assigned readings and student comprehension by creating a virtual space for discussing content. As classes at universities grow and change, new textbooks can be added to the site and reviewed by students. Our project’s set up allows for direct interaction with this forum as well as exhibits three core scenarios: 
Scenario 1: Search for a particular textbook based on name or university and interact with it by liking or commenting on individual posts. 
Scenario 2: Submit a request for a new textbook listing. 
Scenario 3: Rating a textbook based off user experiences with it. 
In addition to these scenarios, students are able to sign up for Rate Reads with proper authentication, allowing individuals to have accounts that allow them to engage with the forum. 

## Scenario Changes:

original scenarios: https://docs.google.com/presentation/d/1OnToDL7ojjW1qlgyJHYdH6HPSR_w1TMUuk7awm-Gsas/edit?usp=sharing

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