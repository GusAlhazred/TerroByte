
const cargarCuentasJson = async () => {
    const respuesta = await fetch("./script/json/cuentas.json");
    const datos = await respuesta.json()
    console.log(datos)

    return(datos);
}

const contModal= document.querySelector(".mod")
const menuUsuario = document.querySelector(".menuUsuario")
let logeado = false;

// const textosModal = [
//     "Login",

// ]


const triggerMenu = document.querySelector(".usuario")
const listaMenuUsuario = [
    {
        nombre:"Mi Perfil",
        link: "#" 
    },
    {
        nombre:"Cosas", 
        link: "#"
    },
    {
        nombre:"Mis posteos",
        link:"#"
    }
]
const botonesUsuario = [
    {
        nombre:"Loggin",
        // link: "#",
    },
    {
        nombre:"Registrarse", 
        // link: "#"
    },
    {
        nombre:"Logout",
        // link:"#"
    }
]

let menuUsuarioDesplegado = false;

const ocultarBotonCorrespondiente = () => {
    const btnLogear = document.querySelector("[data-btn='Loggin']")
    const btnRegistrarse = document.querySelector("[data-btn='Registrarse']")
    const btnLogout = document.querySelector("[data-btn='Logout']")
    console.log(btnLogear.classList)
    
    logeado? 
        btnLogear.classList.add("escondido") || btnRegistrarse.classList.add("escondido") || btnLogout.classList.remove("escondido") :
        btnLogear.classList.remove("escondido") || btnRegistrarse.classList.remove("escondido") || btnLogout.classList.add("escondido")

}



// logear()

const generarModal = (e) => {
    // e.preventDefault();
    const btnClickeado = e.target.dataset.btn
    if ((btnClickeado === "Loggin") || (btnClickeado === "Registrarse")){
        const modalLogin = document.querySelector(".modalContainer");
    
        modalLogin.innerHTML="";
    
        //Titulo
        const h2Titulo = document.createElement("h2");
        h2Titulo.innerText = btnClickeado;
        
        //Usuario
        const contenedorUsuario = document.createElement("div");
        const labelUsuario = document.createElement("label");
        const inputUsuario = document.createElement("input");
        inputUsuario.type= "text";
        inputUsuario.dataset.txt="usuario"
        labelUsuario.innerText = "Usuario";
        
        contenedorUsuario.appendChild(labelUsuario);
        contenedorUsuario.appendChild(inputUsuario);
        contenedorUsuario.classList.add("contenedorInput")
        
    
        //Contraseña
        const contenedorContraseña = document.createElement("div");
        const labelContraseña = document.createElement("label");
        const inputContraseña = document.createElement("input");
        inputContraseña.dataset.txt="pass"
        inputContraseña.type= "password";
        labelContraseña.innerText = "Contraseña";
        
        contenedorContraseña.appendChild(labelContraseña);
        contenedorContraseña.appendChild(inputContraseña);
        contenedorContraseña.classList.add("contenedorInput")
    
    
        //Botonera
        const btnCancelar = document.createElement("a");
        const btnAccion = document.createElement("a");
        btnCancelar.innerText = "Cancelar";
        btnAccion.innerText = btnClickeado
        //Eventos Botones

        btnClickeado === "Loggin"? btnAccion.addEventListener("click", logear) : btnAccion.addEventListener("click", registrarse);
        btnCancelar.addEventListener("click", () => {contModal.classList.add("escondido")})
    
        const contenedorBotones = document.createElement("div");
        contenedorBotones.appendChild(btnAccion);
        contenedorBotones.appendChild(btnCancelar);
        contenedorBotones.classList.add("botonera")
    
    
        //Juntar todo
        // console.log(h2Titulo)
        // console.log(contenedorUsuario)
        // console.log(contenedorContraseña)
        // console.log(contenedorBotones)
        // console.log(modalLogin)
    
        modalLogin.appendChild(h2Titulo)
        modalLogin.appendChild(contenedorUsuario)
        modalLogin.appendChild(contenedorContraseña)
        modalLogin.appendChild(contenedorBotones)
    
        contModal.classList.toggle("escondido")
    }
} 


// const agregarEventosBotones = async () => {
//     // const btnLoggin = await document.querySelector('[data-btn="Loggin"]')
//     const btnLogout = await document.querySelector('[data-btn="Logout"]')
//     const btnRegistrarse = await document.querySelector('[data-btn="Registrarse"]')
//     // console.log(btnLoggin)
//     console.log(btnLogout)
//     console.log(btnRegistrarse)
// }

const deslogearse = () => {
    logeado =false;
    generarMenu();
    alert("No' vemo', papa!")
}

const generarBotonesMenuImg = () => {
    const contenedorBotones = document.createElement("div");
    for (botonEnArray of botonesUsuario){
        const botonActual = document.createElement("a");
        // botonActual.type="button";
        botonActual.dataset.btn= botonEnArray.nombre;
        // botonActual.value = botonEnArray.nombre;
        // botonActual.createAttribute="href"
        // botonActual.href= botonEnArray.link;
        botonActual.innerText= botonEnArray.nombre;
        (botonActual.dataset.btn === "Logout")? botonActual.addEventListener("click", deslogearse):
        botonActual.addEventListener("click", generarModal);
        
        contenedorBotones.appendChild(botonActual)
    }
    // agregarEventosBotones()
    contenedorBotones.classList.add("contenedorBotones")
    return (contenedorBotones)
}

const generarSeccionImgParaMenu = () => {
    const contenedor = document.createElement("div")
    const contenedorBotones = document.createElement("div")
    const img = document.createElement("img");
    img.createAttribute = "src";
    img.src = "./img/user-pic-default.png";
    img.classList.add("imagen-Menu");
    img.addEventListener("click", toogleMenu)

    contenedor.appendChild(img);

    contenedorBotones.appendChild(generarBotonesMenuImg());

    contenedor.appendChild(contenedorBotones)
    contenedor.classList.add("fotoYLoggin")
    return(contenedor)
}

const generarListaMenu = () => {
    const menu = document.createElement("ul")
    if (logeado){
        for (punto of listaMenuUsuario){
            let elemento = document.createElement("li");
            const hv = document.createElement("a");
            hv.innerText=punto.nombre;
            hv.createAttribute= "href";
            hv.href=punto.link;
            elemento.appendChild(hv)
            menu.appendChild(elemento);
        }
    }
        // menu.classList.add("escondido")
        return menu
}

const generarMenu = () => {
    menuUsuario.innerHTML= "";
    menuUsuario.classList.add("menuDesplegado", "escondido")
    menuUsuario.appendChild(generarSeccionImgParaMenu());
    ocultarBotonCorrespondiente();
    menuUsuario.appendChild(generarListaMenu());
}

const verificarSiExisteElUsuario =  (usuario, pass, cuentas) => {
    
    for (usuarioGuardado of cuentas){
        console.log(usuarioGuardado.nombre)
        console.log(usuarioGuardado.pass)
        if ((usuario.value === usuarioGuardado.nombre) && (pass.value === usuarioGuardado.pass)){
            return (true)
            // usuarioAceptado = cuentas.indexOf(usuarioIngresado.value)
            // break
        }
        // (usuarioIngresado.value === usuarioGuardado.nombre) && (passIngresada.value === usuarioGuardado.pass) && (validarIngreso=true) && (usuarioAceptado = cuentas.indexOf(usuarioIngresado.value)) && (break);
    }
    return(false)

}


const registrarse = async () => {
    

}

const logear = async () => {
    const usuarioIngresado = document.querySelector('[data-txt="usuario"]');
    const passIngresada = document.querySelector('[data-txt="pass"]');
    const cuentas = await cargarCuentasJson();
    // let validarIngreso = false
    // let usuarioAceptado;
    console.log(cuentas)

    // for (usuarioGuardado of cuentas){
    //     console.log(usuarioGuardado.nombre)
    //     console.log(usuarioGuardado.pass)
    //     if ((usuarioIngresado.value === usuarioGuardado.nombre) && (passIngresada.value === usuarioGuardado.pass)){
    //         logeado=true;
    //         // usuarioAceptado = cuentas.indexOf(usuarioIngresado.value)
    //         break
    //     }
    //     // (usuarioIngresado.value === usuarioGuardado.nombre) && (passIngresada.value === usuarioGuardado.pass) && (validarIngreso=true) && (usuarioAceptado = cuentas.indexOf(usuarioIngresado.value)) && (break);
    // }
    logeado = verificarSiExisteElUsuario(usuarioIngresado, passIngresada, cuentas)
    console.log(logeado)
    logeado? alert(`Bienvenido ${usuarioIngresado.value}`) : alert(`Usuario invalido`);
    contModal.classList.add("escondido")
    
    generarMenu();

    // console.log(usuario.value)
    // console.log(pass.value)
}
const toogleMenu = () => {
    menuUsuario.classList.toggle("escondido")
    // if (menuUsuarioDesplegado){
    //     menuUsuario.classList.toggle("escondido")
    //     menuUsuario.remove();
    //     menuUsuarioDesplegado = false;
    // } else{
    //     menuUsuarioDesplegado = true;
    //     main.appendChild(generarMenu());

    // }
}   

// generarModal(textosModal[0], textosModal[0]);
generarMenu();
triggerMenu.addEventListener("click", toogleMenu)
// console.log(main)
// generarSeccionImgParaMenu()