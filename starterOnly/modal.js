// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const form = document.querySelector("form");
const modalBody = document.querySelector(".modal-body");

// Responsive
function editNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

// -----MODAL-----
// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
    modalbg.style.display = "block";
}

// close modal form
function closeModal() {
    modalbg.style.display = "none";
}

// create the modal after form
function validationModal() {
    const validMessage = document.createElement("p");
    const closeModalButton = document.createElement("button");

    form.style.display = "none";

    modalBody.setAttribute("data-validation", true);
    modalBody.appendChild(validMessage);
    modalBody.appendChild(closeModalButton);

    validMessage.setAttribute("class", "valid-message");
    validMessage.textContent = "Merci pour votre inscription";

    closeModalButton.setAttribute("class", "button modal-btn btn-close");
    closeModalButton.setAttribute("onclick", "closeModal()");
    closeModalButton.textContent = "Fermer";
}

// ------FORM-------
// Inputs
const locationInput = document.querySelectorAll(`input[name="location"]`);
const inputs = document.querySelectorAll(
    `input[type='text'], input[type='number'], input[type='email'], input[type='quantity'], input[type='checkbox'], input[type='date']`
);

// Create a function that define a template for error message
function displayError(input, message, valid) {
    // Display an error in a pseudo element :after
    if (!valid) {
        input.parentElement.setAttribute("data-error-visible", true);
        input.parentElement.setAttribute("data-error", message);
    } else {
        input.parentElement.setAttribute("data-error-visible", false);
        input.parentElement.removeAttribute("data-error");
    }
}

// Define error variable with default value
let firstNameError,
    lastNameError,
    emailError,
    birthdateError,
    quantityError,
    locationError,
    checkboxError;

// Differents style of regex inside variables
const nameRegex = /^[a-zA-Z0-9_.-éëèïôÿ]*$/;
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const birthdateRegex =
    /(200[0-4]|19[2-9]\d)\-(1[0-2]|0[1-9])\-(3[0-1]|[0-2]\d)/;
const quantityRegex = /[0-9]{1,}/;

// Validate firstName
function firstNameChecker(value) {
    if (value == "") {
        displayError(firstName, "Veuillez indiquer votre prénom");
        firstNameError = false;
    } else if (value.length < 2) {
        displayError(
            firstName,
            "Veuillez entrer 2 caractères ou plus pour le champ du prénom."
        );
        firstNameError = false;
    } else if (nameRegex.test(value) === false) {
        displayError(firstName, "Le prénom contient des caractères invalide");
        firstNameError = false;
    } else {
        displayError(firstName, "", true);
        firstNameError = true;
    }
}

// Validate lastName
function lastNameChecker(value) {
    if (value == "") {
        displayError(lastName, "Veuillez indiquer votre nom");
        lastNameError = false;
    } else if (value.length < 2) {
        displayError(
            lastName,
            "Veuillez entrer 2 caractères ou plus pour le champ du nom."
        );
        lastNameError = false;
    } else if (nameRegex.test(value) === false) {
        displayError(lastName, "Le nom contient des caractères invalide");
        lastNameError = false;
    } else {
        displayError(lastName, "", true);
        lastNameError = true;
    }
}

// Validate email
function emailChecker(value) {
    if (value == "") {
        displayError(email, "Veuillez indiquer votre email");
        emailError = false;
    } else if (emailRegex.test(value) === false) {
        displayError(
            email,
            "L'email est incomplet et/ou contient des caractères invalide"
        );
        emailError = false;
    } else {
        displayError(email, "", true);
        emailError = true;
    }
}

// Validate birthdate
function birthdateChecker(value) {
    if (value == "") {
        displayError(birthdate, "Veuillez indiquer votre date de naissance");
        birthdateError = false;
    } else if (birthdateRegex.test(value) === false) {
        displayError(
            birthdate,
            "Veuillez indiquer une date de naissance valide"
        );
        birthdateError = false;
    } else {
        displayError(birthdate, "", true);
        birthdateError = true;
    }
}

// Validate quantity
function quantityChecker(value) {
    if (value == "") {
        displayError(quantity, "Veuillez indiquer une quantité");
        quantityError = false;
    } else if (quantityRegex.test(value) === false) {
        displayError(quantity, "Veuillez indiquer une quantité valide");
        quantityError = false;
    } else {
        displayError(quantity, "", true);
        quantityError = true;
    }
}

// Validate city
function cityChecker(value) {
    if (!value.includes(true)) {
        displayError(locationInput[0], "Veuillez indiquer un lieux de tournoi");
        locationError = false;
    } else {
        displayError(locationInput[0], "", true);
        locationError = true;
    }
}

// Validate checkbox
function checkboxChecker(value) {
    if (value == false) {
        displayError(
            checkbox1,
            "Veuillez cocher les conditions d'utilisation pour valider le formulaire"
        );
        checkboxError = false;
    } else {
        displayError(checkbox1, "", true);
        checkboxError = true;
    }
}

// Loop the inputs and put the value in the Checker function
inputs.forEach((input) => {
    input.addEventListener("input", (e) => {
        switch (e.target.id) {
            case "firstName":
                firstNameChecker(e.target.value);
                break;
            case "lastName":
                lastNameChecker(e.target.value);
                break;
            case "email":
                emailChecker(e.target.value);
                break;
            case "birthdate":
                birthdateChecker(e.target.value);
                break;
            case "quantity":
                quantityChecker(e.target.value);
                break;
            case "checkbox1":
                checkboxChecker(e.target.checked);
                break;
            default:
                null;
        }
    });
});

let radioArray = [];

locationInput.forEach((input) => {
    input.addEventListener("input", () => {
        radioArray.push(input.checked);
        cityChecker(radioArray);
    })
});

// Send the form after the submit event
form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Check if any of the error variable have a false type
    if (
        (firstNameError &&
            lastNameError &&
            emailError &&
            birthdateError &&
            quantityError &&
            locationError &&
            checkboxError) == false
    ) {
        console.log("Formulaire refusé !");
    } else {
        validationModal();
        console.log("Formulaire validé !");
    }
});

// Defining a function to validate the form
function validate() {
    
    inputs.forEach((input) => {
        switch (input.id) {
            case "firstName":
                firstNameChecker(input.value);
                break;
            case "lastName":
                lastNameChecker(input.value);
                break;
            case "email":
                emailChecker(input.value);
                break;
            case "birthdate":
                birthdateChecker(input.value);
                break;
            case "quantity":
                quantityChecker(input.value);
                break;
            default:
                null;
        }
    });

    locationInput.forEach((input) => {
        radioArray.push(input.checked);
        cityChecker(radioArray);
    });
}
