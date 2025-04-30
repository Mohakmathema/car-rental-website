# Car Rental Website

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/en)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=fff)](https://www.mongodb.com/)

## Overview

This is a full-stack web application designed to make renting a car straightforward. It connects users with a selection of vehicles for various needs, from weekend trips to business travel. Built using React on the frontend, Node.js on the backend, and MongoDB for data storage, this application aims to provide a smooth and intuitive car rental experience.

## Key Features

* Browse Available Cars: View a detailed list of available vehicles including make, model, year, daily rate, and availability.
* Advanced Search & Filtering: Find specific cars using filters based on location, car type, price range, and features.
* User Authentication: Secure registration and login system for users to manage bookings and personal information.
* Booking Management: Simple booking process with clear confirmation and the ability to view past and upcoming reservations.
* Interactive Maps: Integrated map functionality to easily select pickup and drop-off locations.
* Admin Dashboard (Future Enhancement): Planned features for administrators to manage vehicles, bookings, and user accounts.

## Tech Stack

This project leverages the following technologies:

* **Frontend:**
    * [React](https://react.dev/) - A JavaScript library for building user interfaces.
    * [React Router](https://reactrouter.com/) - For declarative routing in React applications.
    * [Redux](https://redux.js.org/) or [Context API](https://react.dev/learn/passing-data-deeply-with-context) (Choose one for state management)
    * [Axios](https://axios-http.com/docs/intro) - For making HTTP requests to the backend.
    * [Styled Components](https://styled-components.com/) or [CSS Modules](https://github.com/css-modules/css-modules) (Choose one for styling)
      
* **Backend:**
    * [Node.js](https://nodejs.org/en) - A JavaScript runtime built on Chrome's V8 JavaScript engine.
    * [Express.js](https://expressjs.com/) - A fast, unopinionated, minimalist web framework for Node.js.
    * [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - For secure authentication using JSON Web Tokens.
    * [bcrypt](https://www.npmjs.com/package/bcrypt) - For password hashing.
   
* **Database:**
    * [MongoDB](https://www.mongodb.com/) - A NoSQL database for flexible and scalable data storage.
    * [Mongoose](https://mongoosejs.com/) - An elegant MongoDB object modeling for Node.js.

## Getting Started

Follow these steps to get the car rental website running on your local machine:

### Prerequisites

* [Node.js](https://nodejs.org/) (version >= 16)
* [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
* [MongoDB](https://www.mongodb.com/try/download/community) (Make sure MongoDB is running on your system)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Mohakmathema/car-rental-website](https://github.com/Mohakmathema/car-rental-website.git)
    cd car-rental-website
    ```

2.  **Install backend dependencies:**
    ```bash
    npm install  # or yarn install
    ```

3.  **Configure backend environment variables:**
    * Create a `.env` file in the `backend` directory.
    * Add the following environment variables (replace with your actual values):
        ```env
        PORT=5000
        MONGODB_URI=mongodb://localhost:27017/car-rental
        JWT_SECRET=your-secret-key
        ```

4.  **Run the backend server:**
    ```bash
    npm run dev  # or yarn dev (if you have nodemon configured)
    ```

5.  **Navigate to the frontend directory:**
    ```bash
    cd src
    ```

6.  **Install frontend dependencies:**
    ```bash
    npm install  # or yarn install
    ```

7.  **Configure frontend environment variables:**
    * Create a `.env.local` file in the `src` directory.
    * Add the following environment variable (adjust if your backend runs on a different port):
        ```env
        REACT_APP_API_BASE_URL=localhost api
        ```

8.  **Run the frontend development server:**
    ```bash
    npm start  # or yarn start
    ```

Your car rental application should now be running in your browser, usually at `http://localhost:3000`.

## Contributing

Conttrubutions from members of the group:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix (`git checkout -b feature/your-feature-name`).
3.  Make your changes and commit them (`git commit -am 'Add some feature'`).
4.  Push to the branch (`git push origin feature/your-feature-name`).
5.  Open a pull request.
6.  Do not force push into main

Please ensure your code adheres to the project's coding standards and includes appropriate tests.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any questions or suggestions, feel free to reach out to yeah you though i would add my details here nah man this is a college project.
YIPPIE!!
