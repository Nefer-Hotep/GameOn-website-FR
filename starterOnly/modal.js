// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const form = document.querySelector("form");

// function editNav() {
//     var x = document.getElementById("myTopnav");
//     if (x.className === "topnav") {
//         x.className += " responsive";
//     } else {
//         x.className = "topnav";
//     }
// }

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

// ------FORM-------
// Define error variable with default value
const formError =
    (firstNameError =
    lastNameError =
    emailError =
    birthdateError =
    quantityError =
    locationError =
    checkboxError =
        true);

// Defining a function to validate the form
function validate() {
    // Retrieving the values of the form and putting it inside variables
    let firstNameFields = firstName.value;
    let lastNameFields = lastName.value;
    let emailFields = email.value;
    let birthdateFields = birthdate.value;
    let quantityFields = quantity.value;
    let locationFields = reserve.location.value;
    let checkboxFields = checkbox1.checked;

    // Differents style of regex inside variables
    const nameRegex = /^[a-zA-Z0-9_.-éëèïôÿ]*$/;
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const birthdateRegex = /\d{4}-\d{2}-\d{2}/;
    const quantityRegex = /[1-9]{1,}/;

    // Validate firstName
    if (firstNameFields == "") {
        console.log("Prénom vide");
        firstNameError = false;
    } else if (firstNameFields.length < 2) {
        console.log("Prénom moins de 2");
        firstNameError = false;
    } else if (nameRegex.test(firstNameFields) === false) {
        console.log("Prénom incorrect");
        firstNameError = false;
    } else {
        console.log("Prénom correct");
        firstNameError = true;
    }

    // Validate lastName
    if (lastNameFields == "") {
        console.log("Nom vide");
        lastNameError = false;
    } else if (lastNameFields.length < 2) {
        console.log("Nom moins de 2");
        lastNameError = false;
    } else if (nameRegex.test(lastNameFields) === false) {
        console.log("Nom incorrect");
        lastNameError = false;
    } else {
        console.log("Nom correct");
        lastNameError = true;
    }

    // Validate email
    if (emailFields == "") {
        console.log("Email vide");
        emailError = false;
    } else if (emailRegex.test(emailFields) === false) {
        console.log("Email incorrect");
        emailError = false;
    } else {
        console.log("Email correct");
        emailError = true;
    }

    // Validate birthdate
    if (birthdateFields == "") {
        console.log("Date vide");
        birthdateError = false;
    } else if (birthdateRegex.test(birthdateFields) === false) {
        console.log("Date incorrect");
        birthdateError = false;
    } else {
        console.log("Date correct");
        birthdateError = true;
    }

    // Validate quantity
    if (quantityFields == "") {
        console.log("Quantité vide");
        quantityError = false;
    } else if (quantityRegex.test(quantityFields) === false) {
        console.log("Quantité incorrect");
        quantityError = false;
    } else {
        console.log("Quantité correct");
        quantityError = true;
    }

    // Validate city
    if (locationFields == "") {
        console.log("Lieux vide");
        locationError = false;
    } else {
        console.log("Lieux sélectionné");
        locationError = true;
    }

    // Validate checkbox
    if (checkboxFields == false) {
        console.log("Veuillez cochez les CGV");
        checkboxError = false;
    } else {
        console.log("CGV validé");
        checkboxError = true;
    }
}

// Send the form
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
        console.log("Formulaire refusé");
    } else {
        console.log("Formulaire envoyé sans refresh de la page");
    }
});
