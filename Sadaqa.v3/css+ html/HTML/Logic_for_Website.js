var contact_form = document.querySelector(".contact-form"); // Select the contact form element
var inputs = contact_form.querySelectorAll("input, textarea"); // Select all input and textarea elements within the contact form

var message = document.createElement("p"); // Create a new paragraph element to display messages
// style the message element
message.style.color = "white";
message.style.marginTop = "15px";
message.style.fontWeight = "bold";

// An event listener to the contact form for the submit event
contact_form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior
    // Check if any input or textarea is empty
    for (i = 0; i < inputs.length; i++) {
        // If any input or textarea is empty, display an error message and return
        if (inputs[i].value === "") {
            message.style.backgroundColor = "red";
            message.textContent = "الرجاء ملء جميع الحقول قبل الإرسال.";
            contact_form.appendChild(message);
            return;
        }
    }

    // If all inputs and textareas are filled, display a success message
    message.style.backgroundColor = "green";
    message.textContent = "تم إرسال بنجاح.";
    contact_form.appendChild(message);
    contact_form.reset();
});