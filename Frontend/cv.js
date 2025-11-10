const BASE_URL = "https://candidates-exam.herokuapp.com/api/v1";

//Cargar Curriculum
document.getElementById("CVForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const archivoEntrada = document.getElementById("CVFile");
    const archivo = archivoEntrada.files[0];

    if(!archivo){
        alert("Selecciona un archivo PDF")
        return;
    }

    if(archivo.type !== "application/pdf"){
        alert("Solo se permite archivos PDF")
        return;
    }

    const tamaño = 5*1024*1024;
    if(archivo.size > tamaño){
        alert("El archivo no puede superar los 5MB");
        return;
    }

    const token = localStorage.getItem("jwtToken");
    const url = localStorage.getItem("urlLogin");

    if (!token || !url) {
        alert("No se encontró token o URL. Debes iniciar sesión primero.");
        return;
    }

    const formData = new FormData();
    formData.append("curriculum", archivo);


    const response = await fetch(`https://candidates-exam.herokuapp.com/api/v1/usuarios/${url}/cargar_cv`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: formData
    });

    const data = await response.json();
    if(response.ok){
        console.log("Respuesta del servidor:", data);        
        alert("CV cargado con exito");
    }else {
        alert("Error al cargar CV");
    }
});

//Mostrar Curriculum
document.getElementById("btnMostrar").addEventListener("click", async () => {
    const token = localStorage.getItem("jwtToken");

    if(!token){
        alert("Incia sesion primero")
        return;
    }
    
    const responseMostrar = await fetch("https://candidates-exam.herokuapp.com/api/v1/usuarios/mostrar_cv", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        },
    });

    const data = await responseMostrar.json();
    if(data.url){
        console.log("url:", data.url);
        window.open(data.url, "_blank");
    }else {
        alert("No hay ningun CV cargado");
    }
});