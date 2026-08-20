# MineCalc

A material calculator for Minecraft — search or select an item and a quantity, and get a breakdown of the raw materials (and stacks) that you need to craft it.

Check out the project website: [MineCalc](https://purpleorange34596.github.io/MIneCalc/)

## Features
 
- Search box filters the item list as you type
- Pick an item and a quantity (1–1024)
- Calculates total materials needed
- Breaks totals down into full stacks 
- Minecraft-inspired pixel styling (Press Start 2P font, chunky bordered buttons)

## How it works
 
Recipes are stored as a plain object (`RECIPES` in `script.js`) mapping an item name to the materials and amounts it takes to craft one. The search box filters that object's keys and rebuilds the `<select>` list on every keystroke; calculating multiplies each material's per-craft amount by the requested quantity, then converts the total into stacks (`÷ 64`) and leftover items (`% 64`) for display.
 
## Files
 
- `index.html` — page markup
- `style.css` — styling; theme colors are CSS variables at the top of the file
- `script.js` — recipe data plus the search/calculate logic

## Some Images
<img width="1920" height="1080" alt="Screenshot 2026-08-21 004014" src="https://github.com/user-attachments/assets/684aecc2-b345-471a-8a22-5adfb9bb3896" />
<img width="1920" height="1080" alt="Screenshot 2026-08-21 004027" src="https://github.com/user-attachments/assets/54ced20e-1e44-4579-b607-6c0fb6335b91" />

