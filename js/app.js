import { API } from './api.js';
import * as UI from './interfaz.js';

UI.formularioBuscar.addEventListener('submit', (e) => {
    e.preventDefault();

    //Obtener datos del Formulario
    const artista = document.querySelector('#artista').value,
          cancion = document.querySelector('#cancion').value;

    if(artista === '' || cancion === ''){
        //el ususario deja los campos vacios.
        UI.divMensajes.innerHTML = 'Error... Todos los campos son obligatorios';
        UI.divMensajes.classList.add('error');
        setTimeout(() =>{
            UI.divMensajes.innerHTML = '';
            UI.divMensajes.classList.remove('error');
        }, 3000);
    } else {
        //el formulario esta completo. Realizar consulta a la API.
        const api = new API(artista, cancion);
        api.consultarAPI()
            .then(data => {
                if(data.respuesta.lyrics) {
                    console.log(data);
                    //La cancion existe.
                    const letra = data.respuesta.lyrics;
                    UI.divResultado.textContent = letra;
                } else {
                    //La cancion no existe.
                    UI.divMensajes.innerHTML = 'La cancion no existe, prueba con otra búsqueda.';
                    UI.divMensajes.classList.add('error');
                    setTimeout(() =>{
                        UI.divMensajes.innerHTML = '';
                        UI.divMensajes.classList.remove('error');
                        UI.formularioBuscar.reset();
                    }, 3000);
                }
            });
    }

});