emailjs.init('YOUR_USER_ID');  // Reemplaza con tu ID de usuario

document.getElementById('comentario-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const reseña = document.getElementById('reseña').value;

    const templateParams = {
        nombre: nombre,
        reseña: reseña
    };

    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(function(response) {
            alert('Comentario enviado con éxito!');
        }, function(error) {
            alert('Hubo un error al enviar el comentario.');
        });

    // Limpiar el formulario
    document.getElementById('nombre').value = '';
    document.getElementById('reseña').value = '';
});
