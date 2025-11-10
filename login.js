const BASE_URL = "https://candidates-exam.herokuapp.com/api/v1";

const API_PING = `${BASE_URL}/ping`;
const API_USUARIOS = `${BASE_URL}/usuarios`;  
const API_LOGIN = `${BASE_URL}/auth/login`;

//Login
document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if(!email){
        alert("El correo es obligatorio")
        return;
    }

    if(!password){
        alert("La contraseña es obligatoria")
        return;
    }

    const response = await fetch(API_LOGIN, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password})
    });

    const data = await response.json();

    if (data.tipo) {
        console.log("Login exitoso!");
        console.log("token:", data.token);
        console.log("usuario:", data.usuario);
        localStorage.setItem("jwtToken", data.token);
        localStorage.setItem("urlLogin", data.usuario.url);

        const token = localStorage.getItem("jwtToken");
        const response = await fetch(API_USUARIOS, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }});
        alert(`Authorization \n${data.token} Token obtenido en el Login`);
        window.location.replace("perfil.html");
    } else {
        alert("Credenciales incorrectas");
    }
});
