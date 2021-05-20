# 🍋 easyPD

A dashboard designed to make professional development "easyPD" lemon squeezy. 

⚡ Powered by Svelte, Typescript, and Flask.

## Preface
Rather than a "passion project," I call easyPD a "practice project." Though professional development is definitely something I love very much, the main purpose of easyPD was to be a means by which I could practice Svelte and TypeScript. At the moment, most features are implemented, but there's a lot I'd want to improve on before I could actually ever ship easyPD. Due to work, I took some shortcuts with easyPD so as to focus on learning Svelte and TypeScript. For now, easyPD will be placed on hiatus, but I hope to pick it up in the future (and give it a better, more efficient backend!). 

## Setup
1. `git clone` this repository
3. open two terminal windows (or command prompt); `cd` into the root folder of easyPD for one of them, then `cd` into the `src` folder of easyPD in the other window.
4. In the former window, run `npm install`, then `python backend.py`
5. In the latter window mentioned above (`src` folder), run the following command: `npm run autobuild`
6. Navigate to `localhost:5000` and you'll see your personalized easyPD!

## Future features
- User registration and user database
- "Goals" section complete with Kanban board (draggable goals!)
- "Applications" section to keep track of jobs applied to
- More sorting features
- Profile picture image upload
- More user-friendly way to edit or delete existing data
