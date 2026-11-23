// 6: Contact us
var contact_form = document.querySelector(".contact-form"); // Select the contact form element
var inputs = contact_form.querySelectorAll("input, textarea"); // Select all input and textarea elements within the contact form

var message = document.createElement("p"); // Create a new paragraph element to display messages
// style the message element
message.style.marginTop = "7px";
message.style.padding = "7px 10px";
message.style.fontWeight = "bold";
message.style.textAlign = "center";

// Function to show an error message
function show_error(input , message_text) {
    message.style.color = "red";
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
    message.style.color = "green";
    message.textContent = "تم إرسال بنجاح.";
    contact_form.appendChild(message);
    contact_form.reset();
});


// 7: Admin
// Select the elements for active, request list, and inactive requests
var active_requests = document.getElementById("activeRequests");
var pending_requests = document.getElementById("pendingRequests");
var inactive_requests = document.getElementById("inactiveRequests");

// Count the number of active, pending, and inactive requests
function number_of_requests() {
    var active_count = active_requests.querySelectorAll(".admin-campaign-item").length;
    var pending_count = pending_requests.querySelectorAll(".admin-campaign-item").length;
    var inactive_count = inactive_requests.querySelectorAll(".admin-campaign-item").length;
}

number_of_requests(); // Call the function to count the requests

// Select all approve and reject buttons
var approve_buttons = document.querySelectorAll(".approve-btn");
var reject_buttons = document.querySelectorAll(".reject-btn");

// Event listener to the approve buttons
approve_buttons.forEach(function (button) {
    button.addEventListener("click", function () {
        var request_item = button.closest(".admin-campaign-item"); // Get the closest parent element with the class "admin-campaign-item"
        var action = request_item.querySelector(".admin-campaign-actions"); // Select the actions section (approve/reject) within the request item
        if (action) {
            action.remove(); // Remove the actions section (approve/reject) from the request item
        }
        active_requests.appendChild(request_item); // Move the request item to the active requests section
        number_of_requests(); // Update the request counts
    });
});

// Event listener to the reject buttons
reject_buttons.forEach(function (button) {
    button.addEventListener("click", function () {
        var request_item = button.closest(".admin-campaign-item"); // Get the closest parent element with the class "admin-campaign-item"
        var action = request_item.querySelector(".admin-campaign-actions"); // Select the actions section (approve/reject) within the request item
        if (action) {
            action.remove(); // Remove the actions section (approve/reject) from the request item
        }
        inactive_requests.appendChild(request_item); // Move the request item to the inactive requests section
        number_of_requests(); // Update the request counts
    });
});

// Select all activate and deactivate buttons
var activate_buttons = document.querySelectorAll(".activate-btn");
var deactivate_buttons = document.querySelectorAll(".deactivate-btn");

// Event listener to the activate buttons
activate_buttons.forEach(function (button) {
    button.addEventListener("click", function () {
        var request_item = button.closest(".admin-campaign-item"); // Get the closest parent element with the class "admin-campaign-item"
        var action = request_item.querySelector(".admin-campaign-actions"); // Select the actions section (activate/deactivate) within the request item
        if (action) {
            action.remove(); // Remove the actions section (activate/deactivate) from the request item
        }
        if (request_item.parentNode === inactive_requests) {
            active_requests.appendChild(request_item); // Move the request item to the active requests section
        }
        number_of_requests(); // Update the request counts
    });
});

// Event listener to the deactivate buttons
deactivate_buttons.forEach(function (button) {
    button.addEventListener("click", function () {
        var request_item = button.closest(".admin-campaign-item"); // Get the closest parent element with the class "admin-campaign-item"
        var action = request_item.querySelector(".admin-campaign-actions"); // Select the actions section (activate/deactivate) within the request item
        if (action) {
            action.remove(); // Remove the actions section (activate/deactivate) from the request item
        }
        if (request_item.parentNode === active_requests) {
            inactive_requests.appendChild(request_item); // Move the request item to the inactive requests section
        }
        number_of_requests(); // Update the request counts
    });
});