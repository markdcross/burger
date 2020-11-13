$(function () {
    $('.change-devoured').on('click', function (event) {
        const id = $(this).data('id');
        const newDevoured = $(this).data('newdevoured');

        const newDevouredState = {
            devoured: newDevoured,
        };

        // Send the PUT request.
        $.ajax('/api/burgers/' + id, {
            type: 'PUT',
            data: newDevouredState,
        }).then(function () {
            console.log('changed devoured to', newDevoured);
            // Reload the page to get the updated list
            location.reload();
        });
    });

    $('.create-form').on('submit', function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        const newBurger = {
            burger_name: $('#burgName').val().trim(),
            devoured: $('[name=devoured]:checked').val().trim(),
        };
        console.log(newBurger);

        // Send the POST request.
        $.ajax('/api/burgers', {
            type: 'POST',
            data: newBurger,
        }).then(function () {
            console.log('created new burger');
            // Reload the page to get the updated list
            location.reload();
        });
    });
});
