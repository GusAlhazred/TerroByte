class usuario {
    constructor(id, nombre, pass, mail, foto){
        this.id=id
        this.nombre= nombre;
        this.pass= pass,
        this.mail=mail;
        this.foto= foto;
    }
}

let usuarioLogeado = "";
//const fs = require ("fs");
//No funca. Necesito investigar mas sobre Node.js

//Carga el JSON de Cuentas
const cargarCuentasJson = async () => {
    const respuesta = await fetch("./script/json/cuentas.json");
    const datos = await respuesta.json()
    // console.log(datos)

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


//Genera foto deslogeado
const generarFotoAnonimo = (img) => {
    img.src = "./img/user-pic-default.png";
    return(img.src)
}

//Genera foto usuario cuando hay una cargada en el JSON. Sino, asigna la foto de deslogeado
const generarFotoUsuario = async (img) => {
    const usuarios = await cargarCuentasJson ();
    // const falopa = usuarios[usuarioLogeado]

    console.log(usuarios)
    console.log(usuarioLogeado)
    console.log(usuarios[usuarioLogeado])
    // console.log(falopa.foto)
    console.log(usuarios[usuarioLogeado].foto)
    img.src=(usuarios[usuarioLogeado]).foto
    img.src === "" && (img.src = generarFotoAnonimo(img));
    return(img.src)

}

//Si el usuario esta logeado, crea la foto en el head
const generarFotoUsuarioCorrespondiente = async () => {
    const avatar = document.querySelector(".userPic");
    const usuarios = await cargarCuentasJson();
    logeado? (avatar.src = await usuarios[usuarioLogeado].foto) : avatar.src=generarFotoAnonimo(avatar);
} 



//Oculta los botones del Menu de Usuario (Login, Reg, Logout) dependiendo si esta logeado
const ocultarBotonCorrespondiente = () => {
    const btnLogear = document.querySelector("[data-btn='Loggin']")
    const btnRegistrarse = document.querySelector("[data-btn='Registrarse']")
    const btnLogout = document.querySelector("[data-btn='Logout']")
    // console.log(btnLogear.classList)
    
    logeado? 
        btnLogear.classList.add("escondido") || btnRegistrarse.classList.add("escondido") || btnLogout.classList.remove("escondido") :
        btnLogear.classList.remove("escondido") || btnRegistrarse.classList.remove("escondido") || btnLogout.classList.add("escondido")

}


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
    generarFotoUsuarioCorrespondiente();
    generarMenu();
    alert("No' vemo', papa!")
}


//Genera botones del menu de usuario (login, reg, logout) y los devuelve en un contenedor
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




//Genera la parte de las fotos y menu de login del usuario para el menu de usuario
const generarSeccionImgParaMenu = async () => {
    const contenedor = document.createElement("div")
    const contenedorBotones = document.createElement("div")
    const img = document.createElement("img");
    img.createAttribute = "src";
    logeado? img.src = await generarFotoUsuario(img) : img.src= await generarFotoAnonimo(img)
    console.log(img)
    img.classList.add("imagen-Menu");
    img.addEventListener("click", toogleMenu)

    contenedor.appendChild(img);

    contenedorBotones.appendChild(generarBotonesMenuImg());

    contenedor.appendChild(contenedorBotones)
    contenedor.classList.add("fotoYLoggin")
    return(contenedor)
}


//Genera lista del Menu de usuario
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

const generarMenu = async () => {
    menuUsuario.innerHTML= "";
    menuUsuario.classList.add("menuDesplegado", "escondido")
    menuUsuario.appendChild(await generarSeccionImgParaMenu());
    ocultarBotonCorrespondiente();
    menuUsuario.appendChild(generarListaMenu());
}


//Verifica si el usuario ingresado existe en le JSON y, si existe, cambia el valor de la variable usuarioLogeado al index del usuario que se verifico
const verificarSiExisteElUsuario = async () => {
    
    const usuarioIngresado = document.querySelector('[data-txt="usuario"]');
    const passIngresada = document.querySelector('[data-txt="pass"]');
    const cuentas = await cargarCuentasJson();
    let index = -1;

    for (usuarioGuardado of cuentas){
        //Mejorar el modo de ver el index
        index++
        if ((usuarioIngresado.value === usuarioGuardado.nombre) && (passIngresada.value === usuarioGuardado.pass)){
            // usuarioLogeado = cuentas.indexOf({nombre: usuarioGuardado.nombre})
            // usuarioLogeado = find(usuarioGuardado.nombre, cuentas.nombre)
            usuarioLogeado = index;
            // console.log(usuarioIngresado.value)
            // console.log(usuarioGuardado.nombre)
            
            // console.log(usuarioLogeado)
            return (true)
            // break
        }
        // (usuarioIngresado.value === usuarioGuardado.nombre) && (passIngresada.value === usuarioGuardado.pass) && (validarIngreso=true) && (usuarioLogeado = cuentas.indexOf(usuarioIngresado.value)) && (break);
    }
    return(false)

}

// const escribirJson = async () => {
//     const usuarioIngresado = document.querySelector('[data-txt="usuario"]');
//     const passIngresada = document.querySelector('[data-txt="pass"]');
//     const cuentas = await cargarCuentasJson();

//     const id = await cuentas.length+1;
//     const nuevoUsuario = new usuario(id, usuarioIngresado.value, passIngresada.value, "", "");

//     await cuentas.push(nuevoUsuario);
//     const devolverAlArchivo= JSON.stringify(cuentas);
//     console.log(devolverAlArchivo)
//     //No me esta tomando esto de Node.js =( el require
//     // const fs = require("fs");
//     fs.writeFile("./script/json/cuentas.json", devolverAlArchivo, (err) => {
//         if (err){
//             throw err
//         }
//     })
// }
//https://www.youtube.com/watch?v=1hpc70_OoAg&t=8005s


//No hace nada por ahora. Pero quiero que escriba el JSON
const registrarse = async () => {
    const existe = await verificarSiExisteElUsuario();
    // console.log(existe)
    if (!existe){
        // escribirJson();
    }

}


//Logea al usuario ingresado, si se verifica que existe y le genera el menu de usuario
const logear = async () => {
    // let validarIngreso = false
    // let usuarioLogeado;
    // //console.log(cuentas)

    // for (usuarioGuardado of cuentas){
    //     //console.log(usuarioGuardado.nombre)
    //     //console.log(usuarioGuardado.pass)
    //     if ((usuarioIngresado.value === usuarioGuardado.nombre) && (passIngresada.value === usuarioGuardado.pass)){
    //         logeado=true;
    //         // usuarioLogeado = cuentas.indexOf(usuarioIngresado.value)
    //         break
    //     }
    //     // (usuarioIngresado.value === usuarioGuardado.nombre) && (passIngresada.value === usuarioGuardado.pass) && (validarIngreso=true) && (usuarioLogeado = cuentas.indexOf(usuarioIngresado.value)) && (break);
    // }
    // logeado = verificarSiExisteElUsuario(usuarioIngresado, passIngresada, cuentas)
    logeado = verificarSiExisteElUsuario()
    //console.log(logeado)
    logeado? alert(`Bienvenido`) : alert(`Usuario invalido`);
    contModal.classList.add("escondido")
    
    generarFotoUsuarioCorrespondiente();
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

generarFotoUsuarioCorrespondiente()
generarMenu();
triggerMenu.addEventListener("click", toogleMenu)
// console.log(main)
// generarSeccionImgParaMenu()