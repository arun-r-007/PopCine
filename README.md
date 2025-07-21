# PopCine - Movie Application

PopCine is a modern, responsive web application developed using React.js, powered by Appwrite for backend operations, and styled using Tailwind CSS. It allows users to browse trending films, search for specific titles, and explore detailed movie data fetched from the TMDB API.

---

## Project Objective

To create a dynamic and responsive movie web app that provides users with real-time access to trending and searchable movie content, while demonstrating frontend-backend integration and component-based design using React and Appwrite.

---

### PopCine Website

[Visit the Website](https://popcine-app.netlify.app/)

---

## Technologies Used

* **React.js** – Component-based frontend library
* **Appwrite** – Backend-as-a-Service for database, auth, and storage
* **Tailwind CSS** – Utility-first CSS framework for responsive design
* **Vite** – Lightning-fast frontend bundler with HMR
* **TMDB API** – External movie data provider
* **React-use** – Handy hooks for state and effect handling

---

## Key Features

* **Browse Trending Movies**
  Explore popular and trending movie titles in real-time.

* **Movie Search**
  Search any movie by title using the integrated TMDB API search.

* **Responsive Design**
  Works seamlessly across all screen sizes.

* **Modern UI/UX**
  Built with custom utility classes and clean component design.

* **Reusable Architecture**
  Modular code structure for scalability and maintainability.

---

## Project Structure

```
PopCine/
├── dist/
├── node_modules/
├── public/
│   └── readme/
│       ├── hero.png
│       └── demo-output.png
├── src/
│   ├── components/
│   │   └── Spinner.jsx
│   ├── pages/
│   ├── styles/
│   │   └── index.css
│   └── App.jsx
├── .env.local
├── .env.example
├── .gitignore
├── eslint.config.js
├── index.html
├── LICENSE
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md

```

---

## How to Run

1. **Install Prerequisites**

   * [Node.js](https://nodejs.org/en)
   * [npm](https://www.npmjs.com/)
   * [Git](https://git-scm.com/)

2. **Clone the Repository**

   ```bash
   git clone https://github.com/arun-r-007/PopCine.git
   cd PopCine
   ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

4. **Configure Environment Variables**
   Create a `.env.local` file:

   ```env
   VITE_TMDB_API_KEY=your_tmdb_key
   VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
   VITE_APPWRITE_DATABASE_ID=your_appwrite_db_id
   VITE_APPWRITE_COLLECTION_ID=your_collection_id
   ```

5. **Run the App**

   ```bash
   npm run dev
   ```

6. Open `http://localhost:5173` in your browser.

---

## Concepts Practiced

* REST API integration with React
* State management using hooks
* Tailwind-based component styling
* Authentication and storage via Appwrite
* Building responsive layouts
* Code reusability and folder structuring

---

## Website Screenshots

![Website Screenshots](https://github.com/user-attachments/assets/86779545-6057-4488-aa64-96e6536361c4)
![Website Screenshots](https://github.com/user-attachments/assets/59a65c17-9072-470f-b615-81ae433bbf07)
![Website Screenshots](https://github.com/user-attachments/assets/add1b273-cec6-4c59-9578-a07ff2b9f776)
---
