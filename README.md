# ElectroPriceFinder

This project is a full-stack application that fetches electronic part prices from multiple providers (Mouser, Rutronik, and Element14) and allows users to manage cart.

## Table of Contents
- [Project Overview](#project-overview)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Usage](#usage)

## Project Overview

The project consists of a backend built with Node.js and a frontend built with React. The backend handles fetching data from external APIs and the frontend displays the data and manages the shopping cart.

## Backend Setup

### Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher)

### Installation

1. Navigate to the `backend` directory:
    ```bash
    cd backend
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Start the backend server:
    ```bash
    npm start
    ```

The backend will be running at `http://localhost:5000`.

## Frontend Setup

### Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher)

### Installation

1. Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Start the frontend development server:
    ```bash
    npm start
    ```

The frontend will be running at `http://localhost:3000`.

## Usage

### Fetch Prices and Manage Cart

1. Enter the part number and volume in the input form on the homepage and submit to fetch prices from Mouser, Rutronik, and Element14.
2. Add the item with the lowest price to the cart.
3. Navigate to the cart page to view and manage the items in the cart.
