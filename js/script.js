let alleKurse = [];

/* damit senden wir einen HTTP request an den Server.
Da fetch asynchron ist haben wir .then stehen um auf antworten entsprechend
zu reagieren (hier wird die antwort direkt in ein json objekt umgewandelt).

zweites .then behandelt die empfangenden daten konkret
*/
fetch("/api/kurse")

    .then((response) => response.json())

    .then((data) => {

        alleKurse = data;

        data.forEach((kurs) => { //makes a new card for each json-Element
            const karte = document.createElement("div"); //creates a card (HTML)
            karte.className = "kurs-karte";
            karte.innerHTML = `
                <h3>${kurs.name}</h3>
                <p>Dozent: ${kurs.dozent}</p>
                <p>ECTS: ${kurs.ects}</p>
                <button class="course-sel-button add-button">Hinzufügen</button>
                <button class="course-sel-button info-button">Info</button>
      `;
            document.getElementById("course-selection").appendChild(karte);

            /* Add Button */
            const button = karte.querySelector(".add-button");

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

                        checkContent(kurs, termin, zelle);

                        document.getElementById("termin-popup").close();

                    };

                });

                popup.showModal();

            };

            /* Info Button */
            const infoButton = karte.querySelector(".info-button");

            infoButton.onclick = () => {

                const popup = document.getElementById("info-popup");
                const description = document.getElementById("course-description");
                description.textContent = `${kurs.beschreibung}`;

                popup.showModal();

            }

            document.getElementById("popup-schliessen").onclick = () => {
                document.getElementById("termin-popup").close();
            };

            document.getElementById("info-popup-schliessen").onclick = () => {

                document.getElementById("info-popup").close();

            };

        });

    });
timetableInfo();

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
Handles click on timetable entry and opens course popup with details
*/
function timetableInfo() {

    document.querySelector(".schedule-table").addEventListener("click", (event) => {
        const contains = event.target.classList.contains("elementImStundenplan");

        if (!contains) {
            return;
        }

        let element = event.target;

        const kursId = element.dataset.kursId;
        const terminId = element.dataset.terminId;

        const kurs = alleKurse.find(currentKurs => {
            return currentKurs.id == kursId;
        });

        const termin = kurs.termine.find(currentTermin => {
            return currentTermin.id == terminId;
        });


        const description = document.getElementById("course-description");
        description.innerHTML = `
        <p>Kurs: ${kurs.name}</p>
        <p>Dozent: ${kurs.dozent}</p>
        <p>Typ: ${termin.typ}</p>
        <p>Tag: ${termin.tag} Block ${termin.block}</p>
        <p>Wiederholung: ${termin.wiederholung}</p>
        <p>Raum: ${termin.raum}</p>
    `;

        document.getElementById("info-popup").showModal();

    });
}

/*
Checks whether a course was already added or if it's a new element in the table
 */
function checkContent(kurs, selectedDay, content) {
    let innerContent = content.querySelectorAll("p");
    let sameElementExists = false;
    let thereIsAtLeastOneElement = innerContent.length > 0;

    let kursTyp = normalizeCourseType(selectedDay.typ).toUpperCase();
    let kursFullText = kursTyp + ": " + kurs.name;

    innerContent.forEach((element) => { //searches whether the same element that will  be added is in the table or if the table already has at least one element
        if (element.textContent === kursFullText) {
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

    const p = document.createElement("p"); //adds new course to table
    p.textContent = kursFullText;
    p.classList.add("elementImStundenplan");
    p.classList.add(kursTyp.toLowerCase());
    p.dataset.kursId = kurs.id;
    p.dataset.terminId = selectedDay.id;
    content.appendChild(p);

}

/*
makes course-type uniform and standardized
 */
function normalizeCourseType(typ) {
    switch (typ) {
        case "Vorlesung":
            return "vl";
        case "Übung":
            return "ue";
        case "Tutorium":
            return "tut";
        default:
            return "";
    }
}