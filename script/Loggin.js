const menuUsuario = document.querySelector(".usuario");
const listaMenuUsuario = ["Mi Perfil", "Cosas", "Mis posteos"]

let menuUsuarioDesplegado = false;


const toogleMenu = () => {
    if (!menuUsuarioDesplegado){
        menuUsuario.classList.add("menuDesplegado");
        const menu = document.createElement("ul")
        for (punto of listaMenuUsuario){
            let elemento = document.createElement("li");
            elemento.innerText=punto;
            menu.appendChild(elemento);
        }
        menuUsuario.appendChild(menu);
        menuUsuarioDesplegado= true;
    }
    // menuUsuarioDesplegado? menuUsuarioDesplegado=false : menuUsuarioDesplegado=true ;
    // menuUsuario.classList.toggle("menuDesplegado")
    // console.log(menuUsuario.classList)
}   

menuUsuario.addEventListener("click", toogleMenu)