import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Menu from './Menu';
import Usuarios from './Usuarios';
import Publicaciones from "./Usuarios/Publicaciones"
import Tareas from "./Tareas"

const NotFound = ()=> <h1>We Couldn´t Find Any Content</h1>

const App = () => (
	<BrowserRouter>
		<Menu />
		<div id="margen">
			<Switch>
				<Route exact path='/' component={Usuarios} />
				<Route exact path='/tareas' component={Tareas} />
				<Route exact path="/publicaciones/:key" component={Publicaciones} />
				<Route component={NotFound}/>
			</Switch>
		</div>
	</BrowserRouter>
);

export default App;