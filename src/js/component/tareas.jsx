import React, { useEffect, useState } from "react";
import Tarea from "./tarea.jsx";

const Tareas = () => {
  const [nombreTarea, setNombreTarea] = useState([]);
  const [subido, setSubido] = useState(false);

  const agregarTarea = (e) => {
    if (e.target.value.trim() && e.key === "Enter") {
      setNombreTarea([...nombreTarea,{label: e.target.value, done: false}]);
      
      e.target.value = "";
    }
  };

  const actualizarServidorTareas = ()=>{
    sendTareas(nombreTarea);
  }
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

  const borrarUsuario = ()=>{
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
        console.log(data , "estamos en el data del sendTareas"); //esto imprimirá en la consola el objeto exacto recibido del servidor
      })
      .catch((error) => {
        //manejo de errores
        console.log(error);
      });

  }

  const eliminarTarea = (indice) => {
    let nombreTareaABorrar = [...nombreTarea];
    nombreTareaABorrar[indice].done = !nombreTareaABorrar[indice].done;
    setNombreTarea(nombreTareaABorrar)
  };
  
  /*useEffect(()=>{
      newUser()
  },[])*/

  function newUser(){
    fetch("https://assets.breatheco.de/apis/fake/todos/user/kq", {
      method: "POST",
      body: JSON.stringify([{label: "Primera Tarea", done:false}]),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
        console.log(resp.status); // el código de estado = 200 o código = 400 etc.
        //console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string)
        return resp;//.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
      })
      .then((data) => {
        //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
        console.log(data, "estamos en el data"); //esto imprimirá en la consola el objeto exacto recibido del servidor
      })
      .catch((error) => {
        //manejo de errores
        console.log(error);
      });
  }

  function getTareas(){
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
        return resp.json();//.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
      })
      .then((data) => {
        //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
        setNombreTarea(data);
        console.log("estamos en el data del getTareas"); //esto imprimirá en la consola el objeto exacto recibido del servidor
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
        console.log(data , "estamos en el data del sendTareas"); //esto imprimirá en la consola el objeto exacto recibido del servidor
      })
      .catch((error) => {
        //manejo de errores
        console.log(error);
      });
  }

  return (
    <div>
      <div className="row miInput my-3">
        <input
          type="text"
          onKeyDown={(e)=>agregarTarea(e)}
          className="col-12"
          placeholder="Ingrese la tarea a realizar"
        />
      </div>

      <ul className="list-group list-group-flush">
        {(nombreTarea && nombreTarea.length > 0 ) ? (nombreTarea.map((element, index) => (
          <Tarea
            key={index}
            nombre={element}
            clase="list-group-item misTareas d-flex justify-content-between"
            eliminarTarea={()=>eliminarTarea(index)}
          />
        ))) : null}
        <li className="list-group-item text-center">
          {nombreTarea.length === 0
            ? `No hay Tareas`
            : `cantidad de tareas de hoy : ${nombreTarea.length}`}
        </li>
      </ul>
      <div className="mt-3">
        <button className="btn btn-secondary me-3" onClick={()=>getTareas()}>Recuperar tareas</button>
        <button className="btn btn-success me-3" onClick={()=>actualizarServidorTareas()}>Guardar tareas</button>
        <button className="btn btn-danger me-3" onClick={()=>borrarUsuario()}>Borrar usuario</button>
      </div>
      <div className="mt-3">
        <input type="text" id="miInput"/>
        <button className="btn btn-warning mx-3" onClick={()=>newUser(document.querySelector("#miInput").value)}>Dar de alta al Usuario</button>
      </div>
    </div>
  );
};

export default Tareas;
