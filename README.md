# 📖 React Native Bible & Daily Devotional App

A full-stack mobile application built with React Native (Expo) that provides a seamless Bible reading experience, smart verse searching, and a daily devotional in real-time through a custom decoupled backend.

## 🏗 System Architecture

This project deliberately avoids the monolithic trap by separating the client-side mobile app from the data-fetching engine:
* **Frontend (Mobile App):** Built with React Native & Expo Router for file-based navigation. Handles UI and state management for fluid reading.
* **Backend (REST API):** A custom Node.js/Express server utilizing Cheerio. It acts as a lightweight proxy scraper to extract daily devotional content from `dailyscripture.net` without overwhelming the client's memory or violating CORS policies.

## ✨ Key Features

* **Smart Bible Reader:** Dynamic chapter navigation with absolute boundary limits (prevents navigating past the last chapter of a specific book).
* **Precision Search Engine:** Multi-input search interface that intelligently parses Book, Chapter, and Verse, adapting the UI to "Single Verse Mode" when specific verses are requested.
* **Real-time Daily Devotional:** Fetches daily Gospel readings, meditations, and prayers from a custom backend API seamlessly.

## 🛠 Tech Stack

**Frontend:**
* React Native
* Expo & Expo Router (Tabs & File-based routing)
* React Native Safe Area Context
* Expo Vector Icons

**Backend:**
* Node.js & Express.js
* Axios (HTTP client for raw HTML fetching)
* Cheerio (High-performance DOM parsing)

## 🚀 How to Run Locally

Because this project uses a decoupled architecture, you must run both the backend server and the frontend application simultaneously.

### 1. Start the Backend API (Devotional Proxy)
```bash
cd path/to/your/backend/folder
npm install
node server.js
