Set up project with Vite React Typescript + Tailwind CSS + Github with Yarn

/* Terminal */
yarn create vite 
-- input project name + choose Typescript 
cd my-project

yarn add -D tailwindcss postcss autoprefixer
yarn tailwindcss init -p

/* tailwind.config.cjs */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

/* index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Terminal */
yarn dev

/* GitHub Website*/
Create new repo 


/* Terminal */
git init
git branch -M main
git remote add origin + https github
git add .
git commit -m "first commit"
git push -u origin main
