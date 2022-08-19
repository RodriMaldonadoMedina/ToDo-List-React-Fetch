import React, { useState } from "react";
import Tarea from "./tarea.jsx"


const Tareas = ()=>{

    const [nombreTarea, setNombreTarea] = useState([]);

    const agregarTarea = (e) => {
        if (e.target.value !== "" && e.key === "Enter") {
        //setNombreTarea((prev)=>prev.concat(e.target.value))
        setNombreTarea((prev) => [...prev, e.target.value]);
        //lo necesito para limpiar el input por la asincronia
        setTimeout(() => {
            e.target.value = "";
        }, 500);
        }
    };

    const eliminarTarea = (nombre) => {
        //nombre es el evento del onClick, por eso necesito hacer todo ese camino
        let tareaFiltrada = nombreTarea.filter(
        (element) =>element !== nombre);
        setNombreTarea(tareaFiltrada);
    };

    console.log(nombreTarea);
    return (

        /*
        fetch('https://assets.breatheco.de/apis/fake/todos/user/alesanchezr', {
            method: "GET",
            //body: JSON.stringify(todos),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(resp => {
            if (resp.ok >= 200 && resp.ok<300){
                console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
                console.log(resp.status); // el código de estado = 200 o código = 400 etc.
                console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string)
            }
            else console.log("Hay un error en el request")
            return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
    })
    .then(data => {
        //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
        console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
    })
    .catch(error => {
        //manejo de errores
        console.log(error);
    }));

*/
    

    <div>
      <div className="row miInput my-3">
        <input type="text" onKeyDown={agregarTarea} className="col-12" placeholder="Ingrese la tarea a realizar"/>
      </div>

      <ul className="list-group list-group-flush">
        {nombreTarea.map((element, index) => (
          <Tarea
            key={index}
            nombre={element}
            clase="list-group-item misTareas d-flex justify-content-between"
            eliminarTarea={eliminarTarea}
            indice={index}
          />
        ))}
        <li className="list-group-item text-center">
            {(nombreTarea === 0) ? (`No hay Tareas`) : (`cantidad de tareas de hoy : ${nombreTarea.length}`)}
        </li>
      </ul>
    </div>
  );
};

export default Tareas;