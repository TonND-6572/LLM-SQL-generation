const wrapper_class = "#wrapper_id"

$(document).ready(function () {
    $('#chatForm').on('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Get the input value
        var question = $('#chatInput').val();
        console.log(question);
        question_message = `
            <div class="chat-message-right mb-4">
            <div>
                <img src="https://bootdey.com/img/Content/avatar/avatar1.png" class="rounded-circle mr-1" alt="Chris Wood" width="40" height="40">
                <div class="text-muted small text-nowrap mt-2">2:35 am</div>
            </div>
            <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                <div class="font-weight-bold mb-1">You</div>
                ${question}
            </div>
            </div>
        `
        $(wrapper_class).append(question_message);
        $('#chatInput').val('');

        let textBoxValues = {};

        for (let i = 0; i < textBoxIndex; i++) {
            var table = $(`input[name=table-${i}]`).val(); // Add # to specify the ID in jQuery selector
            var columns = $(`input[name=columns-${i}]`).val(); // Add # to specify the ID in jQuery selector

            if (table && columns) {
                const columnsArray = columns.split(',').map(item => item.trim());
                textBoxValues[table] = columnsArray;
            } else {
                console.error('Table or Columns value is undefined or empty.');
            }
        }

        // Make an AJAX request
        $.ajax({
            type: 'POST',
            url: 'chat',
            data: {
                'question': question,
                'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val(),
                'tables': textBoxValues
            },
            success: function (response) {
                // Handle the response
                // Here you can append the response data to the chatMessages div
                answer_message = `
                    <div class="chat-message-left pb-4">
                    <div>
                        <img src="https://bootdey.com/img/Content/avatar/avatar3.png" class="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40">
                        <div class="text-muted small text-nowrap mt-2">2:34 am</div>
                    </div>
                    <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                        <div class="font-weight-bold mb-1">Sharon Lessman</div>
                        ${response.answer}
                    </div>
                    </div>
                `
                $(wrapper_class).append(answer_message);
                console.log(response);
            },
            error: function (error) {
                console.log('Error:', error);
            }
        });
    });

    let textBoxIndex = 1;

    // Function to add a new text box
    $('#addTextBoxBtn').on('click', function() {
        let newTextBox = `
            <input type="text" class="form-control" placeholder="Your Text Here" aria-label="Your Text" aria-describedby="basic-addon2" name="table-${textBoxIndex}">
            <input type="text" class="form-control" placeholder="Your Text Here" aria-label="Your Text" aria-describedby="basic-addon2" name="columns-${textBoxIndex}">
        `;
        $('#textBoxContainer').append(newTextBox);
        textBoxIndex++;
    });
});
