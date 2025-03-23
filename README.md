
# Todo List App

A React-based movie application built with Vite and ESLint.


## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)

## Introduction
This project is a movie application built with React, Vite, and Material-UI. It allows users to search for movies, view movie details, and add movies to a cart.
## Features
- Search for movies by title
- View movie details, including poster images and descriptions
- Add movies to a cart and view cart contents
- Responsive design using Material-UI
## Getting Started
To get started with this project, follow these steps:
1. Clone the repository using git clone `https://github.com/ppnnoot/movie-app.git`
2. Install the dependencies using `npm install` or `yarn install`
3. Start the development server using `npm run dev` or `yarn dev`
4. Open the app in your browser at `http://localhost:5173/`
## Project Structure
The project is structured as follows:

- src: Source code directory
    - `App.jsx`: Main application component
    - `components`: Directory for reusable components
        - `Movielist`: Movie list component
        - `Navbar`: Navigation bar component
        - `CartButton`: Cart button component
        - `CartDetails`: Cart details component
    - `index.css`: Global CSS styles
    - `main.jsx`: Entry point for the application
- `public`: Public directory for static assets
- `vite.config.js`: Vite configuration file

## Dependencies
The project uses the following dependencies:

- react: React library
- react-dom: React DOM library
- vite: Vite development server
