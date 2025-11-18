# rekords
An app to manage and organize libraries of music for dj sets


Frontend
Install all the components required to run frontend in root OS.

from root
npm create vite@latest frontend -- --template react-ts
cd frontend
npm install

from /frontend
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p

from /frontend
npm install shadcn-ui --save-dev
npx shadcn@latest init 
npx shadcn add button card input table scroll-area

potential additional steps:
if typescript version < 6 then  npm install -D typescript@latest
if react-router-dom is not installed then npm install react-router-dom