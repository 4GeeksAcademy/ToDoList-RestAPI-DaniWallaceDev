import React, { useState, useEffect } from "react";

//create your first component
const Home = () => {
	const [tareas, setTareas] = useState([])
	const [nuevaTarea, setNuevaTarea] = useState("")

// funcion de crear para usar en API
// function createTask(tareas = "") {
//     return post( {
//         "label": text,
//         "is_done": false
//     })
// }

function traerTareasAPI () {
	fetch("https://playground.4geeks.com/todo/users/DaniWallaceDev")
		.then(response => response.json())
		.then(data=>setTareas(data.todos))
}
useEffect(()=>{
	traerTareasAPI()
},[])

function crearTarea (e) {
	if (e.key === "Enter" && nuevaTarea !== "") {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				"label": nuevaTarea,
				"is_done": false
			  })
		};
		fetch('https://playground.4geeks.com/todo/todos/DaniWallaceDev', requestOptions)
			.then(response => response.json())
			.then(()=>traerTareasAPI())
		setNuevaTarea("")
	}
}

function cambioInput (e){
	setNuevaTarea(e.target.value)
}

// funcion de delete
function borrarTarea(idToDelete) {
	fetch("https://playground.4geeks.com/todo/todos/"+idToDelete,{method:"DELETE"})
		.then(()=>traerTareasAPI())

		
}
	return (
		<div className = "container-fluid">
			<div className = "row">
				<div className = "col-12 mx-auto">
					<h1 className="border border-3 border-dark bg-light rounded-3 mb-3 pb-2 d-flex justify-content-center">ToDoList</h1>
					<input placeholder="Añade tu proxima tareita" type="text" value={nuevaTarea} onChange={cambioInput} onKeyDown={crearTarea}/>
					<ul>
						{tareas.map((tarea,index)=>
						<li className="ps-1 mx-auto my-2" key={index}>{tarea.label}
							<i className="btn fa-solid fa-trash-can" onClick={()=>borrarTarea(tarea.id)}></i>
						</li>)}
						<li className="ps-1">
							Tareas por completar = {tareas.length}
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Home;
