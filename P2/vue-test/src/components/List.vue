<template>
	<div>
		<h1 v-show="isLoading">
			Cargando personajes ...
		</h1>
		<table v-show="!isLoading">
			<tr>
				<th>Nombre</th>
				<th>Casa</th>
				<th>Detalle</th>
			</tr>
			<tr v-for="character in characters">
				<td>{{ character.name }}</td>
				<td>{{ character.house }}</td>
				<td> <button @click="goToDetail(character._id)">Ver detalle</button> </td>
			</tr>
		</table>
	</div>
</template>

<script>
	import store from "../store.js";
	import {
		listsAllCharacters,
		getACharacter
	} from '../services/got.service.js'
	
	export default {
		name: 'list-component',
	
		/**
		 * @description the data block represents all the local variable of this component.
		 */
		data() {
			return {
				characters: [],
				isLoading: false
			}
		},
	
		/**
		 * @description the create function is the first one to be execute when the component is being created (see vue js lifecycle).
		 */
		created() {
			this.isLoading = true
			listsAllCharacters()
				.then(res => {
					this.characters = res
					this.isLoading = false
				})
		},
	
		/**
		 * @description the methods block represents all the local methods of this component.
		 */
		methods: {
	
			/**
			 * @description get the detail of a character from the GoT API.
			 * @param {string} id. the "_id" of the character that we are going to request.
			 * @method goToDetail
			 */
			goToDetail(id) {
				getACharacter(id).then((response) => {
					/**
					 * @description Se carga el store con la informacion del detalle al pinchar el boton.
					 */
					store.commit("setDetail", response.data);
					this.$router.push({
						name: "detail"
					})
				}).catch((err) => {
					console.log('error ---> ', err)
				})
			}
		}
	}
</script>

<style scoped>
	table {
		font-family: arial, sans-serif;
		border-collapse: collapse;
		width: 100%;
	}
	
	td,
	th {
		border: 1px solid #dddddd;
		text-align: left;
		padding: 8px;
	}
	
	tr:nth-child(even) {
		background-color: #dddddd;
	}
</style>