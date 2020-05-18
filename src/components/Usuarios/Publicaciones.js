import React, { Component } from 'react';
import Spinner from '../general/Spinner';
import Fatal from '../general/Fatal';
import Comentarios from './Comentarios';

import { connect } from 'react-redux';
import * as usuariosAction from '../../actions/usuariosAction';
import * as publicacionesAction from '../../actions/publicacionesAction';

const { traerTodos: usuariosTraerTodos } = usuariosAction;
const {
	traerPorUsuarios: publicacionesTraerPorUsuarios,
	abrirCerrar,
	traerComentarios,
} = publicacionesAction;

class Publicaciones extends Component {
	async componentDidMount() {
		const {
			usuariosTraerTodos,
			publicacionesTraerPorUsuarios,
			match: {
				params: { key },
			},
		} = this.props;

		if (!this.props.usuariosReducer.usuarios.length) {
			await usuariosTraerTodos();
		}
		if (this.props.usuariosReducer.error) {
			return null;
		}
		if (!('publicaciones_key' in this.props.usuariosReducer.usuarios[key])) {
			publicacionesTraerPorUsuarios(key);
		}
	}

	ponerUsurios = () => {
		const {
			usuariosReducer,
			match: {
				params: { key },
			},
		} = this.props;

		if (!usuariosReducer.usuarios.length || usuariosReducer.cargando) {
			return <Spinner />;
		}
		if (usuariosReducer.error) {
			return <Fatal mensage={usuariosReducer.error} />;
		}
		const nombre = usuariosReducer.usuarios[key].name;
		return <h1>Publicaciones de {nombre}</h1>;
	};

	ponerPublicaciones = () => {
		const {
			usuariosReducer,
			usuariosReducer: { usuarios },
			publicacionesReducer,
			publicacionesReducer: { publicaciones },
			match: {
				params: { key },
			},
		} = this.props;

		if (!usuarios.length) return <p>No users</p>;
		if (usuariosReducer.error) return <p>userError</p>;

		if (publicacionesReducer.cargando) {
			return <Spinner />;
		}
		if (publicacionesReducer.error) {
			return <Fatal mensaje={publicacionesReducer.error} />;
		}
		if (!publicaciones.length) return <p>No hay publicaciones</p>;
		if (!('publicaciones_key' in usuarios[key]))
			return <p>Hay un error con el usuario</p>;

		const { publicaciones_key } = usuarios[key];

		return this.mostrarInfo(
			publicaciones[publicaciones_key],
			publicaciones_key,
		);
	};

	mostrarInfo = (publicaciones, pub_key) => publicaciones.map((publicacion, com_key) => {
		return (
			<div className='pub-title' key={publicacion.id} onClick={() => this.mostrarComentarios(pub_key, com_key, publicacion.comentarios)}>
				<h2>{publicacion.title}</h2>
				<h3>{publicacion.body}</h3>
				{publicacion.abierto ? <Comentarios comentarios={publicacion.comentarios}/> : null}
			</div>
		);
	});

	mostrarComentarios = (pub_key, com_key, comentarios)=>{
		this.props.abrirCerrar(pub_key, com_key)
		if(!comentarios.length){
			this.props.traerComentarios(pub_key, com_key)
		}
	}

	render() {
		return (
			<div>
				{this.ponerUsurios()}
				{this.ponerPublicaciones()}
			</div>
		);
	}
}

const mapStateToProps = ({ usuariosReducer, publicacionesReducer }) => {
	return {
		usuariosReducer,
		publicacionesReducer,
	};
};

const mapDispatchToProps = {
	usuariosTraerTodos,
	publicacionesTraerPorUsuarios,
	abrirCerrar,
	traerComentarios,
};

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);
