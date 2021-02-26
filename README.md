# Gifator | GIF Chat App!

It allows you to chat with your friends using only GIFs.

## TODO List

- [ ] Create a Node Server

  - [x] Create model to Validate users with joi
  - [x] Get a clean MongoDB connection for carry our users
  - [x] Add `/auth/register` router
  - [x] Add `/auth/login` router
  - [x] Create token to in login page
  - [ ] Control token in every page and if it doesn't exist send to login page.
  - [ ] checkTokenInUser if set verify user and `req.user` to be user
  - [ ] checkTokenInUser if defined redireck dashboard

- [x] Setup a Vue app for front-end

  - [x] Create a Vue.js app
  - [x] Add a login page
  - [x] Save the token to local storage
  - [ ] Set visitors only see the home page
  - [ ] Add a dashboard page

### Authors:

- Kaan Ersoy / [Github](https://github.com/kaanersoy)
