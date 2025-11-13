🟩 README — Vue.js Frontend (CW1 Full Stack App)
After-School Lessons UI — Vue 3 + Vite + Bootstrap + GitHub Pages

Author: Shivansh Chabba
Module: CST3144 — Full Stack Development
Coursework: CW1 (Frontend)

📌 1. Project Overview

This is the frontend application for the “EduLessons” after-school activity platform.
The system allows users (students/parents) to:

View a list of lessons

Sort lessons (subject, location, price, availability)

Add lessons to a shopping cart

Remove lessons from cart

Validate checkout form (name + phone)

Submit an order to the backend

Automatically update lesson spaces

Search lessons (full-text backend search implemented)

The frontend is built with:

Vue.js 3 (Composition API)

Vite

Bootstrap 5 for layout

Native fetch() for all API calls (as required by the coursework)

The app is deployed using GitHub Pages.

🌐 2. Deployment Links
🔵 Live GitHub Pages Deployment (Production)

➡️ https://shivanshchabba.github.io/cw1-vue-app-/

🔵 Backend API (Required for Fetch)

➡️ https://cw1-express-app.onrender.com/api/lessons

The frontend is fully connected to the backend using fetch + promises, following CW1 requirements.

📁 3. GitHub Repository

Vue.js Frontend Source Code:
➡️ https://github.com/SHIVANSHCHABBA/cw1-vue-app-

Branches:

main → production / GitHub Pages

GitHub Actions handles automatic rebuilds on push

🛠 4. Tech Stack
Feature	Technology
Framework	Vue 3 (Composition API)
Dev tool	Vite
UI Framework	Bootstrap 5
API calls	fetch() with native Promises
Routing	Vue Router
State	Simple JS Store (cart.js)
Deployment	GitHub Pages
⚙️ 5. Installation & Setup (Local Development)
1. Clone the repository
git clone https://github.com/SHIVANSHCHABBA/cw1-vue-app-
cd cw1-vue-app-

2. Install packages
npm install

3. Run locally
npm run dev


Local dev URL:

http://localhost:5173/

4. Build for production
npm run build

5. Preview production build
npm run preview

🔌 6. Environment Variables

The frontend uses a simple API base URL constant inside src/api.js:

export const API_BASE = "https://cw1-express-app.onrender.com/api";


No .env file is required for the final submission or GitHub Pages deployment.

🧩 7. Application Structure
cw1-vue-app-
│
├── public/
│   └── assets/
│       └── study_bg.png      # Background image
│
├── src/
│   ├── pages/
│   │   ├── LessonsPage.vue
│   │   └── CartPage.vue
│   │
│   ├── components/
│   │   └── LessonCard.vue
│   │
│   ├── store/
│   │   └── cart.js
│   │
│   ├── utils/
│   │   └── validation.js
│   │
│   ├── api.js
│   ├── main.js
│   └── App.vue
│
└── vite.config.js


Everything follows the modular, component-based design expected in Vue.js coursework.

🧠 8. Key Frontend Features (Required by CW1)
✔ Display List of Lessons

Uses v-for

Shows: subject, location, price, spaces, icon

At least 10 lessons with 5 spaces each

✔ Sorting (10%)

Sort by:

Subject

Location

Price

Space

And includes:

Ascending

Descending

✔ Add to Cart (5%)

Add-to-cart button disabled when space = 0

Space reduces immediately

Uses Vue reactivity (Composition API)

✔ Shopping Cart (5%)

View items

Remove items (space restored)

Toggle between Lessons ↔ Cart page

Cart count shown in header

✔ Checkout (6%)

Name validation (letters only)

Phone validation (numbers only)

Button disabled unless valid

Confirmation alert on success

Sends POST order + PUT updates to backend

✔ Full Backend Search Support (10%)

Frontend calls:

GET /api/search?q=term


Results displayed immediately

Supports "search as you type"

🎨 9. UI / Theme Design

To elevate the submission quality:

Full-page study desk background image

Gradient header bar

Professional card layout

Soft shadows and rounded corners

Clean modern typography

Consistent spacing + margins

Fully responsive on mobile

Subtle fade transitions between pages

This produces a visually modern, polished UI.

🚀 10. Deployment (GitHub Pages)
Deployment handled through:
.github/workflows/deploy.yml


Details:

Uses vite build

Outputs to dist/

GitHub Actions automatically deploys to gh-pages branch

No manual steps required.

📦 11. Exported Files for Submission

Included in the final ZIP:

cw1-vue-app- folder (without node_modules)

README.md

Any images stored in /public/assets/

🏁 12. Status

Frontend: 100% Complete & Fully Functional

✔ Vue.js Only (no React / Angular / Svelte)
✔ fetch() Only (no Axios)
✔ Connected to Render Backend
✔ All Sorting + Cart + Checkout rules implemented
✔ Mobile-friendly responsive UI
✔ GitHub Pages Deployment Live
✔ Meets marking rubric expectations
