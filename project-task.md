Prof. Dr. Grönniger
SoSe 2026 Webtechnologien

- Projektaufgabe -

Bitte aktualisieren Sie das Git-Projekt: https://gitlab.gwdg.de/hans.groenniger01/webtech26
Ziel ist die Entwicklung einer Website zur Konfiguration eines individuellen Stundenplans für ein
Semester. Dazu sollen aus der Liste aller angebotenen Kurse eine Auswahl getroffen werden können,
die dann in einem übersichtlichen Stundenplan angezeigt wird.
Die Daten werden als REST-API zur Verfügung gestellt. Der Endpunkt ist in der Datei server.js
bereits implementiert und Beispieldaten in der Datei data/kurse.json hinterlegt.

1. Entwickeln Sie eine Seite mit einer Übersicht über alle angebotenen Kurse. Entscheiden Sie
selbst, welche Informationen Sie darstellen und welche in der Übersicht weggelassen werden
können.

2. Stellen Sie in der Übersicht eine Möglichkeit zur Auswahl von Kursen zur Verfügung. Bitte
beachten Sie, dass ein Kurs mehrere Termine umfasst. Falls es innerhalb der Termine mehrere
Übungstermine gibt, muss bei der Auswahl ebenfalls ein Übungstermin ausgewählt werden
(z.B. durch ein Pop-up).

3. Nach Abschluss der Auswahl wird ein Stundenplan dargestellt, wobei die Wochentage Montag
bis Freitag und die Blockzeiten dargestellt und mit entsprechendem Termine aus den
gewählten Kursen gefüllt werden. Vorlesungen und Übungen sollen farblich unterschieden
werden. Gehen Sie auch mit Doppelbelegungen um. Detailinformationen zu einem Termin soll
durch Anklicken angezeigt werden. Sie müssen nur eine Woche anzeigen. Optional können Sie
auch einen Plan für das gesamte Semester erstellen und Feiertage und nicht-wöchentliche
Wiederholungen von Terminen berücksichtigen.
Nutzen Sie HTML, CSS und JavaScript. Verwenden Sie kein Webframework wie React oder Angular.
Abgabe: Laden Sie Ihr Projekt bis zum 31.05.26, 23:39 Uhr in Moodle hoch. Zippen Sie den Ordner
projekt/, exkludieren Sie aber in jedem Fall einen node_modules Ordner.
Stellen Sie Ihr Projekt an einem Übungstermin in der KW 23 (1-5.6.26) vor. Hierzu buchen Sie bitte als
Gruppen einen Termin im Moodle-Planer (wird noch eingerichtet). Zur Präsentation müssen alle
Teammitglieder anwesend sein und sämtlicher Quelltext erklärt und modifiziert werden können.