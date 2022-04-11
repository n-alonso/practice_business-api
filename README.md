# backend_business-api

## Introduction

## Installation

This project assumes that you have Node.js properly installed in your computer.
To install it, follow these steps:
 * Clone this project locally
 * Navigate to the local repository `cd <file_path>`
 * Install this project's dependencies `npm install`
 * Run the project `node server.js` or `nodemon server.js`

Troubleshooting:
 * If you get `nodemon is not a valid command` or similar, run `npm i nodemon`. If the issue persists, run `sudo npm i nodemon`

## Description

### Endpoints

* /workers
  * GET /workers to get an array of all workers
  * POST /workers to create a new worker and save it to the database
  * GET /workers/:name to get a single worker by name
  * PUT /workers/:name to update a single worker by name
  * DELETE /workers/:name to delete a single worker by name

* /ideas __(Not Implemented)__
  * GET /ideas to get an array of all ideas
  * POST /ideas to create a new idea and save it to the database
  * GET /ideas/:id to get a single idea by id
  * PUT /ideas/:id to update a single idea by id
  * DELETE /ideas/:id to delete a single idea by id

* /meetings __(Not Implemented)__
  * GET /meetings to get an array of all meetings
  * POST /meetings to create a new meeting and save it to the database
  * DELETE /meetings to delete all meetings from the database

### Schemas

* Worker:
  * name: string
  * title: string
  * salary: number
  * function: string
* Idea
  * id: string
  * name: string
  * description: string
  * revenue: number
* Meeting
  * time: string
  * day: number
  * month: number
  * note: string
