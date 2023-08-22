document.addEventListener("DOMContentLoaded", function () {
    // Überprüfe, ob der Benutzer angemeldet ist
    fetch("backend/check_login.php")
        .then((response) => response.json())
        .then((data) => {
            if (data.logged_in) {
                fetchUserData();
            }
        })
        .catch((error) => {
            console.error("Fehler beim Überprüfen der Anmeldung: ", error);
        });

    document
        .querySelector("#save-button")
        ?.addEventListener("click", function (event) {
            event.preventDefault();
            if (validateForm()) {
                saveUserData();
            }
        });

    document
        .querySelector("#login-button")
        ?.addEventListener("click", function (event) {
            event.preventDefault();
            if (validateLoginForm()) {
                loginUser();
            }
        });

    function saveUserData() {
        const form = document.querySelector(".user-info > form");
        const formData = new FormData(form);

        fetch("backend/save.php", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    alert(data.message);
                    window.location.href = "login.html"; // Weiter zur Login-Seite
                } else {
                    alert(data.message);
                }
            })
            .catch((error) => {
                console.error("Fehler beim Senden der Daten:\n", error);
            });
    }

    function loginUser() {
        const loginForm = document.querySelector(".user-info > form");
        const formData = new FormData(loginForm);

        fetch("backend/login.php", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    alert(data.message);
                    window.location.href = "index.html"; // Weiter zur Hauptseite
                } else {
                    alert(data.message);
                }
            })
            .catch((error) => {
                console.error("Fehler beim Anmelden:\n", error);
            });
    }

    function fetchUserData() {
        fetch("backend/get_user_data.php")
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    displayUserData(data.userData);
                }
            })
            .catch((error) => {
                console.error("Fehler beim Abrufen der Daten: ", error);
            });
    }

    function displayUserData(userData) {
        const usernameElement = document.getElementById("username");
        const emailElement = document.getElementById("email");
        const passwortElement = document.getElementById("password");
        const strasseElement = document.getElementById("street");
        const plzElement = document.getElementById("plz");
        const ortElement = document.getElementById("location");
        const bildElement = document.getElementById("profile_picture");


        if (userData.profile_picture === "Bild_1") {
            bildElement.src = "Bild_1.jpg"
        }
        if (userData.profile_picture === "Bild_2") {
            bildElement.src = "Bild_2.jpg"
        }
        usernameElement.textContent = userData.username;
        emailElement.textContent = userData.email;
        passwortElement.textContent = "******"; // Passwort nicht direkt anzeigen
        strasseElement.textContent = userData.street;
        plzElement.textContent = userData.plz;
        ortElement.textContent = userData.location;
    }

    function validateForm() {
        const usernameInput = document.querySelector("#username");
        const emailInput = document.querySelector("#email");
        const plzInput = document.querySelector("#plz");

        if (!validateUsername(usernameInput.value)) {
            alert("Bitte geben Sie einen gültigen Benutzernamen ein.");
            return false;
        }

        if (!validateEmail(emailInput.value)) {
            alert("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
            return false;
        }

        if (!validatePLZ(plzInput.value)) {
            alert("Bitte geben Sie eine gültige 5-stellige Postleitzahl ein.");
            return false;
        }

        return true;
    }

    function validateLoginForm() {
        const usernameInput = document.querySelector("#username");
        const passwordInput = document.querySelector("#password");

        if (!validateUsername(usernameInput.value)) {
            alert("Bitte geben Sie einen gültigen Benutzernamen ein.");
            return false;
        }

        if (!validatePassword(passwordInput.value)) {
            alert("Bitte geben Sie ein gültiges Passwort ein.");
            return false;
        }

        return true;
    }

    function validateUsername(username) {
        return username != null && username != "";
    }

    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    function validatePLZ(plz) {
        const plzPattern = /^\d{5}$/;
        return plzPattern.test(plz);
    }

    function validatePassword(password) {
        return password != null && password != "";
    }
});
