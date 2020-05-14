import React, { Component } from 'react';
import {connect} from "react-redux"
import * as usuariosAction from "../../actions/usuariosAction"
import Spinner from "../general/Spinner"
import Fatal from "../general/Fatal"
import Tabla from "./Tabla"

class Usuarios extends Component {
	componentDidMount() {
		if(!this.props.usuarios.length){
			this.props.traerTodos()
		}
	}

	ponerContenido = ()=>{
		if(this.props.cargando){
			return <Spinner/>
		}
		if(this.props.error){
			return <Fatal mensage={this.props.error}/>
		}
		return <Tabla />
	}

	render() {
		//console.log(this.props);
		return(
			<div>
				<h1>Usuarios</h1>
				{ this.ponerContenido() }
			</div>
		)
	}
};

const mapStateToProps = (reducers)=>{
	return reducers.usuariosReducer
}

export default connect(mapStateToProps, usuariosAction)(Usuarios);