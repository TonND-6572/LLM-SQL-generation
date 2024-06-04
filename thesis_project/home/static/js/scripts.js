const wrapper_class = "#wrapper_id"

// script.js

document.addEventListener("DOMContentLoaded", function () {
    // Counter to keep track of the index
    var indexCounter = 0;

    // Function to handle the click event for ADD button
    function handleAddButtonClick() {
        // Get the table-field container element
        var tableField = document.getElementById('table-field');

        // Create a new div element with the specified HTML content and index
        var newTableField = document.createElement('div');
        newTableField.className = 'p-2';
        newTableField.setAttribute('data-index', indexCounter);

        newTableField.innerHTML = `
            <input class="form-control mb-1 input-field" type="text" required placeholder="Insert table name" data-input="name">
            <input class="form-control mb-1 w-100" type="text" placeholder="Insert table columns" data-input="columns">
            <hr class="m-1">
        `;

        // Increment the index counter
        indexCounter++;

        // Append the new div to the table-field container
        tableField.appendChild(newTableField);

        // Enable the CLEAR button
        clearButton.disabled = false;
    }

    // Function to handle the click event for CLEAR button
    function handleClearButtonClick() {
        // Get the table-field container element
        var tableField = document.getElementById('table-field');

        // Get all elements with the class 'p-2' inside table-field
        var tableFieldElements = tableField.getElementsByClassName('p-2');

        // Ensure there is at least one element
        if (tableFieldElements.length > 0) {
            // Remove the last added element
            var lastElement = tableFieldElements[tableFieldElements.length - 1];
            var lastIndex = lastElement.getAttribute('data-index');
            tableField.removeChild(lastElement);

            // Disable the CLEAR button if there is only one element
            clearButton.disabled = tableFieldElements.length === 1;

            // You can use 'lastIndex' to identify the removed element if needed
        }
    }

    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
      }      

    // Function to handle the click event for SUBMIT button
    function handleSubmitButtonClick() {
        // Get all elements with the class 'p-2' inside table-field
        var tableFieldElements = document.querySelectorAll('#table-field .p-2');

        // Initialize an array to store the formatted strings for each element
        var formattedStrings = [];

        // Iterate through each element and retrieve the input values
        tableFieldElements.forEach(function (element) {
            var nameInput = element.querySelector('[data-input="name"]');
            var columnsInput = element.querySelector('[data-input="columns"]');

            // Check if the input elements are not null
            if (nameInput && columnsInput) {
                // Format the string for each element
                var formattedString = `${nameInput.value} (${columnsInput.value}); `;
                formattedStrings.push(formattedString);
            }
        });

        var defaultString = `Tôi có bảng: ${formattedStrings.join('')}`
        // Concatenate all formatted strings
        var finalMessage = defaultString + `. Hãy trả lời bằng câu truy vấn: ${chatInput.value}`;
        const now = new Date();
        var chatMessagesContainer = document.getElementById('wrapper_id');
            chatMessagesContainer.innerHTML += `
            <div class="chat-message-right mb-4">
            <div>
                <img src="https://bootdey.com/img/Content/avatar/avatar1.png" class="rounded-circle mr-1" alt="Chris Wood" width="40" height="40">
                <div class="text-muted small text-nowrap mt-2">${formatAMPM(now)}</div>
            </div>
            <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                <div class="font-weight-bold mb-1">You</div>
                ${chatInput.value}
            </div>
        </div>`;
        // Log or use the final message as needed
        console.log(finalMessage);

        // Clear the chat input
        chatInput.value = '';

        fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': $('input[name=csrfmiddlewaretoken]').val(),
            },
            body: JSON.stringify({ question: finalMessage }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.answer);
            

            chatMessagesContainer.innerHTML += `<div class="chat-message-left pb-4">
            <div>
                <img src="https://bootdey.com/img/Content/avatar/avatar3.png" class="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40">
                <div class="text-muted small text-nowrap mt-2">${formatAMPM(now)}</div>
            </div>
            <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                <div class="font-weight-bold mb-1">Sharon Lessman</div>
                ${data.answer}
            </div>
            </div>`;
        })
        .catch(error => console.error('Error:', error));
        // Clear the chat input
        chatInput.value = '';
    }



    // Function to handle the click event for CLEAR ALL button
    function handleClearAllButtonClick() {
        // Get the table-field container element
        var tableField = document.getElementById('table-field');
    
        // Get all elements with the class 'p-2' inside table-field
        var tableFieldElements = tableField.getElementsByClassName('p-2');
    
        // Ensure there is at least one element
        if (tableFieldElements.length > 1) {
            // Create a copy of the elements (excluding the last one)
            var elementsToRemove = Array.from(tableFieldElements).slice(0, -1);
    
            // Iterate through each element in the copy
            elementsToRemove.forEach(function (element) {
                // Reset the values of the input fields
                var nameInput = element.querySelector('[data-input="name"]');
                var columnsInput = element.querySelector('[data-input="columns"]');
                // nameInput.value = "";
                // columnsInput.value = "";
    
                // Remove the element
                tableField.removeChild(element);
            });
        }
        console.log(indexCounter);
        // Disable the CLEAR button
        clearButton.disabled = true;
    }

    

    // Get the ADD, CLEAR, and SUBMIT buttons
    var addButton = document.querySelector('.btn-success');
    var clearButton = document.querySelector('.btn-secondary');
    var clearAllButton = document.querySelector('.btn-danger');
    var submitButton = document.querySelector('.btn-primary');

    // Add click event listeners to the ADD, CLEAR, and SUBMIT buttons
    addButton.addEventListener('click', handleAddButtonClick);
    clearButton.addEventListener('click', handleClearButtonClick);
    clearAllButton.addEventListener('click', handleClearAllButtonClick);
    submitButton.addEventListener('click', handleSubmitButtonClick)

    // Disable the CLEAR button initially
    clearButton.disabled = true;
});

