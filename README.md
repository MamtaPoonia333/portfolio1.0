# 🖥️ WebOS Portfolio  
### A Fully Interactive MacOS-Inspired Operating System in the Browser

🚀 **Live Demo:** https://web-os-portfolio-eight.vercel.app/  
📂 **Repository:** https://github.com/koder-M/WebOs-Portfolio  

---

## 📌 About The Project

WebOS Portfolio is a fully functional MacOS-style desktop environment built entirely using **HTML, SCSS/CSS, and Vanilla JavaScript**.

It simulates a real operating system experience inside the browser — complete with window management, folder system, terminal, camera, photos app, and persistent storage.

This project demonstrates advanced DOM manipulation, UI engineering, and system-level frontend architecture without using any frameworks.

---

## ✨ Features

### 🗂 Desktop & Folder System
- Right-click context menu
- Create, rename, and delete folders
- Drag folders within desktop boundaries
- Folder position persistence using LocalStorage
- Double-click to open dynamic folder windows

---

### 🪟 Advanced Window Management
- Draggable windows
- Bring-to-front (z-index stacking system)
- Minimize animation
- Fullscreen maximize toggle
- Smooth open/close transitions
- Independent window states

---

### 📸 Camera Application
- Live preview using `navigator.mediaDevices.getUserMedia`
- Capture photos using Canvas API
- Flash effect animation
- JPEG compression for storage optimization
- Safe stream cleanup on close

---

### 🖼 Photos Application
- Responsive photo grid
- Click to open sliding full-view mode
- Back navigation
- Smooth slide animation
- Persistent photo storage

---

### 💻 Terminal Application
Custom command-line interface built in browser.

#### Supported Commands:
about
name
skills
help
clear
open finder
open notes
open photos



#### Terminal Features:
- Dynamic input prompt generation
- Command parsing logic
- Error handling
- Scroll management
- Launch applications via terminal

---

### 🌄 Dynamic Wallpaper System
- Random wallpaper generator
- Prevents consecutive repeat
- Background switching logic

---

## 🛠 Tech Stack

- **HTML5**
- **SCSS / CSS3**
- **Vanilla JavaScript (ES6)**
- **LocalStorage API**
- **Canvas API**
- **MediaDevices API**

No frameworks. No libraries. Pure frontend engineering.

---

## 🧠 Architecture Overview

### State Management
- Folders stored in `myFolders`
- Photos stored in `myPhotos`
- Window states managed using dataset attributes

### Z-Index System
Custom global z-index counter ensures:
- Active window always on top
- Proper window stacking order

### Storage Optimization
- Images stored in compressed JPEG format
- Prevents LocalStorage quota overflow

---

## 📂 Project Structure
WebOs-Portfolio/
│
├── index.html
├── app.js
├── style.scss
├── style.css
├── style.css.map
│
├── fonts/
├── imgs/
│ ├── wallpapers
│ ├── icons
│ └── folder.png
│
└── README.md



---

## ⚙️ Installation & Setup

1️⃣ Clone the repository:
git clone https://github.com/koder-M/WebOs-Portfolio.git



2️⃣ Open the project folder.

3️⃣ Run using:
- VS Code Live Server
- or any local development server

⚠️ Camera requires HTTPS or localhost to work.

---

## 📈 What This Project Demonstrates

- Advanced DOM manipulation
- System-style UI architecture
- Real-time state persistence
- Canvas image processing
- Complex event handling
- UI/UX engineering without frameworks

---

## 🚀 Future Improvements

- File system inside folders
- IndexedDB migration for larger storage
- Dock animation system
- Spotlight search feature
- Resizable windows
- Photo delete functionality
- Terminal command expansion
- Multi-window restore animation

---

## 👨‍💻 Author

**Mamtaa Poonia**  
Frontend Developer | UI Engineer | System Design Learner  

Focused on building interactive, system-level web experiences using pure JavaScript.

---

## ⭐ Support

If you like this project:

- Star ⭐ the repository  
- Fork 🍴 the project  
- Share feedback  
- Connect for collaboration  

---

## 🔗 Social Links

LinkedIn and Instagram links in the UI are currently dummy placeholders 
added for design demonstration purposes only.

### 🔥 This is not just a website.  
### It’s a browser-based operating system built from scratch.
