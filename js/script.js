/* damit senden wir einen HTTP request an den Server.
Da fetch asynchron ist haben wir .then stehen um auf antworten entsprechend
zu reagieren (hier wird die antwort direkt in ein json objekt umgewandelt).

zweites .then behandelt die empfangenden daten konkret
*/

fetch("/api/kurse")

    .then((response) => response.json())

    .then((data) => {


        data.forEach((kurs) => { //makes a new card for each json-Element

            const karte = document.createElement("div"); //creates a card (HTML)
            karte.className = "kurs-karte";
            karte.innerHTML = `
        <h3>${kurs.name}</h3>
        <p>Dozent: ${kurs.dozent}</p>
        <p>ECTS: ${kurs.ects}</p>
        <button>Hinzufügen</button>
        <button>Hinzufügen</button>
      `;
            document.getElementById("course-selection").appendChild(karte);


            const button = karte.querySelector("button");

            button.onclick = () => {  //add course Button functionality

                const popup = document.getElementById("termin-popup");
                const terminListe = document.getElementById("termin-liste");
                terminListe.innerHTML = ""; // leeren falls schon was drin ist

                kurs.termine.forEach((termin) => { //creates all button-selection-options for the selected course

                    const terminButton = document.createElement("button");

                    terminButton.textContent = `${termin.typ} - ${termin.tag} Block ${termin.block}`;
                    terminListe.appendChild(terminButton);

                    terminButton.onclick = () => {  //adds selection to the timetable
                        const zelle = document.querySelector(
                            `td[data-tag="${termin.tag}"][data-block="${termin.block}"]`,
                        );

                        checkContent(kurs.name, zelle);

                        document.getElementById("termin-popup").close();

                    };

                });

                popup.showModal();

            };

            document.getElementById("popup-schliessen").onclick = () => {
                document.getElementById("termin-popup").close();
            };


        });

    });


/*
Dark-/Lightmode implementation with Button interaction
 */
const themeToggle = document.querySelector(".theme-toggle");
const body = document.querySelector("body");
const toggleImg = document.querySelector(".toggleImg");

themeToggle.addEventListener("click", function () {
    themeToggle.classList.toggle(
        "active",
    );
    /** "active" wird den Klassen des Elements hinzugefügt oder entfernt */
    body.classList.toggle("dark");
    if (body.classList.contains("dark")) {
        toggleImg.src = "./assets/icons/moon.svg";
    } else {
        toggleImg.src = "./assets/icons/sun.svg";
    }
});


/*
Checks whether a course was already added or if it's a new element in the table
 */
function checkContent(kursName, content) {
    let innerContent = content.querySelectorAll("p");
    let sameElementExists = false;
    let thereIsAtLeastOneElement = innerContent.length > 0;


    innerContent.forEach((element) => { //searches whether the same element that will  be added is in the table or if the table already has at least one element
        if (element.textContent === kursName) {
            sameElementExists = true;
        }
    });

    if (sameElementExists) { //if the element added is already in the table: do nothing
        return;
    }

    if (thereIsAtLeastOneElement) { //if there is at least one other Element inside the table slot: display warning
        let proceed = confirm("Du hast zu dieser Zeit schon etwas im Studenplan. Willst du den Kurs trotzdem hinzufügen?");

        if (!proceed) {
            return;
        }
    }

    content.innerHTML += `<p>${kursName}</p>`;

}
