let folderMenu = document.getElementById("folderMenu");
let selectedFolder = null;
let folders = [];
let folderCount = 0;
let desktop = document.querySelector("#desktop");
const menu = document.querySelector("#contextMenu");
document.getElementById("newFolderBtn").addEventListener("click", () => {

    let confirmCreate = confirm("Do you want to create a new folder?");

    if (confirmCreate) {
        createFolder();
    }
    menu.style.display = "none";
});
desktop.addEventListener("contextmenu", (e) => {
    if (e.target.closest(".folder")) return;

    e.preventDefault();

    menu.style.display = "block";
    menu.style.left = e.pageX + "px";
    menu.style.top = e.pageY + "px";
});
window.addEventListener("click", (e) => {
    if (!e.target.closest("#contextMenu")) menu.style.display = "none";
});

let desktopWalls = [
    "wal1.jpg",
    "wal2.jpg",
    "wal3.jpg",
    "wal4.jpg",
    "wal5.jpg",
    "wal6.jpg",
    "wal7.jpg",
    "wal8.jpg",
    "wal9.jpg",
    "wal10.jpg"
];

let mobileWalls = [
    "mob1.jpg",
    "mob2.jpg",
    "mob3.jpg",
    "mob4.jpg"
];
  
let main = document.querySelector("main");
let lastIndex = -1;

function changeWal() {
    let arrToUse;

    // 🔥 Responsive decision
    if (window.innerWidth < 600) {
        arrToUse = mobileWalls;
    } else {
        arrToUse = desktopWalls;
    }

    let ran;

    do {
        ran = Math.floor(Math.random() * arrToUse.length);
    } while (ran === lastIndex);

    lastIndex = ran;

    main.style.backgroundImage = `url('imgs/${arrToUse[ran]}')`;
}

let topZ = 2030000000;
function bringFront(winId) {
    topZ++;
    const el = document.getElementById(winId);
    el.style.zIndex = topZ;
    el.dataset.minimized = "false";
}

function openWindow(winId) {
    const w = document.getElementById(winId);
    if (!w) return;

    w.style.display = "block";

    setTimeout(() => {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        const winWidth = w.offsetWidth;
        const winHeight = w.offsetHeight;

        w.style.left = (screenWidth - winWidth) / 2 + "px";
        w.style.top = (screenHeight - winHeight) / 2 + "px";
    }, 10);

    w.style.transform = "scale(1)";
    w.style.opacity = "1";
    w.dataset.minimized = "false";
    bringFront(winId);
}

let finder = document.querySelector(".finder");
let nots = document.querySelector(".nots");
let brwsr = document.querySelector(".brwsr");
let photos = document.querySelector('.photos')

finder.addEventListener("click", function(){
    openWindow("finderWin");
})
// brwsr.addEventListener("click", function(){
//     openWindow("browserWin");
// })
nots.addEventListener("click", function(){
    openWindow("notesWin");
})

photos.addEventListener('click', function(){
    openWindow("photosWin");
})

// Close window
function closeWindow(winId) {
    const w = document.getElementById(winId);
    w.style.opacity = "0";
    w.style.transform = "scale(0.9)";
    setTimeout(() => w.style.display = "none", 220);
}

let close =  document.querySelector('.close');
close.addEventListener("click", function(){
    closeWindow("finderWin");
})
let notesbtn = document.querySelector("#notesWin1");
notesbtn.addEventListener("click", function(){
    closeWindow("notesWin");
})

// let browserbtn = document.querySelector("#browserWin1");
// browserbtn.addEventListener("click", function(){
//     closeWindow("browserWin");
// })

let photosbtn = document.querySelector('#photosWin1');
photosbtn.addEventListener('click', () => {
    closeWindow('photosWin');
})


let mini =  document.querySelector('.minimize');
mini.addEventListener("click", function(){
    minWindow("finderWin");
})

let notesmini = document.querySelector("#notesWin2");
notesmini.addEventListener("click", function(){
    minWindow("notesWin");
})

// let brwsmini = document.querySelector("#browserWin2");
// brwsmini.addEventListener("click", function(){
//     minWindow("browserWin");
// })

let photosmini = document.querySelector('#photosWin2');
photosmini.addEventListener('click', () => {
    minWindow('photosWin')
})
// Minimize
function minWindow(winId) {
    const w = document.getElementById(winId);

    // 💾 save before minimize
    w.dataset.prevTransform = w.style.transform;
    w.dataset.prevOpacity = w.style.opacity;

    w.style.transform = "scale(0.28)";
    w.style.opacity = "0.35";
    w.dataset.minimized = "true";
}

function maxWindow(winId) {
    const w = document.getElementById(winId);

    if (w.dataset.maximized === "true") {
        // 🔙 Restore original size
        w.style.width = w.dataset.prevWidth;
        w.style.height = w.dataset.prevHeight;
        w.style.top = w.dataset.prevTop;
        w.style.left = w.dataset.prevLeft;

        w.dataset.maximized = "false";
    } else {
        // 💾 Save current size BEFORE maximizing
        w.dataset.prevWidth = w.offsetWidth + "px";
        w.dataset.prevHeight = w.offsetHeight + "px";
        w.dataset.prevTop = w.style.top;
        w.dataset.prevLeft = w.style.left;

        // 🚀 Maximize
        w.style.width = "100vw";
        w.style.height = "100vh";
        w.style.top = "0";
        w.style.left = "0";

        w.dataset.maximized = "true";
    }

    bringFront(winId);
}

let max = document.querySelector(".maximize");
max.addEventListener("click", function() {
    maxWindow("finderWin");
})

let notesMax = document.querySelector("#notesWin3");
notesMax.addEventListener("click", function() {
    maxWindow("notesWin");
})

// let browserMax = document.querySelector("#browserWin3");
// browserMax.addEventListener("click", function() {
//     maxWindow("browserWin");
// })

let photosMax = document.querySelector('#photosWin3');
photosMax.addEventListener('click', () => {
    maxWindow('photosWin')
})


let windows = document.querySelectorAll(".window");
windows.forEach(win => {
    const bar = win.querySelector(".tittle-bar");
    let dragging = false;
    let offsetX = 0;
    let offsetY= 0;

    bar.addEventListener("mousedown", (e) => {
        console.log();
        dragging = true;
        offsetX = e.clientX - win.offsetLeft;
        offsetY = e.clientY - win.offsetTop;
        bringFront(win.id);
        bar.style.cursor = "grabbing";

    });
    document.addEventListener("mousemove",(e) => {
        if(!dragging){
            return
        }
        win.style.left = e.clientX - offsetX + "px";
        win.style.top = e.clientY - offsetY + "px";
    });
    document.addEventListener("mouseup", () => {
        dragging = false;
        bar.style.cursor = "grab";
    });
    win.addEventListener("mousedown", () => bringFront(win.id));
})









function loadFolders() {
    let data = localStorage.getItem("myFolders");
    if (data) {
        folders = JSON.parse(data);
        folderCount = folders.length;
        folders.forEach(folder => renderFolder(folder));
    }
}
loadFolders();


function saveFolders() {
    localStorage.setItem("myFolders", JSON.stringify(folders));
}


function createFolder() {

    folderCount++;

    let desktopRect = desktop.getBoundingClientRect();

    let folderWidth = 80;
    let folderHeight = 100;

    let maxX = desktopRect.width - folderWidth;
    let maxY = desktopRect.height - folderHeight;

    let x = Math.floor(Math.random() * maxX);
    let y = Math.floor(Math.random() * maxY);

    let newFolder = {
        id: folderCount,
        name: "Folder " + folderCount,
        x: x,
        y: y
    };

    folders.push(newFolder);
    renderFolder(newFolder);
    saveFolders();
}


// Rename
document.getElementById("renameFolder").addEventListener("click", () => {
    if (!selectedFolder) return;

    let newName = prompt("Rename Folder:", selectedFolder.folder.name);

    if (newName) {
        selectedFolder.folder.name = newName;
        selectedFolder.element.querySelector("p").textContent = newName;
        saveFolders();
    }

    folderMenu.style.display = "none";
});

// Delete
document.getElementById("deleteFolder").addEventListener("click", () => {
    if (!selectedFolder) return;

    folders = folders.filter(f => f.id !== selectedFolder.folder.id);
    selectedFolder.element.remove();

    saveFolders();
    folderMenu.style.display = "none";
});

// Hide folder menu
document.addEventListener("click", (e) => {
    if (!e.target.closest("#folderMenu")) {
        folderMenu.style.display = "none";
    }
});


function renderFolder(folder) {

    let div = document.createElement("div");
    div.classList.add("folder");

    div.style.left = folder.x + "px";
    div.style.top = folder.y + "px";

    div.innerHTML = `
        <img src="imgs/folder.png" />
        <p>${folder.name}</p>
    `;


    div.addEventListener("dblclick", () => {
        openFolderWindow(folder);
    });


    div.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        e.stopPropagation();
    
        selectedFolder = { folder, element: div };
    
        folderMenu.style.display = "block";
        folderMenu.style.left = e.pageX + "px";
        folderMenu.style.top = e.pageY + "px";
    });

    let dragging = false;
    let offsetX, offsetY;

    div.addEventListener("mousedown", (e) => {
        dragging = true;
        offsetX = e.offsetX;
        offsetY = e.offsetY;
    });

    document.addEventListener("mousemove", (e) => {
        if (!dragging) return;

        let desktopRect = desktop.getBoundingClientRect();

        let newX = e.pageX - offsetX;
        let newY = e.pageY - offsetY;

        let folderWidth = div.offsetWidth;
        let folderHeight = div.offsetHeight;

        let maxX = desktopRect.width - folderWidth;
        let maxY = desktopRect.height - folderHeight;

        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));

        div.style.left = newX + "px";
        div.style.top = newY + "px";

        folder.x = newX;
        folder.y = newY;
    });

    document.addEventListener("mouseup", () => {
        dragging = false;
        saveFolders();
    });

    desktop.appendChild(div);


    function openFolderWindow(folder) {

        let existing = document.getElementById("folderWin_" + folder.id);
        if (existing) {
            existing.style.display = "block";
            bringFront(existing.id);
            return;
        }
    
        let win = document.createElement("div");
        win.classList.add("window");
        win.id = "folderWin_" + folder.id;
    
        win.innerHTML = `
            <div class="tittle-bar">
                <div class="buttons">
                    <span class="btn close"></span>
                    <span class="btn minimize"></span>
                    <span class="btn maximize"></span>
                </div>
                <p>${folder.name}</p>
            </div>
    
            <div class="content">
                <h3>${folder.name}</h3>
                <p>This folder is empty.</p>
            </div>
        `;
    
        desktop.appendChild(win);
        win.style.display = "block";
        bringFront(win.id);
    
        // ===== CLOSE =====
        win.querySelector(".close").addEventListener("click", () => {
            win.style.display = "none";
        });
    
        // ===== MINIMIZE =====
        win.querySelector(".minimize").addEventListener("click", () => {
            minWindow(win.id);
        });
    
        // ===== MAXIMIZE =====
        win.querySelector(".maximize").addEventListener("click", () => {
            maxWindow(win.id);
        });
    
        // ===== DRAG SYSTEM (Same as your other windows) =====
        let bar = win.querySelector(".tittle-bar");
        let dragging = false;
        let offsetX = 0;
        let offsetY = 0;
    
        bar.addEventListener("mousedown", (e) => {
            dragging = true;
            offsetX = e.clientX - win.offsetLeft;
            offsetY = e.clientY - win.offsetTop;
            bringFront(win.id);
            bar.style.cursor = "grabbing";
        });
    
        document.addEventListener("mousemove", (e) => {
            if (!dragging) return;
            win.style.left = e.clientX - offsetX + "px";
            win.style.top = e.clientY - offsetY + "px";
        });
    
        document.addEventListener("mouseup", () => {
            dragging = false;
            bar.style.cursor = "grab";
        });
    
        win.addEventListener("mousedown", () => bringFront(win.id));
    }
}



let terminalIcon = document.querySelector(".terminal");
let terminalInput = document.getElementById("terminalInput");
let terminalOutput = document.getElementById("terminalOutput");

terminalIcon.addEventListener("click", function(){
    openWindow("terminalWin");
    setTimeout(() => {
        terminalInput.focus();
    }, 50);
});

// Close
document.getElementById("terminalWin1").addEventListener("click", function(){
    closeWindow("terminalWin");
});

// Minimize
document.getElementById("terminalWin2").addEventListener("click", function(){
    minWindow("terminalWin");
});

// Maximize
document.getElementById("terminalWin3").addEventListener("click", function(){
    maxWindow("terminalWin");
});

// Commands
let commands = {
    about: "Hi, I'm Mamta. I build interactive MacOS-style web experiences.",
    name: "Mamta",
    skills: "HTML, CSS, JavaScript, React , UI Engineering",
    help: "Commands: about, name, skills, open finder, open notes, open photos, clear"
};

function createNewInputLine(){
    let inputLine = document.createElement("div");
    inputLine.className = "terminal-input-line";
    inputLine.innerHTML = `
        <span class="prompt">mamtaa@mac ~ %</span>
        <input type="text" class="terminalInput" />
    `;
    terminalOutput.appendChild(inputLine);

    let newInput = inputLine.querySelector("input");
    newInput.focus();
    attachTerminalEvent(newInput);
}

function attachTerminalEvent(inputElement){
    inputElement.addEventListener("keydown", function(e){

        if(e.key === "Enter"){

            let input = this.value.trim().toLowerCase();
            if(input === "") return;

            let line = document.createElement("div");
            line.textContent = "mamtaa@mac ~ % " + input;
            terminalOutput.appendChild(line);

            this.parentElement.remove();


            if(input === "clear"){
                terminalOutput.innerHTML = "";
                createNewInputLine();
                return;
            }

            if(commands[input]){
                let output = document.createElement("div");
                output.textContent = commands[input];
                terminalOutput.appendChild(output);
            }

            else if(input.startsWith("open ")){
                let app = input.split(" ")[1];

                if(app === "finder") openWindow("finderWin");
                else if(app === "notes") openWindow("notesWin");
                // else if(app === "browser") openWindow("browserWin");
                else if(app === "photos") openWindow("photosWin");
                else {
                    let err = document.createElement("div");
                    err.textContent = "App not found.";
                    terminalOutput.appendChild(err);
                }
            }

            else{
                let err = document.createElement("div");
                err.textContent = "Command not found. Type 'help'";
                terminalOutput.appendChild(err);
            }

            // 🔹 Scroll bottom
            terminalOutput.scrollTop = terminalOutput.scrollHeight;

            // 🔹 New prompt create
            createNewInputLine();
        }
    });
}

attachTerminalEvent(terminalInput);




let cameraIcon = document.querySelector(".camera");
let video = document.getElementById("cameraVideo");
let canvas = document.getElementById("cameraCanvas");
let captureBtn = document.getElementById("captureBtn");

let cameraStream = null;

// OPEN CAMERA
cameraIcon.addEventListener("click", async function(){
    openWindow("cameraWin");

    if(cameraStream) return;

    try{
        cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = cameraStream;
    } catch(err){
        alert("Camera permission denied!");
    }
});

// CAPTURE IMAGE
captureBtn.addEventListener("click", function(){

    console.log('kkkk');

    if(!cameraStream) return;

    let scale = 0.5;
canvas.width = video.videoWidth * scale;
canvas.height = video.videoHeight * scale;

let ctx = canvas.getContext("2d");
ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

let imageData = canvas.toDataURL("image/jpeg", 0.6);

    savePhoto(imageData);

    // small flash effect
    cameraFlashEffect();
});

// SAVE IMAGE
function savePhoto(img){
    let photos = JSON.parse(localStorage.getItem("myPhotos")) || [];
    photos.push(img);
    localStorage.setItem("myPhotos", JSON.stringify(photos));
}



// CLOSE CAMERA
document.getElementById("cameraWin1").addEventListener("click", function(){
    closeWindow("cameraWin");

    if(cameraStream){
        cameraStream.getTracks().forEach(track => track.stop());
        cameraStream = null; 
    }
});

// FLASH EFFECT
function cameraFlashEffect(){
    let flash = document.createElement("div");
    flash.style.position = "absolute";
    flash.style.top = 0;
    flash.style.left = 0;
    flash.style.width = "100%";
    flash.style.height = "100%";
    flash.style.background = "white";
    flash.style.opacity = "0.8";
    flash.style.pointerEvents = "none";

    document.getElementById("cameraWin").appendChild(flash);

    setTimeout(() => {
        flash.remove();
    }, 120);
}

const photoGrid = document.getElementById("photoGrid");
const viewerView = document.getElementById("viewerView");
const viewerImage = document.getElementById("viewerImage");
const backBtn = document.getElementById("backBtn");
const galleryView = document.querySelector(".gallery-view");

let currentIndex = 0;

function renderPhotos() {
    let photos = JSON.parse(localStorage.getItem("myPhotos"));

    if (!photos || photos.length === 0) {
        photos = [
            "imgs/wal1.jpg",
            "imgs/wal2.jpg"
        ];
        localStorage.setItem("myPhotos", JSON.stringify(photos));
    }

    photoGrid.innerHTML = "";

    photos.forEach((src, index) => {
        const img = document.createElement("img");
        img.src = src;
        img.onclick = () => openViewer(index);
        photoGrid.appendChild(img);
    });
}
function openViewer(index) {
    let photos = JSON.parse(localStorage.getItem("myPhotos")) || [];

    currentIndex = index;
    viewerImage.src = photos[index];

    viewerView.classList.add("active");
    galleryView.classList.add("slide-left");
}

backBtn.onclick = () => {
    viewerView.classList.remove("active");
    galleryView.classList.remove("slide-left");
};

photos.addEventListener("click", function(){
    openWindow("photosWin");
    renderPhotos();  
});


const inner = document.querySelector('.inner');
const overlay = document.querySelector('.overlay');
let w = 0;
let rotation = 0;


let file = null;
let image = null;

let interval = setInterval(() => {
    if (w < 90) { 
        w += 1; 
        inner.style.width = w + '%';
    } else {
        clearInterval(interval); 
    }
}, 40); 

setTimeout(() => {
    inner.style.transition = 'width 0.5s ease-in-out';
    inner.style.width = '100%';
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 500);
}, 4000);


const finderData = {
    desktop: [
        { name: "Portfolio.html", type: "file", content: "This is my Portfolio Website project." },
        { name: "Project.js", type: "file", content: "console.log('Hello World');" }
    ],
    documents: [
        { name: "Resume.pdf", type: "file", content: "Mamta - Frontend Developer Resume" }
    ],
    downloads: [
        { name: "Design.png", type: "app", src: "imgs/default1.jpg" }
    ],
    photos: [
        { name: "Gallery", type: "image", app: "photosWin" }
    ],
    projects: [
        // PROJECT TEMPLATE - Copy this and fill with your own details
        // {
        //     name: "Project Name",
        //     type: "project",
        //     description: "Brief description of what the project does",
        //     tech: ["Technology1", "Technology2", "Technology3"],
        //     github: "https://github.com/yourusername/repo",
        //     live: "https://project-demo-link.com",
        //     preview: "Project Preview Text"
        // },
        
        // Add your projects here following the template above
    ],
    skills: [
        { name: "JavaScript", type: "skill" },
        { name: "Java", type: "skill" },
        { name: "C++", type: "skill" },
        { name: "SQL", type: "skill" },
        { name: "TypeScript", type: "skill" },
        { name: "React.js", type: "skill" },
        { name: "HTML5", type: "skill" },
        { name: "CSS3", type: "skill" },
        { name: "Tailwind CSS", type: "skill" },
        { name: "SCSS", type: "skill" },
        { name: "Node.js", type: "skill" },
        { name: "Express.js", type: "skill" },
        { name: "REST APIs", type: "skill" },
        { name: "JWT Authentication", type: "skill" },
        { name: "MongoDB", type: "skill" },
        { name: "Mongoose", type: "skill" },
        { name: "Git", type: "skill" },
        { name: "GitHub", type: "skill" },
        { name: "Postman", type: "skill" },
        { name: "Render", type: "skill" },
        { name: "Vercel", type: "skill" },
        { name: "Netlify", type: "skill" },
        { name: "Responsive Design", type: "skill" },
        { name: "API Integration", type: "skill" },
        { name: "Animations", type: "skill" }
    ]
};



function createAppWindow(title, bodyContent) {

    let winId = "dynamicWin_" + Date.now();

    let win = document.createElement("div");
    win.classList.add("window");
    win.id = winId;

    win.innerHTML = `
        <div class="tittle-bar">
            <div class="buttons">
                <span class="btn close"></span>
                <span class="btn minimize"></span>
                <span class="btn maximize"></span>
            </div>
            <p>${title}</p>
        </div>

        <div class="content">
            ${bodyContent}
        </div>
    `;

    document.querySelector("#desktop").appendChild(win);

    win.style.display = "block";
    bringFront(winId);

    // Close
    win.querySelector(".close").addEventListener("click", () => {
        win.remove();
    });

    // Minimize
    win.querySelector(".minimize").addEventListener("click", () => {
        minWindow(winId);
    });

    // Maximize
    win.querySelector(".maximize").addEventListener("click", () => {
        maxWindow(winId);
    });

    // Drag
    let bar = win.querySelector(".tittle-bar");
    let dragging = false, offsetX, offsetY;

    bar.addEventListener("mousedown", (e) => {
        dragging = true;
        offsetX = e.clientX - win.offsetLeft;
        offsetY = e.clientY - win.offsetTop;
        bringFront(winId);
    });

    document.addEventListener("mousemove", (e) => {
        if (!dragging) return;
        win.style.left = e.clientX - offsetX + "px";
        win.style.top = e.clientY - offsetY + "px";
    });

    document.addEventListener("mouseup", () => {
        dragging = false;
    });
}

const finderGrid = document.getElementById("finderGrid");
const sideItems = document.querySelectorAll(".side-item");

function renderFinder(folder) {
    finderGrid.innerHTML = "";

    finderData[folder].forEach(item => {

        if (item.type === "project") {
            const div = document.createElement("div");
            div.className = "finder-card project-card";
            div.innerHTML = `
                <div class="project-preview">${item.preview || "Project"}</div>
                <h4>${item.name}</h4>
                <p>${item.description}</p>
                <div class="project-tags">
                    ${(item.tech || []).map(tag => `<span class="project-tag">${tag}</span>`).join("")}
                </div>
                <div class="project-links">
                    <a href="${item.github}" target="_blank" rel="noreferrer">GitHub</a>
                    <a href="${item.live}" target="_blank" rel="noreferrer">Live</a>
                </div>
            `;
            finderGrid.appendChild(div);
            return;
        }

        if (item.type === "skill") {
            const div = document.createElement("div");
            div.className = "skill-chip";
            div.textContent = item.name;
            finderGrid.appendChild(div);
            return;
        }

        const div = document.createElement("div");
        div.className = "finder-file";

        div.innerHTML = `
            <img src="imgs/${item.type === "image" ? "photos-2025-11-14.webp" : "folder.png"}">
            <p>${item.name}</p>
        `;

        div.addEventListener("click", () => {

            // 🔥 Photos App
            if (item.type === "image") {
                openWindow(item.app);
                if (item.app === "photosWin") renderPhotos();
            }

            // 🔥 Image File
            else if (item.type === "app") {
                createAppWindow(item.name, `<img src="/imgs/wal1.jpg" style="width:50%;">`);
            }

            // 🔥 Normal File
            else if (item.type === "file") {
                createAppWindow(item.name, `<p>${item.content}</p>`);
            }

        });

        finderGrid.appendChild(div);
    });
}

sideItems.forEach(item => {
    item.addEventListener("click", function(){
        sideItems.forEach(i => i.classList.remove("active"));
        this.classList.add("active");
        renderFinder(this.dataset.folder);
    });
});

renderFinder("desktop");

// let browserInput = document.getElementById("browserInput");
// let browserFrame = document.getElementById("browserFrame");
// let goBtn = document.getElementById("goBtn");

// goBtn.addEventListener("click", () => {
//     let value = browserInput.value.trim();


//     if (!value.includes(".") && !value.startsWith("http")) {
//         browserFrame.src = "https://www.bing.com/search?q=" + encodeURIComponent(value);
//         return;
//     }
//     if (!value.startsWith("http")) {
//         value = "https://" + value;
//     }
//     browserFrame.src = value;

//     setTimeout(() => {
//         try {
//             if (!browserFrame.contentWindow.location.href) {
//                 window.open(value, "_blank");
//             }
//         } catch (e) {
//             window.open(value, "_blank");
//         }
//     }, 2000);
// });






changeWal();

window.addEventListener("resize", changeWal);
let resizeTimeout;

window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(changeWal, 200);
});

const dayText = document.getElementById("dayText");
const dateText = document.getElementById("dateText");
const timeText = document.getElementById("timeText");

function updateTopbarClock() {
    const now = new Date();

    const day = new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(now);
    const date = new Intl.DateTimeFormat("en-US", {
        day: "numeric",
        month: "short"
    }).format(now);
    const time = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit"
    }).format(now).replace(" ", "");

    dayText.textContent = day;
    dateText.textContent = date;
    timeText.textContent = time;
}

updateTopbarClock();
setInterval(updateTopbarClock, 1000);