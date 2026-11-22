var contact_form = document.querySelector(".contact-form"); // Select the contact form element
var inputs = contact_form.querySelectorAll("input, textarea"); // Select all input and textarea elements within the contact form

var message = document.createElement("p"); // Create a new paragraph element to display messages
// style the message element
message.style.color = "white";
message.style.marginTop = "7px";
message.style.padding = "7px 10px";
message.style.fontWeight = "bold";
message.style.textAlign = "center";

// Function to show an error message
function show_error(input , message_text) {
    message.style.backgroundColor = "red";
    message.textContent = message_text;
    input.parentNode.appendChild(message);
}

// An event listener to the contact form for the submit event
contact_form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Check if any input or textarea is empty
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].value.trim() === "") {
            show_error(inputs[i], "هذا الحقل مطلوب."); // Shows directly under whichever box is empty
            return;
        }
    }

    // Validate the email input field
    var emailInput = contact_form.querySelector("input[type='email']"); // Select the email input field
    var emailValue = emailInput.value.trim(); // Get the trimmed value of the email input
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) { // Validate the email format using a regular expression
        show_error(emailInput, "الرجاء إدخال بريد إلكتروني صالح.");
        return;
    }

    // Validate the phone input field
    var phoneInput = contact_form.querySelector("input[type='tel']"); // Select the phone input field
    var phoneValue = phoneInput.value.trim(); // Get the trimmed value of the phone input
    if (!/^\d{10}$/.test(phoneValue)) { // Validate the phone number format (10 digits)
        show_error(phoneInput, "الرجاء إدخال رقم هاتف صالح (10 أرقام).");
        return;
    }

    // If all inputs and textareas are filled, display a success message
    message.style.backgroundColor = "green";
    message.textContent = "تم إرسال بنجاح.";
    contact_form.appendChild(message);
    contact_form.reset();
});