document.addEventListener('DOMContentLoaded', function () {
    const reservationForm = document.getElementById('reservationForm');

    reservationForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const lab = document.getElementById('lab').value;
        const equipment = Array.from(document.getElementById('equipment').selectedOptions)
            .map(option => option.value);

        // You can now send this data to the server using AJAX/fetch or any other method
        console.log('Username:', username);
        console.log('Lab:', lab);
        console.log('Selected Equipment:', equipment);

        // Reset the form after processing
        reservationForm.reset();
    });
});

