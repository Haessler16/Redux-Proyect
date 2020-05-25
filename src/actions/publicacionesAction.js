import {
	TRAER_POR_USUARIOS,
	CARGANDO,
	ERROR,
	ACTUALIZADAS,
	COM_CARGANDO,
	COM_ERROR,
} from '../type/publicacionesType';
import * as usuariosType from '../type/usuariosType';
import axios from "axios"

const { TRAER_TODOS: USUARIOS_TRAER_TODOS } = usuariosType;

export const traerPorUsuarios = (key) => async (dispatch, getState) => {
	dispatch({
		type: CARGANDO,
	});

	const { publicaciones } = getState().publicacionesReducer;
	const { usuarios } = getState().usuariosReducer;
	const usuarios_id = usuarios[key].id;

	try {
		const respuesta = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${usuarios_id}`)

		const newPublication = respuesta.data.map((publicaciones) => ({
			...publicaciones,
			comentarios: [],
			abierto: false,
		}));
		const publicaciones_actualizadas = [...publicaciones, newPublication];

		dispatch({
			type: TRAER_POR_USUARIOS,
			payload: publicaciones_actualizadas,
		});

		const publicaciones_key = publicaciones_actualizadas.length - 1;
		const usuarios_actualizados = [...usuarios];

		usuarios_actualizados[key] = {
			...usuarios[key],
			publicaciones_key,
		};

		dispatch({
			type: USUARIOS_TRAER_TODOS,
			payload: usuarios_actualizados,
		});
	} catch (error) {
		dispatch({
			type: ERROR,
			payload: error.message,
		});
	}
};

export const abrirCerrar = (pub_key, com_key) => (dispatch, getState) => {
	const { publicaciones } = getState().publicacionesReducer;
	const seleccionada = publicaciones[pub_key][com_key];

	const actualizadas = {
		...seleccionada,
		abierto: !seleccionada.abierto,
	};

	const publicaciones_actualizadas = [...publicaciones];
	publicaciones_actualizadas[pub_key] = [
		...publicaciones_actualizadas[pub_key],
	];
	publicaciones_actualizadas[pub_key][com_key] = actualizadas;

	dispatch({
		type: ACTUALIZADAS,
		payload: publicaciones_actualizadas,
	});
};

export const traerComentarios = (pub_key, com_key) => async (
	dispatch,
	getState,
) => {
	const { publicaciones } = getState().publicacionesReducer;
	const seleccionadas = publicaciones[pub_key][com_key];

	dispatch({
		type: COM_CARGANDO,
	});
	try {
		// const respuesta = await get.axios(https://jsonplaceholder.typicode.com/comments)
		const res = await import(`../data/comments`);
		const comentarios = {};
		res.default.map((comment) => {
			return (comentarios[comment.postId] = {
				...comentarios[comment.postId],
				[comment.id]: {
					...comment,
				},
			});
		});
		const comentarios_seleccionados = comentarios[seleccionadas.id];
		const actualizadas = {
			...seleccionadas,
			comentarios: comentarios_seleccionados,
		};

		const publicaciones_actualizadas = [...publicaciones];
		publicaciones_actualizadas[pub_key] = [
			...publicaciones_actualizadas[pub_key],
		];
		publicaciones_actualizadas[pub_key][com_key] = actualizadas;

		dispatch({
			type: ACTUALIZADAS,
			payload: publicaciones_actualizadas,
		});
	} catch (error) {
		dispatch({
			type: COM_ERROR,
			payload: 'Cometarios no disponibles intente mas tarde',
		});
	}
};
