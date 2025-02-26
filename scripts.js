document.addEventListener('DOMContentLoaded', function () {
    const comentarioForm = document.getElementById('comentario-form');
    const comentariosLista = document.getElementById('comentarios-lista');

    // Referencia a la colección "reseñas" en Firestore
    const db = firebase.firestore();
    const comentariosRef = db.collection("reseñas");

    // Cargar reseñas desde Firebase
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

        const nombre = document.getElementById('nombre').value;
        const reseña = document.getElementById('reseña').value;

        if (nombre && reseña) {
            comentariosRef.add({
                nombre: nombre,
                reseña: reseña,
                timestamp: firebase.firestore.FieldValue.serverTimestamp() // Ordenar por fecha
            });

            // Limpiar el formulario
            comentarioForm.reset();
        }
    });
});

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC46qDuFlq24JuFbxWj6JX8K5WsKnAuMZg",
  authDomain: "academia-36043.firebaseapp.com",
  projectId: "academia-36043",
  storageBucket: "academia-36043.firebasestorage.app",
  messagingSenderId: "927681680683",
  appId: "1:927681680683:web:50a013c570986c2499a16e",
  measurementId: "G-S099SRXEZW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);                  
