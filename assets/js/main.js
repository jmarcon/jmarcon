hljs.initHighlightingOnLoad();

let isDark = false;
function loadTheme() {
    
    var css = document.getElementById("myStyle");
    let theme = localStorage.getItem("theme");
    if(!theme){
        theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light"
        localStorage.setItem("theme", theme);
    }

    css.theme = theme;
    if(theme === "dark") {
        css.href = "/assets/css/maindark.css";
    } else {
        css.href = "/assets/css/main.css";
    }
}

loadTheme();

function cssToggle(e) {
    e.preventDefault();
    let theme = localStorage.getItem("theme");
    if(theme === "dark") {
        localStorage.setItem("theme", "light");
    }else{
        localStorage.setItem("theme", "dark");
    }
    loadTheme()
}