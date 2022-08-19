import React from "react";

import Tareas from "./tareas.jsx"

//create your first component
const Home = () => {
	return (
		<div className="misNotas">
			<h1 className="text-center text-danger">ToDo List in React</h1>
			<Tareas />
		</div>
	);
};

export default Home;


