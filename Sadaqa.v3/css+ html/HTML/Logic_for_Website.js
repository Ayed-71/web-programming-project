// 6: Contact us
if (window.location.pathname.endsWith("contact-us.html")) {
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
}


// 7: Admin
if (window.location.pathname.endsWith("admin.html")) {
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

    // Function to update the button in the request item based on the target state
    update_card_button = function (request_item, target_state) {
        var action = request_item.querySelector(".admin-request-actions");// Select the actions section (approve/reject or activate/deactivate) within the request item
        action.innerHTML = ""; // Clear old button(s)

        var new_btn = document.createElement("button");// Create a new button element
        new_btn.type = "button";// Set the button type to "button"

        // Determine the target state based on the current status
        if (target_state === "active") {
            new_btn.className = "deactivate-btn";// Set the button class to "deactivate-btn"
            new_btn.textContent = "إلغاء نشاط الحملة"; // Set the button text to "Deactivate Campaign"
            // Add an event listener to the button to move the request item to the inactive requests section when clicked
            new_btn.addEventListener("click", function () {
                inactive_requests.appendChild(request_item);// Move the request item to the inactive requests section
                update_card_button(request_item, "inactive");// Update the button to show "Activate" instead of "Deactivate"
                number_of_requests();// Update the request counts
            });
        } else if (target_state === "inactive") {
            new_btn.className = "activate-btn";// Set the button class to "activate-btn"
            new_btn.textContent = "تنشيط الحملة";// Set the button text to "Activate Campaign"
            // Add an event listener to the button to move the request item to the active requests section when clicked
            new_btn.addEventListener("click", function () {
                active_requests.appendChild(request_item);// Move the request item to the active requests section
                update_card_button(request_item, "active");// Update the button to show "Deactivate" instead of "Activate"
                number_of_requests();// Update the request counts
            });
        }
        // Append the new button to the actions section of the request item
        action.appendChild(new_btn);
    }

    // Select all approve and reject buttons
    var approve_buttons = document.querySelectorAll(".approve-btn");
    var reject_buttons = document.querySelectorAll(".reject-btn");

    // Event listener to the approve buttons
    approve_buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            var request_item = button.closest(".admin-campaign-item"); // Get the closest parent element with the class "admin-campaign-item"
            var action = request_item.querySelector(".admin-request-actions"); // Select the actions section (approve/reject) within the request item
            update_card_button(request_item, "active"); // Update the button to show "Activate" instead of "approve/reject"
            active_requests.appendChild(request_item); // Move the request item to the active requests section
            number_of_requests(); // Update the request counts
        });
    });

    // Event listener to the reject buttons
    reject_buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            var request_item = button.closest(".admin-campaign-item"); // Get the closest parent element with the class "admin-campaign-item"
            var action = request_item.querySelector(".admin-request-actions"); // Select the actions section (approve/reject) within the request item
            update_card_button(request_item, "inactive"); // Update the button to show "Deactivate" instead of "approve/reject"
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
            var action = request_item.querySelector(".admin-request-actions"); // Select the actions section (activate/deactivate) within the request item
            active_requests.appendChild(request_item); // Move the request item to the inactive requests section
            update_card_button(request_item, "active"); // Update the button to show "Deactivate" instead of "Activate"
            number_of_requests(); // Update the request counts
        });
    });

    // Event listener to the deactivate buttons
    deactivate_buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            var request_item = button.closest(".admin-campaign-item"); // Get the closest parent element with the class "admin-campaign-item"
            var action = request_item.querySelector(".admin-request-actions"); // Select the actions section (activate/deactivate) within the request item
            inactive_requests.appendChild(request_item); // Move the request item to the active requests section
            update_card_button(request_item, "inactive"); // Update the button to show "Activate" instead of "Deactivate"
            number_of_requests(); // Update the request counts
        });
    });
}

//8-Add-campaign
if (window.location.pathname.endsWith("add-campaign.html")) {
    var add_campaign_form = document.querySelector(".campaign-form"); // Select the add campaign form element
    var inputs = add_campaign_form.querySelectorAll("input, select, textarea"); // Select all input, select, and textarea elements within the add campaign form
    var cost_input = document.querySelector("#campaignGoal"); // Select the cost input field

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

    // Function to validate the cost input field
    function validate_cost_input() {
        var cost_value = cost_input.value.trim(); // Get the trimmed value of the cost input
        if (!/^\d+(\.\d{1,2})?$/.test(cost_value) || cost_value === "" || parseFloat(cost_value) <= 0) { // Validate the cost format (number with up to 2 decimal places) and check if it's empty or less than or equal to 0
            show_error(cost_input, "الرجاء إدخال قيمة صحيحة (رقم مع ما يصل إلى منزلتين عشريتين).");
            return false;
        }
        return true;
    }

    // An event listener to the cost input field for the input event
    cost_input.addEventListener("blur", function () {
        if (cost_input.value.trim() !== "") {
            validate_cost_input(); // Validate the cost input field on every input event
            }
        });

    // An event listener to the contact form for the submit event
    add_campaign_form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the default form submission behavior

        // Check if any input or textarea is empty
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].value.trim() === "") {
                show_error(inputs[i], "هذا الحقل مطلوب."); // Shows directly under whichever box is empty
                return;
            }
        }

        // Validate the cost input field
        if (!validate_cost_input()) {
            return;
        }

        // If all inputs and textareas are filled, display a success message
        message.style.color = "green";
        message.textContent = "تم إرسال بنجاح.";
        add_campaign_form.appendChild(message);
        add_campaign_form.reset();
    });
}