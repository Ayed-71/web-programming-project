// 6: Contact us
if (window.location.pathname.endsWith("/contact-us.html")) {
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
if (window.location.pathname.endsWith("/admin.html")) {
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

//8: Admin Add-campaign
if (window.location.pathname.endsWith("/add-campaign.html")) {
    var add_campaign_form = document.querySelector(".campaign-form"); // Select the add campaign form element
    var inputs = add_campaign_form.querySelectorAll("input, select, textarea"); // Select all input, select, and textarea elements within the add campaign form

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
        input.focus();
    }

    // An event listener to the contact form for the submit event
    add_campaign_form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the default form submission behavior

        // Check if any input or textarea is empty
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].value.trim() === "") {
                show_error(inputs[i], "هذا الحقل مطلوب."); // Shows directly under whichever box is empty
                return;
            }

            // Check if the field is a number and less than or equal to zero
            if (inputs[i].type === "number" && Number(inputs[i].value) <= 0) {
                show_error(inputs[i], "يرجى إدخال مبلغ صحيح أكبر من صفر.");
                return;
            }
        }

        // If all inputs and textareas are filled, display a success message
        message.style.color = "green";
        message.textContent = "تم إضافة الحملة بنجاح.";
        add_campaign_form.appendChild(message);
        add_campaign_form.reset();
    });
}

// 9: My-campaigns
if (window.location.pathname.endsWith("/my-campaigns.html")) {
    // Select the three buttons by ID
    var active_btn = document.getElementById("activeBtn");
    var pending_btn = document.getElementById("pendingBtn");
    var inactive_btn = document.getElementById("inactiveBtn");

    // Select the three campaign content boxes by ID
    var active_box = document.getElementById("activeBox");
    var pending_box = document.getElementById("pendingBox");
    var inactive_box = document.getElementById("inactiveBox");

    // Function to hide all boxes and deactivate all buttons
    function hide_all_campaigns() {
        active_btn.classList.remove("active");
        pending_btn.classList.remove("active");
        inactive_btn.classList.remove("active");

        active_box.classList.remove("active-content");
        pending_box.classList.remove("active-content");
        inactive_box.classList.remove("active-content");
    }

    // Event listener for Active campaigns button
    active_btn.addEventListener("click", function () {
        hide_all_campaigns(); // Hide all boxes first
        active_btn.classList.add("active"); // Highlight active button
        active_box.classList.add("active-content"); // Show active campaigns box
    });

    // Event listener for Pending campaigns button
    pending_btn.addEventListener("click", function () {
        hide_all_campaigns(); // Hide all boxes first
        pending_btn.classList.add("active"); // Highlight pending button
        pending_box.classList.add("active-content"); // Show pending campaigns box
    });

    // Event listener for Inactive campaigns button
    inactive_btn.addEventListener("click", function () {
        hide_all_campaigns(); // Hide all boxes first
        inactive_btn.classList.add("active"); // Highlight inactive button
        inactive_box.classList.add("active-content"); // Show inactive campaigns box
    });
}

// 10: User Add-campaign
if (window.location.pathname.endsWith("/user-add-campaign.html")) {
    var user_add_campaign_form = document.querySelector(".campaign-form"); // Select the user add campaign form element
    var inputs = user_add_campaign_form.querySelectorAll("input,select,textarea"); // Select all required input, select, and textarea elements within the user add campaign form

    // Create a new paragraph element to display messages
    var message = document.createElement("p");
    message.style.marginTop = "7px";
    message.style.padding = "7px 10px";
    message.style.fontWeight = "bold";
    message.style.textAlign = "center";

    // Function to show an error message
    function show_error(input, message_text) {
        message.style.color = "red";
        message.textContent = message_text;
        input.parentNode.appendChild(message);
        input.focus();
    }

    // An event listener to the user add campaign form for the submit event
    user_add_campaign_form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the default form submission behavior

        // Check if any required input, select, or textarea is empty or invalid
        for (var i = 0; i < inputs.length; i++) {
            var field = inputs[i];

            // Check if the field is empty
            if (field.value.trim() === "") {
                show_error(field, "هذا الحقل مطلوب.");
                return;
            }

           // Check if the field is a number and less than or equal to zero
            if (field.type === "number" && Number(field.value) <= 0) {
                show_error(field, "يرجى إدخال مبلغ صحيح أكبر من صفر.");
                return;
            }
        }

        // If all required inputs, selects, and textareas are filled and valid, display a success message
        message.style.color = "green";
        message.textContent = "تم إضافة الحملة بنجاح.";
        user_add_campaign_form.appendChild(message);
        user_add_campaign_form.reset();
    });
}


// تفاعلات صفحات التبرع والحساب
;(() => {
    const pages = ["login.html", "signup.html", "homepage.html",
        "cart.html", "profile.html", "checkout.html"];
    const page = window.location.pathname.split("/").pop();
    if (!pages.includes(page)) return;

    // بيانات الحملات
    const campaigns = {
        mosque: { name: "حملة بناء مسجد الغفران", category: "ترميم مساجد", image: "mosque.png" },
        "school-water": { name: "توفير برادات ماء للمدارس", category: "سقيا ماء", image: "water.png" },
        "ramadan-food": { name: "سلة رمضان الغذائية", category: "توفير الطعام للمساكين", image: "food.png" }
    };

    // مفاتيح التخزين وتنسيق المبالغ
    const cartKey = "sadaqa.cart";
    const profileKey = "sadaqa.profile";
    const money = new Intl.NumberFormat("en-SA", { maximumFractionDigits: 2 });

    // قراءة البيانات المحفوظة
    function readData(key, fallback) {
        try {
            return JSON.parse(localStorage.getItem(key)) ?? fallback;
        } catch {
            return fallback;
        }
    }

    // رسائل الحالة
    function showStatus(region, message, isError = false) {
        region.textContent = message;
        region.style.marginBlock = "10px";
        region.style.color = isError ? "#9b2525" : "var(--primary)";
    }

    // البحث الفوري
    function setupCampaignSearch() {
        const input = document.querySelector(".search-input");
        if (!input) return;

        input.setAttribute("aria-label", "ابحث عن حملة");
        input.autocomplete = "off";
        const suggestions = document.createElement("div");
        suggestions.className = "campaign-suggestions";
        suggestions.hidden = true;
        suggestions.setAttribute("aria-label", "اقتراحات البحث");

        // تنسيق قائمة الاقتراحات
        input.parentElement.style.position = "relative";
        Object.assign(suggestions.style, {
            position: "absolute",
            insetInline: "0",
            top: "calc(100% + 6px)",
            zIndex: "1002",
            backgroundColor: "var(--white)",
            border: "1px solid var(--border-light)",
            borderRadius: "12px",
            boxShadow: "0 10px 20px rgba(0, 0, 0, .1)",
            overflow: "hidden"
        });
        input.after(suggestions);

        // تهيئة نص البحث
        const normalize = text => text.trim().toLowerCase()
            .replace(/[\u064B-\u065F\u0670ـ]/g, "")
            .replace(/[أإآ]/g, "ا");

        // تنسيق نتائج البحث
        function styleSuggestion(element) {
            Object.assign(element.style, {
                display: "block",
                padding: "8px 12px",
                margin: "0",
                color: "var(--primary)"
            });
        }

        // عرض الاقتراحات
        function renderSuggestions() {
            const query = normalize(input.value);
            suggestions.replaceChildren();
            suggestions.hidden = !query;
            if (!query) return;

            const matches = Object.entries(campaigns)
                .filter(([, campaign]) => normalize(campaign.name).includes(query))
                .slice(0, 4);

            for (const [id, campaign] of matches) {
                const link = document.createElement("a");
                link.href = `homepage.html#${id}`;
                link.textContent = campaign.name;
                styleSuggestion(link);
                suggestions.append(link);
            }

            if (!matches.length) {
                const message = document.createElement("p");
                message.setAttribute("role", "status");
                message.textContent = "ما فيه حملة مطابقة.";
                styleSuggestion(message);
                suggestions.append(message);
            }
        }

        // تحديث الاقتراحات
        input.addEventListener("input", renderSuggestions);
        input.addEventListener("focus", renderSuggestions);
        input.addEventListener("keydown", event => {
            const firstMatch = suggestions.querySelector("a");
            if (suggestions.hidden || !firstMatch) return;
            if (event.key === "ArrowDown") {
                event.preventDefault();
                firstMatch.focus();
            }
            if (event.key === "Enter") firstMatch.click();
        });
        // إغلاق الاقتراحات
        input.parentElement.addEventListener("keydown", event => {
            if (event.key !== "Escape" || suggestions.hidden) return;
            input.focus();
            suggestions.hidden = true;
        });
        input.parentElement.addEventListener("focusout", event => {
            if (!input.parentElement.contains(event.relatedTarget)) suggestions.hidden = true;
        });
        document.addEventListener("pointerdown", event => {
            if (!input.parentElement.contains(event.target)) suggestions.hidden = true;
        });
    }

    // فلترة الحملات
    function setupCampaignFilter() {
        const button = document.querySelector("#filterToggle");
        const menu = document.querySelector("#filterMenu");
        if (!button || !menu) return;

        const cards = document.querySelectorAll(".campaigns-grid [data-campaign]");
        if (!cards.length) return;
        const status = document.querySelector("#campaignStatus");
        status.style.marginBlock = "10px";
        status.style.color = "var(--primary)";
        const choices = Array.from(menu.querySelectorAll("input[type=checkbox]"));
        button.setAttribute("aria-label", "تصفية حسب نوع الحملة");
        button.setAttribute("aria-controls", menu.id);

        // فتح وإغلاق الفلتر
        function setOpen(open) {
            menu.classList.toggle("show", open);
            button.setAttribute("aria-expanded", String(open));
        }

        // عرض نتائج الفلتر
        function filterCards() {
            const categories = choices.filter(choice => choice.checked)
                .map(choice => choice.parentElement.textContent.trim());

            for (const card of cards) {
                card.hidden = !categories.includes(campaigns[card.dataset.campaign].category);
            }
            status.hidden = Array.from(cards).some(card => !card.hidden);
        }

        setOpen(false);
        // الانتقال إلى بطاقة الحملة
        function revealSearchResult() {
            const card = Array.from(cards).find(item => `#${item.id}` === location.hash);
            if (!card) return;
            const category = campaigns[card.dataset.campaign].category;
            const choice = choices.find(input => input.parentElement.textContent.trim() === category);
            if (choice) choice.checked = true;
            filterCards();
            card.style.scrollMarginTop = "100px";
            card.scrollIntoView({ block: "nearest" });
        }

        filterCards();
        revealSearchResult();
        window.addEventListener("hashchange", revealSearchResult);
        button.addEventListener("click", () => setOpen(!menu.classList.contains("show")));
        menu.addEventListener("change", filterCards);
        document.addEventListener("click", event => {
            if (!button.parentElement.contains(event.target)) setOpen(false);
        });
        button.parentElement.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                setOpen(false);
                button.focus();
            }
        });
    }

    // قراءة السلة
    function readCart() {
        const rows = readData(cartKey, []);
        if (!Array.isArray(rows)) return [];
        return rows.filter(row => row && Object.hasOwn(campaigns, row.id) &&
            Number.isSafeInteger(row.cents) && row.cents >= 100 &&
            Number.isSafeInteger(row.quantity) && row.quantity >= 1);
    }

    // حساب ملخص السلة
    function cartSummary(cart) {
        return {
            campaignCount: new Set(cart.map(row => row.id)).size,
            quantity: cart.reduce((count, row) => count + row.quantity, 0),
            cents: cart.reduce((total, row) => total + row.cents * row.quantity, 0)
        };
    }

    // عدّاد السلة
    function renderCartBadge(cart) {
        const link = document.querySelector(".cart-trigger");
        if (!link) return;
        let badge = link.querySelector(".cart-badge");
        if (!badge) {
            badge = document.createElement("span");
            badge.className = "cart-badge";
            badge.setAttribute("aria-hidden", "true");

            // تنسيق عدّاد السلة
            link.style.position = "relative";
            link.style.display = "block";
            Object.assign(badge.style, {
                position: "absolute",
                insetInlineEnd: "-8px",
                top: "-8px",
                padding: "1px 5px",
                minWidth: "19px",
                borderRadius: "20px",
                backgroundColor: "var(--primary)",
                color: "white",
                fontSize: "12px",
                lineHeight: "17px",
                textAlign: "center"
            });

            link.append(badge);
        }
        const { campaignCount } = cartSummary(cart);
        badge.hidden = campaignCount === 0;
        badge.textContent = campaignCount;
        link.setAttribute("aria-label", `سلة التبرعات، عدد الحملات: ${campaignCount}`);
    }

    // وظائف السلة
    function setupCart() {
        const list = document.querySelector(".cart-items-list");
        if (!list) return;

        const template = document.querySelector("#cartItemTemplate");
        const checkout = document.querySelector(".checkout-btn");

        // عرض عناصر السلة
        function render(cart) {
            list.replaceChildren();
            for (const [index, row] of cart.entries()) {
                const campaign = campaigns[row.id];
                const item = template.content.firstElementChild.cloneNode(true);
                item.dataset.index = index;
                item.querySelector("img").src = `../images/${campaign.image}`;
                item.querySelector("img").alt = campaign.category;
                item.querySelector(".cart-item-name").textContent = campaign.name;
                item.querySelector(".cart-item-category").textContent = campaign.category;
                item.querySelector("[data-item-subtotal]").textContent = money.format(row.cents * row.quantity / 100);
                item.querySelector(".quantity-value").textContent = row.quantity;
                item.querySelector('[data-action="subtract"]').disabled = row.quantity === 1;
                list.append(item);
            }

            if (!cart.length) {
                const empty = document.createElement("p");
                empty.textContent = "السلة فارغة. اختر حملة من الصفحة الرئيسية.";
                list.append(empty);
            }

            // تحديث ملخص السلة
            const summary = cartSummary(cart);
            document.querySelector(".cart-items-count").textContent = `عدد الحملات: ${summary.campaignCount}`;
            document.querySelector("#summaryCampaignCount").textContent = summary.campaignCount;
            document.querySelector("#summaryDonationCount").textContent = summary.quantity;
            for (const amount of document.querySelectorAll(".summary-amount")) {
                amount.textContent = money.format(summary.cents / 100);
            }
            checkout.disabled = !cart.length;
            renderCartBadge(cart);
        }

        // أزرار السلة
        list.addEventListener("click", event => {
            const button = event.target.closest("button[data-action]");
            if (!button) return;
            const index = Number(button.closest("[data-index]").dataset.index);
            let cart = readCart();
            const row = cart[index];
            if (!row) return;
            // تعديل الكمية وحذف الحملة
            const action = button.dataset.action;
            if (action === "remove") cart = cart.filter(item => item.id !== row.id);
            if (action === "add") row.quantity++;
            if (action === "subtract" && row.quantity > 1) row.quantity--;
            localStorage.setItem(cartKey, JSON.stringify(cart));
            render(cart);
            const replacement = list.children[Math.min(index, cart.length - 1)];
            const nextButton = replacement?.querySelector(`[data-action="${action}"]:not(:disabled)`);
            (nextButton ?? replacement?.querySelector('[data-action="add"]'))?.focus();
        });

        // فتح صفحة الإتمام
        checkout.addEventListener("click", () => { location.href = "checkout.html"; });
        render(readCart());
        window.addEventListener("pageshow", () => render(readCart()));
        window.addEventListener("storage", event => {
            if (event.key === cartKey || event.key === null) render(readCart());
        });
    }

    // زر إظهار كلمة المرور
    function setupPasswordButtons() {
        const eyeIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6Z"/><circle cx="12" cy="12" r="2.5"/><path class="eye-slash" d="m4 4 16 16"/></svg>';
        for (const wrapper of document.querySelectorAll(".password-control")) {
            const input = wrapper.querySelector("input");
            const label = input.labels[0].textContent;
            const button = document.createElement("button");
            button.type = "button";
            button.className = "password-toggle";
            button.innerHTML = eyeIcon;
            button.setAttribute("aria-controls", input.id);

            // تنسيق زر العين
            wrapper.style.position = "relative";
            input.style.paddingInlineEnd = "48px";
            Object.assign(button.style, {
                display: "grid",
                placeItems: "center",
                position: "absolute",
                insetInlineEnd: "6px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "38px",
                height: "38px",
                backgroundColor: "transparent",
                border: "0",
                color: "var(--primary)",
                cursor: "pointer"
            });

            const icon = button.querySelector("svg");
            icon.style.width = "22px";
            const slash = icon.querySelector(".eye-slash");

            // إظهار وإخفاء كلمة المرور
            function setVisible(visible) {
                input.type = visible ? "text" : "password";
                button.setAttribute("aria-label", `${visible ? "إخفاء" : "إظهار"} ${label}`);
                slash.style.display = visible ? "" : "none";
            }

            setVisible(false);
            button.addEventListener("click", () => setVisible(input.type === "password"));
            wrapper.append(button);
        }
    }

    // بصمة كلمة المرور
    async function demoPasswordHash(password, salt) {
        const encoder = new TextEncoder();
        const key = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveBits"]);
        const bits = await crypto.subtle.deriveBits({
            name: "PBKDF2", salt: encoder.encode(salt), iterations: 600000, hash: "SHA-256"
        }, key, 256);
        return Array.from(new Uint8Array(bits), byte => byte.toString(16).padStart(2, "0")).join("");
    }

    // تحديث بصمة كلمة المرور
    async function setDemoPassword(account, password) {
        account.salt = crypto.randomUUID();
        account.hash = await demoPasswordHash(password, account.salt);
    }

    // تعديل الملف الشخصي
    function setupProfile() {
        const form = document.querySelector("#profileForm");
        if (!form) return;
        const email = form.querySelector("#profileEmail");
        const password = form.querySelector("#profilePassword");
        const status = form.querySelector(".feature-status");
        const submit = form.querySelector("button[type=submit]");

        const emailToggle = form.querySelector("#edit-email");
        const passToggle = form.querySelector("#edit-pass");
        const display = email.parentElement.querySelector(".display-value");

        // عرض بيانات الملف الشخصي
        function refreshProfile() {
            email.value = readData(profileKey, {}).email ?? email.defaultValue;
            display.textContent = email.value;
            password.value = "";
            emailToggle.checked = false;
            passToggle.checked = false;
        }

        refreshProfile();

        // حفظ الملف الشخصي
        form.addEventListener("submit", async event => {
            event.preventDefault();
            if (!emailToggle.checked && !passToggle.checked) return;
            if (emailToggle.checked && (!email.value.trim() || !email.reportValidity())) {
                showStatus(status, "أدخل بريدًا إلكترونيًا صالحًا.", true);
                email.focus();
                return;
            }
            if (passToggle.checked && !password.value.trim()) {
                showStatus(status, "أدخل كلمة المرور التجريبية الجديدة.", true);
                password.focus();
                return;
            }

            submit.disabled = true;
            try {
                const account = readData(profileKey, { email: email.defaultValue });
                if (emailToggle.checked) account.email = email.value.trim().toLowerCase();
                if (passToggle.checked) await setDemoPassword(account, password.value);
                localStorage.setItem(profileKey, JSON.stringify(account));
                refreshProfile();
                showStatus(status, "تم حفظ تغييرات الملف الشخصي في هذا المتصفح.");
            } catch {
                showStatus(status, "تعذّر حفظ التغييرات. شغّل الموقع على localhost.", true);
            } finally {
                submit.disabled = false;
            }
        });
    }

    // إتمام التبرع التجريبي
    function setupCheckout() {
        const form = document.querySelector("#checkoutForm");
        if (!form) return;
        // تنسيق نموذج الإتمام
        Object.assign(form.style, {
            display: "grid",
            gap: "8px",
            marginBlockStart: "12px"
        });

        const amount = document.querySelector("#checkoutTotal");
        const status = document.querySelector("#checkoutStatus");
        const submit = form.querySelector("button[type=submit]");
        const sample = { cardholder: "TEST USER", cardNumber: "4242424242424242", expiry: "12/30", code: "123" };

        // عرض إجمالي التبرع
        function renderTotal() {
            const summary = cartSummary(readCart());
            amount.textContent = money.format(summary.cents / 100);
            submit.disabled = !summary.quantity;
            return summary;
        }

        if (!renderTotal().quantity) showStatus(status, "السلة فارغة. أضف تبرعًا أولًا.");

        form.addEventListener("submit", event => {
            event.preventDefault();
            if (!renderTotal().quantity) {
                showStatus(status, "السلة فارغة. أضف تبرعًا أولًا.", true);
                return;
            }
            // التحقق من بيانات الاختبار
            const valid = Object.entries(sample).every(([name, expected]) => {
                const entered = form.elements[name].value.trim();
                if (name === "cardNumber") return entered.replace(/\s/g, "") === expected;
                return entered.toUpperCase() === expected;
            });
            if (!valid) {
                showStatus(status, "اكتب بيانات الاختبار الموضّحة في الحقول لإتمام المحاكاة.", true);
                return;
            }
            // تفريغ السلة
            localStorage.removeItem(cartKey);
            renderTotal();
            form.reset();
            showStatus(status, "تمت محاكاة التبرع بنجاح.");
        });

        window.addEventListener("pageshow", renderTotal);
        window.addEventListener("storage", event => {
            if (event.key === cartKey || event.key === null) renderTotal();
        });
    }

    // تشغيل الوظائف
    setupPasswordButtons();
    setupProfile();
    setupCampaignSearch();
    setupCampaignFilter();
    setupCart();
    setupCheckout();
    renderCartBadge(readCart());
    // تحديث عدّاد السلة
    window.addEventListener("pageshow", () => renderCartBadge(readCart()));
    window.addEventListener("storage", event => {
        if (event.key === cartKey || event.key === null) renderCartBadge(readCart());
    });
})();
