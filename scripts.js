// INICIALIZAR FIREBASE
const firebaseConfig = {
    apiKey: "AIzaSyC46qDuFlq24JuFbxWj6JX8K5WsKnAuMZg",
    authDomain: "academia-36043.firebaseapp.com",
    projectId: "academia-36043",
    storageBucket: "academia-36043.firebasestorage.app",
    messagingSenderId: "927681680683",
    appId: "1:927681680683:web:50a013c570986c2499a16e",
    measurementId: "G-S099SRXEZW"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

document.addEventListener('DOMContentLoaded', function () {
    const comentarioForm = document.getElementById('comentario-form');
    const comentariosLista = document.getElementById('comentarios-lista');
    const comentariosRef = db.collection("reseñas");

    // Cargar reseñas desde Firebase en tiempo real
    comentariosRef.orderBy("timestamp", "desc").onSnapshot((snapshot) => {
        comentariosLista.innerHTML = ""; // Limpiar la lista
        snapshot.forEach((doc) => {
            const comentario = doc.data();
            const comentarioHTML = `
                <div class="reseña">
                    <strong>${comentario.nombre}:</strong>
                    <p>${comentario.reseña}</p>
                </div>
            `;
            comentariosLista.innerHTML += comentarioHTML;
        });
    });

    // Enviar una nueva reseña
    comentarioForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value.trim();
        const reseña = document.getElementById('reseña').value.trim();

        if (nombre && reseña) {
            comentariosRef.add({
                nombre: nombre,
                reseña: reseña,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => {
                console.log("Reseña guardada en Firebase");
                comentarioForm.reset();
            }).catch((error) => {
                console.error("Error al guardar reseña:", error);
            });
        } else {
            alert("Por favor, completa todos los campos.");
        }
    });
});
