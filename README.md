# Rubiks-Cube-Solver
# 🧩 Rubik's Cube Solver (2D SVG Version)

This project is a simple, visual **Rubik's Cube simulator and solver** built using **HTML**, **CSS**, and **JavaScript**. It allows you to scramble the cube randomly and watch it solve itself by reversing the moves. The cube is visualized using **SVG graphics** for clarity.

---

## 🚀 Features

- 2D color representation of a 3x3 Rubik’s Cube using SVG
- Scramble the cube with random moves
- Automatically solve by reversing the scramble moves
- Smooth, step-by-step move visualization
- Responsive design for mobile, tablet, and desktop

---

## 📁 Project Structure

rubiks-cube-solver/
├── index.html # HTML markup
├── style.css # CSS styling (responsive design)
├── script.js # All JavaScript logic
└── README.md # Project documentation


---

## 🔧 How It Works

1. The cube is represented internally by a `RubiksCube` class with six colored faces.
2. Each face rotation updates both the face and its adjacent strips.
3. The `CubeSolver` class:
   - Applies random rotations (scramble)
   - Solves by reversing the rotation history
4. SVG graphics update after every move to visually represent the cube’s state.

---

## 📦 Setup Instructions

### Run Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/rubiks-cube-solver.git
   cd rubiks-cube-solver


## 🚀 How to Run the Project

1. **Open the project:**
   - Double-click the `index.html` file  
   **or**
   - Use a Live Server extension (like **VS Code Live Server**) for a better experience.

2. **Interact with the App:**
   - Click the **"Scramble & Solve Cube"** button and watch the cube get scrambled and solved automatically.

---

## 📱 Responsive Design

This app is fully responsive and works seamlessly on:

- ✅ Desktop  
- ✅ Tablets  
- ✅ Mobile devices  

---

## 🛠️ Technologies Used

- **HTML5** – Markup  
- **CSS3** – Styling & Responsive layout  
- **Vanilla JavaScript** – Logic and interactivity  
- **SVG** – Cube visualization  

---

## ✨ Future Improvements

- Add keyboard controls for manual rotation  
- 3D visualization using WebGL or Three.js  
- Implement a real solving algorithm (e.g., **CFOP**, **Kociemba**)  

---
