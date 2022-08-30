// const menuUsuario = document.querySelector(".usuario");
// const menuUsuario = document.createElement("div");
const menuUsuario = document.querySelector(".menuUsuario")

// const main = document.querySelector("main")

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

let menuUsuarioDesplegado = false;


const generarImgParaMenu = () => {
    const img = document.createElement("img");
    img.createAttribute = "src";
    img.src = "./img/user-pic-default.png";
    img.classList.add("imagen-Menu");
    img.addEventListener("click", toogleMenu)

    console.log(img)

    return(img)
}

const generarListaMenu = () => {
    const menu = document.createElement("ul")
        for (punto of listaMenuUsuario){
            let elemento = document.createElement("li");
            const hv = document.createElement("a");
            hv.innerText=punto.nombre;
            hv.createAttribute= "href";
            hv.href=punto.link;
            elemento.appendChild(hv)
            menu.appendChild(elemento);
        }
        // menu.classList.add("escondido")
        return menu
}

const generarMenu = () => {
    menuUsuario.classList.add("menuDesplegado", "escondido")
    menuUsuario.appendChild(generarImgParaMenu());
    menuUsuario.appendChild(generarListaMenu());
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


generarMenu();
triggerMenu.addEventListener("click", toogleMenu)
// console.log(main)
// generarImgParaMenu()