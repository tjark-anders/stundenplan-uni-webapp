/* damit senden wir einen HTTP request an den Server.
Da fetch asynchron ist haben wir .then stehen um auf antworten entsprechend
zu reagieren (hier wird die antwort direkt in ein json objekt umgewandelt).

zweites .then behandelt die empfangenden daten konkret
*/

fetch("/api/kurse")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((kurs) => {
      const karte = document.createElement("div");
      karte.className = "kurs-karte";
      karte.innerHTML = `
        <h3>${kurs.name}</h3>
        <p>Dozent: ${kurs.dozent}</p>
        <p>ECTS: ${kurs.ects}</p>
        <button>Hinzufügen</button>
      `;
      document.getElementById("course-selection").appendChild(karte);
      const button = karte.querySelector("button");
      button.onclick = () => {
        const popup = document.getElementById("termin-popup");
        const terminListe = document.getElementById("termin-liste");
        terminListe.innerHTML = ""; // leeren falls schon was drin ist

        kurs.termine.forEach((termin) => {
          const terminButton = document.createElement("button");
          terminButton.onclick = () => {
            const zelle = document.querySelector(
              `td[data-tag="${termin.tag}"][data-block="${termin.block}"]`,
            );
            zelle.textContent = kurs.name;
            document.getElementById("termin-popup").close();
          };
          terminButton.textContent = `${termin.typ} - ${termin.tag} Block ${termin.block}`;
          terminListe.appendChild(terminButton);
        });
        popup.showModal();
      };
      document.getElementById("popup-schliessen").onclick = () => {
        document.getElementById("termin-popup").close();
      };
    });
  });
const themeToggle = document.querySelector(".theme-toggle");
const body = document.querySelector("body");
const toggleImg = document.querySelector(".toggleImg");

themeToggle.addEventListener("click", function () {
  themeToggle.classList.toggle(
    "active",
  ); /** "active" wird den Klassen des Elements hinzugefügt oder entfernt */
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    toggleImg.src = "./assets/icons/moon.svg";
  } else {
    toggleImg.src = "./assets/icons/sun.svg";
  }
});
