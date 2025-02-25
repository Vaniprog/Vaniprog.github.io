document.getElementById('comentario-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const reseña = document.getElementById('reseña').value;

    if (nombre && reseña) {
        const comentarioHTML = `
            <div class="reseña">
                <strong>${nombre}:</strong>
                <p>${reseña}</p>
            </div>
        `;
        document.getElementById('comentarios-lista').innerHTML += comentarioHTML;
    }

    // Limpiar el formulario
    document.getElementById('nombre').value = '';
    document.getElementById('reseña').value = '';
});
