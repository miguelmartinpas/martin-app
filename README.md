[![Coverage Status](https://coveralls.io/repos/github/miguelmartinpas/martin-app/badge.svg?branch=main)](https://coveralls.io/github/miguelmartinpas/martin-app?branch=main)

# Overview

Showcase App with React

# Setup

Clone project

<code>git clone https://github.com/miguelmartinpas/martin-app.git</code>

Install dependencies (node v10.16.2 is minimum requirement)

<code>npm install</code>

# Run locally

Run with dev environmet

<code>npm run start:dev</code>

Run with prod environment

<code>npm run start</code>

ir will run in http://localhst:8080

# Deploy

<code>npm run build</code>

dist folder will contain code ready to be used

# Github workflow

Github workflow is configure to run:

-   lint
-   test:coverage
-   deploy coverage in coveralls (3 party librarie)
-   deploy app in github pages

check it on: https://github.com/miguelmartinpas/martin-app/actions

# Github pages deploy

github workflow deploy the app in https://miguelmartinpas.github.io/martin-app/

# Test

It runs UT with Jest and Enzyme

<code>npm run test</code>

# Coverage

<code>npm run test:coverage</code>

You can check Coverage info in: https://coveralls.io/github/miguelmartinpas/martin-app?branch=main

# Lint & format

It checks code with eslint and prettier

<code>npm run lint</code>

<code>npm run format</code>
