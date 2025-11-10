const BASE_URL = "https://candidates-exam.herokuapp.com/api/v1";

const API_PING = `${BASE_URL}/ping`;
const API_USUARIOS = `${BASE_URL}/usuarios`;  
const API_LOGIN = `${BASE_URL}/login`;

//Registrar nuevo usuario
    document.getElementById("registroForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const password_confirmation = document.getElementById("password_confirmation").value.trim();

    if(!nombre){
        alert("El nombre es obligatorio")
        return;
    }

    if(!email){
        alert("El correo es obligatorio")
        return;
    }

    if(!password){
        alert("La contraseña es obligatoria")
        return;
    }

    if(password_confirmation !== password){
        alert("La confirmacion debe ser igual a la contraseña")
        return;
    }

    const response = await fetch(API_USUARIOS, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({nombre, email, password, password_confirmation})
    });

    if (response.ok) {
    alert("✅ Usuario guardado correctamente!");
    window.location.replace("index.html");
    } else {
        alert("❌ Error al guardar usuario");
    }

    if(response.ok){
        document.getElementById("registroForm").reset();
    } else{
        alert("Error al registrar usuario");
    }
});

