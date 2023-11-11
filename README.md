[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/8ndPp79U)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=12183992&assignment_repo_type=AssignmentRepo)

# React + Vite

![GitHub Classroom Workflow](https://github.com/sanderselfors/fed2-js2-course-assignement-oslo-react-vite-zeus/actions/workflows/test.yml/badge.svg)
![GitHub Classroom Workflow](https://github.com/sanderselfors/fed2-js2-course-assignement-oslo-react-vite-zeus/actions/workflows/unit-test.js.yml/badge.svg)


## Report

In this course assignment the focus was to setup and write tests to ensure the application is working as expected.

We followed the guidelines for the assignment and implemented the necessary
components as instructed.

Process:

1. Forked a previous project and created a branch called workflow.

2. Configured the project with eslint, prettier and commit hooks by installing npm packages, creating .prettierrc, .eslintrc and test.yml.

3. The project is configured to run Prettier and ESLint on commit in the workflow-formatting branch. This is achieved with husky and pre-commit hook in package.json.

4. Utilized Vitest to conduct unit testing to confirm that the login function fetches and stores a token in browser storage and the logout function clears the token from browser storage.

5. Performed end-to-end (E2E) tests using Cypress to confirm successful login and redirection to the profile page, testing error handling for incorrect email login attempts, and verifying the logout functionality.

## Authors

- Sander
- Andrea
- Ridwan
