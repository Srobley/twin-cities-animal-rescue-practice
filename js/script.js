// automatically select Adopt on form if clicked adopt now btn

if (window.location.search === "?adoption") {
    document.querySelector("input[value='adoption']").checked = true;
}

// validate first name, last name, and email on contact form

const form = document.querySelector("#contact");

const firstName = document.querySelector("#first_name");
const firstNameError = document.querySelector("#first_name_error");

const lastName = document.querySelector("#last_name");
const lastNameError = document.querySelector("#last_name_error")

const email = document.querySelector("#email");
const emailError = document.querySelector("#email_error");

function validateName(input, error, fieldName) {
    const name = input.value.trim();
    
    if (name === "") {
        error.textContent = `Please enter your ${fieldName}.`;
    } else if (name.length < 2) {
        error.textContent = "Please enter at least 2 characters.";
    } else {
        error.textContent = "";
    }
}
if (form && firstName && firstNameError) { 
    firstName.addEventListener("blur", function () {
        validateName(firstName, firstNameError, "first name");
    });
}
if (form && lastName && lastNameError) { 
        lastName.addEventListener("blur", function () {
        validateName(lastName, lastNameError, "last name");
    });
}
if (form && email && emailError) { 
    email.addEventListener("blur", function () {
        if (email.validity.valueMissing) {
            emailError.textContent = "Please enter your email address.";
        } else if (email.validity.typeMismatch) {
            emailError.textContent = "Please enter a valid email address.";
        } else {
            emailError.textContent = "";
        }
    });
}

// use session storage to store form data on page load

function rememberTextField(input, storageKey) {
    const savedValue = sessionStorage.getItem(storageKey);
    if (savedValue !== null) {
        input.value = savedValue;
    }

    input.addEventListener("input", function () {
        sessionStorage.setItem(storageKey, input.value);
    });
}

rememberTextField(firstName, "first_name");
rememberTextField(lastName, "last_name");
rememberTextField(email, "email");

// store button selection for contact interest 

const interestOptions = document.querySelectorAll('input[name="contact"]');
const savedInterest = sessionStorage.getItem("contact_interest");

interestOptions.forEach(function (option) {
    if (window.location.search !== "?adoption") {
        if (option.value === savedInterest) {
            option.checked = true;
        }
    }

    option.addEventListener("change", function () {
        sessionStorage.setItem("contact_interest", option.value);
    });
});

if (window.location.search === "?adoption") {
    sessionStorage.setItem("contact_interest", "adoption");
}

// store button selection for if you've owned a pet before

const ownershipOptions = document.querySelectorAll('input[name="previousOwner"]');
const savedOwnership = sessionStorage.getItem("previous_owner");

ownershipOptions.forEach(function (option) {
    if (option.value === savedOwnership) {
        option.checked = true;
    }

    option.addEventListener("change", function () {
        sessionStorage.setItem("previous_owner", option.value);
    });
});