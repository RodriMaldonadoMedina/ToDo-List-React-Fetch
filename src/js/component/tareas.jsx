import React, { useEffect, useState } from "react";
import Tarea from "./tarea.jsx";

const Tareas = () => {
  const [nombreTarea, setNombreTarea] = useState([]);
  let tareasHechas = 0;
  let direccion;

  const agregarTarea = (e) => {
    if (e.target.value.trim() && e.key === "Enter") {
      setNombreTarea([...nombreTarea, { label: e.target.value, done: false }]);
      e.target.value = "";
    }
  };

  const actualizarServidorTareas = () => {
    sendTareas(nombreTarea);
  };

  const eliminarTarea = (indice) => {
    let nombreTareaABorrar = [...nombreTarea];
    nombreTareaABorrar[indice].done = !nombreTareaABorrar[indice].done;
    setNombreTarea(nombreTareaABorrar);
  };

  /* No logro hacer que ande el crear usuario con un arreglo vacio
  const agregarNuevoUsuario = (user)=>{
      fetch("https://assets.breatheco.de/apis/fake/todos/user/" + user.trim(),{  
        method: "POST",
        body : JSON.stringify([]),
        headers: {
          "Content-Type": "application/jason"          
        },
      })
        .then(resp => {console.log(resp.status);})
        .then(() => {})
        .catch(error => {console.log(error)})
  }*/

  const borrarUsuario = () => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/kq", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        //console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
        //console.log(resp.status); // el código de estado = 200 o código = 400 etc.
        //console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string)
        return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
      })
      .then((data) => {
        //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
        console.log(data, "estamos en el data del borrarUsuario"); //esto imprimirá en la consola el objeto exacto recibido del servidor
      })
      .catch((error) => {
        //manejo de errores
        console.log(error);
      });
  };

  function newUser(direccion) {
      console.log(direccion)
      fetch(direccion, {
        method: "POST",
        body: JSON.stringify([{ label: "Primera Tarea", done: false },{ label:"Segunda Tarea", done:false}]),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => {
          console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
          console.log(resp.status); // el código de estado = 200 o código = 400 etc.
          //console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string)
          return resp.json();// (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
        })
        .then((data) => {
          //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
          console.log(data, "estamos en el data de newUser"); //esto imprimirá en la consola el objeto exacto recibido del servidor
        })
        .catch((error) => {
          //manejo de errores
          console.log(error);
        });
  }

  function getTareas() {
    console.log()
    fetch("https://assets.breatheco.de/apis/fake/todos/user/kq", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        //console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
        //console.log(resp.status); // el código de estado = 200 o código = 400 etc.
        //console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string)
        return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
      })
      .then((data) => {
        //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
        setNombreTarea(data);
        //console.log(data,"estamos en el data del getTareas"); //esto imprimirá en la consola el objeto exacto recibido del servidor
      })
      .catch((error) => {
        //manejo de errores
        console.log(error);
      });
  }

  function sendTareas() {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/kq", {
      method: "PUT",
      body: JSON.stringify(nombreTarea),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        //console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
        //console.log(resp.status); // el código de estado = 200 o código = 400 etc.
        //console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string)
        return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
      })
      .then((data) => {
        //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
        console.log(data, "estamos en el data del sendTareas"); //esto imprimirá en la consola el objeto exacto recibido del servidor
      })
      .catch((error) => {
        //manejo de errores
        console.log(error);
      });
  }
  //contarTareas me da la cantidad de tareas que estan finalizadas, para poder mostrar las tareas que restan adecuadamente
  const contarTareas = ()=>{
    let count = 0;
    if (Array.isArray(nombreTarea)){
      nombreTarea.forEach((elemento)=>{
        if (elemento.done) 
          count++;
          //console.log(elemento)
        })
    }
    return count;
  }
  tareasHechas = contarTareas();

  return (
    <div>
      <div className="row miInput my-3">
        <input
          type="text"
          onKeyDown={(e) => agregarTarea(e)}
          className="col-12"
          placeholder="Ingrese la tarea a realizar"
        />
      </div>

      <ul className="list-group list-group-flush">
        {(nombreTarea && nombreTarea.length > 0)
          ? nombreTarea.map((element, index) => (
              <Tarea
                key={index}
                nombre={element}
                clase="list-group-item misTareas d-flex justify-content-between"
                eliminarTarea={() => eliminarTarea(index)}
              />
            ))
          : null}
        <li className="list-group-item text-center">
          {(nombreTarea.length - tareasHechas === 0)
            ? `No hay Tareas`
            : `cantidad de tareas de hoy : ${nombreTarea.length-tareasHechas}`}
        </li>
      </ul>
      <div className="mt-3">
        <button className="btn btn-secondary me-3" onClick={() => getTareas(direccion)}>
          Recuperar tareas
        </button>
        <button className="btn btn-success me-3" onClick={() => actualizarServidorTareas(direccion)}>
          Guardar tareas
        </button>
        <button className="btn btn-danger me-3" onClick={() => borrarUsuario(direccion)}>
          Borrar usuario
        </button>
      </div>
      <div className="mt-3">
        <input type="text" id="miInput" />
        <button
          className="btn btn-warning mx-3"
          onClick={() => {
            if (document.querySelector("#miInput").value.trim()) {
              direccion = "https://assets.breatheco.de/apis/fake/todos/user/" + document.querySelector("#miInput").value.trim();
              newUser(direccion);
              document.querySelector("#miInput").value = "";
            }
            else alert("No puede crear un usuario vacio!")
          }}
        >
          Dar de alta al Usuario
        </button>
      </div>
    </div>
  );
};

export default Tareas;
