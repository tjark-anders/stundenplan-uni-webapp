const themeToggle = document.querySelector(".theme-toggle")
const body = document.querySelector("body")
const toggleImg = document.querySelector(".toggleImg")

themeToggle.addEventListener("click", function () {
    themeToggle.classList.toggle("active") /** "active" wird den Klassen des Elements hinzugefügt oder entfernt */
    body.classList.toggle("dark")
    if (body.classList.contains("dark")) {
        toggleImg.src = "./assets/icons/moon.svg"
    }
    else {toggleImg.src = "./assets/icons/sun.svg"}
})