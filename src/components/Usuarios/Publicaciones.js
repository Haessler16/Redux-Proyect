import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as usuariosAction from '../../actions/usuariosAction';
import * as publicacionesAction from '../../actions/publicacionesAction';
import Spinner from '../general/Spinner';
import Fatal from '../general/Fatal';

const { traerTodos: usuariosTraerTodos } = usuariosAction;
const { traerPorUsuarios: publicacionesTraerPorUsuarios } = publicacionesAction;

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

		if (!usuarios.length) return <p>Ups</p>;
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

		return publicaciones[publicaciones_key].map((publicacion) => {
			return (
				<div className="pub-title" key={publicacion.id} onClick={()=>alert(publicacion.id)}>
					<h2>{publicacion.title}</h2>
					<h3>{publicacion.body}</h3>
				</div>
			);
		});
	};

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
};

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);
