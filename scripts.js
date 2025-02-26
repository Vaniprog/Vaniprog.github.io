document.addEventListener('DOMContentLoaded', function() {
    const comentarioForm = document.getElementById('comentario-form');
    const comentariosLista = document.getElementById('comentarios-lista');

    // Cargar las reseñas guardadas en localStorage al cargar la página
    const loadComentarios = () => {
        const comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];
        comentariosLista.innerHTML = ''; // Limpiar lista existente
        comentarios.forEach(comentario => {
            const comentarioHTML = 
                <div class="reseña">
                    <strong>${comentario.nombre}:</strong>
                    <p>${comentario.reseña}</p>
                </div>
            ;
            comentariosLista.innerHTML += comentarioHTML;
        });
    };

    // Cargar reseñas cuando la página cargue
    loadComentarios();

    // Escuchar el evento de enviar el formulario
    comentarioForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const reseña = document.getElementById('reseña').value;

        if (nombre && reseña) {
            // Crear un objeto de reseña
            const nuevoComentario = { nombre, reseña };

            // Obtener las reseñas existentes en localStorage (si hay)
            const comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];
            comentarios.push(nuevoComentario); // Agregar la nueva reseña
            localStorage.setItem('comentarios', JSON.stringify(comentarios)); // Guardar en localStorage

            // Añadir la reseña al DOM
            const comentarioHTML = 
                <div class="reseña">
                    <strong>${nombre}:</strong>
                    <p>${reseña}</p>
                </div>
            ;
            comentariosLista.innerHTML += comentarioHTML; // Mostrar la reseña inmediatamente

            // Limpiar el formulario
            document.getElementById('nombre').value = '';
            document.getElementById('reseña').value = '';
        }
    });
});                   
