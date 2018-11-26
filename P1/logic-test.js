// No editar
const teams = [
	{ id: 1, country: 'Spain', name: 'Real Madrid C.F.' },
	{ id: 2, country: 'Italy', name: 'A.C. Milan' },
	{ id: 3, country: 'Spain', name: 'Futbol Club Barcelona' },
	{ id: 4, country: 'Germany', name: 'FC Bayern Munich' },
	{ id: 5, country: 'England', name: 'Liverpool F.C.' },
	{ id: 6, country: 'Netherlands', name: 'AFC Ajax' },
	{ id: 7, country: 'Italy', name: 'Inter Milan' },
	{ id: 8, country: 'England', name: 'Manchester United F.C.' },
	{ id: 9, country: 'England', name: 'Chelsea F.C.' },
	{ id: 10, country: 'Portugal', name: 'FC Porto' },
	{ id: 11, country: 'Germany', name: 'Borussia Dortmund' },
	{ id: 12, country: 'Italy', name: 'Juventus FC' },
	{ id: 13, country: 'France', name: 'Olympique Marseille' }
]

const leagues = [
	{ id: 1, country: 'England', name: 'Premier League' },
	{ id: 2, country: 'Germany', name: 'Bundesliga' },
	{ id: 3, country: 'Netherlands', name: 'Eredivisie' },
	{ id: 4, country: 'Spain', name: 'La Liga' },
	{ id: 5, country: 'Italy', name: 'Serie A' },
	{ id: 6, country: 'Portugal', name: 'Liga NOS' },
	{ id: 7, country: 'France', name: 'Lige 1' }
]

const teamsByLeague = [
	{ teamId: 12, leagueId: 5 },
	{ teamId: 6, leagueId: 3 },
	{ teamId: 2, leagueId: 5 },
	{ teamId: 3, leagueId: 4 },
	{ teamId: 4, leagueId: 2 },
	{ teamId: 8, leagueId: 1 },
	{ teamId: 10, leagueId: 6 },
	{ teamId: 5, leagueId: 1 },
	{ teamId: 7, leagueId: 5 },
	{ teamId: 9, leagueId: 1 },
	{ teamId: 11, leagueId: 2 },
	{ teamId: 1, leagueId: 4 },
	{ teamId: 13, leagueId: 7 }
]

const winsByTeams = [
	{ teamId: 10, wins: 2 },
	{ teamId: 6, wins: 4 },
	{ teamId: 5, wins: 5 },
	{ teamId: 1, wins: 13 },
	{ teamId: 7, wins: 3 },
	{ teamId: 4, wins: 5 },
	{ teamId: 8, wins: 3 },
	{ teamId: 2, wins: 7 },
	{ teamId: 9, wins: 1 },
	{ teamId: 3, wins: 5 },
	{ teamId: 11, wins: 1 },
	{ teamId: 12, wins: 2 },
	{ teamId: 13, wins: 1 }
]

/**
 * @name Filter
 * @method function
 * @description Filtro al cual se le entrega el valor wins y busca todas las coincidencias.
 * @param  wins
 * @author Osirus=>CQ:)
 */
function filter(positions){
	const winsMin = winsByTeams.filter((value)=>value.wins === positions)
	const teamsList = winsMin.map((value)=>{
		return {
			name: teams.filter((teamsValue)=>teamsValue.id === value.teamId).map((value)=>value.name).join(''),
			country: teams.filter((teamsValue)=>teamsValue.id === value.teamId).map((value)=>value.country).join('')
		}
    })
	const teamsLeagueList = teamsList.map((valor)=>{
		return {
			name: valor.name,
			league: leagues.filter((value)=>value.country ===  valor.country).map((value)=>value.name).join('')
		}
	})

	const  reformattedArray = teamsLeagueList.map(function(value){ 
		let response = {};
		response[value.league] = {
			name: value.name
		};
		return response;
	})
	return reformattedArray
}
/**
 * @name sortTeamsByWinsFilter
 * @method function
 * @description Filtro para poder agregar elementos al array sin alterrar el real. 
 * @param teams, winsByTeams
 * @author Osirus=>CQ:)
 */
function sortTeamsByWinsFilter (teams, winsByTeams){
	const listTeamsByWins = teams.map((teams)=>{
		return {
			name : teams.name,
			wins : winsByTeams.filter((value)=>teams.id === value.teamId).map((value)=>value.wins).join(''),
		}
	}).sort((a,b)=>b.wins - a.wins)
	return listTeamsByWins
}

/*
  SECCIÓN PROBLEMAS
    - Las siguientes son preguntas básicas de Javascript y manejo de datos. Se evaluará eficiencia, ORDEN y claridad del código entregado.
    - Se debe programar un algoritmo para cada método y que este retorne lo requerido.
    - Debe usar nombres explicativos para sus variables.
    - Usar sintaxis ES6.
    - Puede utilizar funciones auxiliares como apoyo para tener una descomposición de código mas clara al momento de lectura.
    - Su prueba debe ejecutarse sin errores con: node logic-test.js
*/
// 0 Arreglo con los ids de los equipos (función de ejemplo)
function listTeamsIds () {
	return teams.map((client) => client.id)
}

// 1 Arreglo con los nombres de los equipos y el país al que pertenecen, ordenados alfabéticamente por el nombre de su país de origen.
function listTeamsByCountry () {
	const listTeams = teams.map((listTeams)=>{
		return {
			name: listTeams.name,
			country: listTeams.country
		}
	}).sort((a, b) => a.country.localeCompare(b.country))
	return listTeams
}
// 2 Arreglo con los nombres de los equipos ordenados de mayor a menor por la cantidad de victorias en champions league.
function sortTeamsByWins () {
	return sortTeamsByWinsFilter(teams, winsByTeams)
}
// 3 Arreglo de objetos en donde se muestre el nombre de las ligas y la sumatoria de las victorias de los equipos que pertenecen a ellas.
function leaguesWithWins () {
	const listLeaguesWithWins = winsByTeams.map((winsByTeams)=>{
		return {
			wins: winsByTeams.wins,
			liga: teamsByLeague
			.filter((teamsByLeague)=> teamsByLeague.teamId === winsByTeams.teamId)
			.map((valor)=>valor.leagueId).join('')
		}
	})

	const groupListLeaguesWithWins = listLeaguesWithWins
		.reduce((a, b) => Object
		.assign(a, {[b.liga]:( a[b.liga] || [] )
		.concat(b.wins) }), {})
	const response  = leagues.map((leagues)=>{
		return {
			league : leagues.name,
			totalWins: groupListLeaguesWithWins[leagues.id].reduce((a,b) => a + b, 0)
		}
	})
	return response
}

// 4 Objeto en que las claves sean los nombres de las ligas y los valores el nombre del equipo con la menor cantidad de victorias en champions.
function leaguesWithTeamWithLestWins () {
	return filter(1)
}
// 5 Objeto en que las claves sean los nombres de las ligas y los valores el nombre del equipo con la mayor cantidad de victorias en champions.
function leaguesWithTeamWithMostWins () {
	return filter(13)
}
// 6 Arreglo con los nombres de las ligas ordenadas de mayor a menor por la cantidad de victorias de sus equipos.
function sortLeaguesByTeamsByWins () {
	const listLeaguesWithWins = winsByTeams.map((winsByTeams)=>{
		return {
			wins: winsByTeams.wins,
			liga: teamsByLeague
        	.filter((teamsByLeague)=> teamsByLeague.teamId === winsByTeams.teamId)
        	.map((valor)=>valor.leagueId).join('')
    	}
	})
	const groupListLeaguesWithWins = listLeaguesWithWins
		.reduce((a, b) => Object
		.assign(a, {[b.liga]:( a[b.liga] || [] )
		.concat(b.wins) }), {})

    const leagueSumTeams  = leagues.map((leagues)=>{
		return {
        	name : leagues.name,
        	totalWins: groupListLeaguesWithWins[leagues.id].reduce((a,b) => a + b, 0)
		}
	}).sort((a,b)=>b.totalWins - a.totalWins)

    const  reformattedLeagueArray = leagueSumTeams.map(function(value){
        const   response = {};
        response[value.name] = value.totalWins
        return response;
    })
    return reformattedLeagueArray
}
// 7 Arreglo con los nombres de las ligas ordenadas de mayor a menor por la cantidad de equipos que participan en ellas.
function sortLeaguesByTeams () {
	const listTeamsByLeague = teamsByLeague.map((value)=>{
    	return {
			name: leagues.filter((valuex)=>valuex.id === value.leagueId).map((value)=>value.name).join(''),
			team: teams.filter((valuex)=>valuex.id === value.teamId).map((value)=>value.name).join('')
    	}
	})

	const grouping = listTeamsByLeague.reduce((a, b) => Object.assign(a, {[b.name]:( a[b.name] || [] ).concat(b.team) }), {})

	const league = leagues.map((valor)=>{
    	return {
			name: valor.name,
			totalTeam: grouping[valor.name].length
    	}
	}).sort((a,b)=>b.totalWins - a.totalWins)
	
	return league;
}

// 8 Agregar un nuevo equipo con datos ficticios a "teams", asociarlo a la liga de Francia y agregar un total de 4 victorias en champions.
// Luego devolver el lugar que ocupa este equipo en el ranking de la pregunta 2.
// No modificar arreglos originales para no alterar las respuestas anteriores al correr la solución
function newTeamRanking () {
	teams.push({ id: 14, country: 'France', name: 'Lille' })
	teamsByLeague.push({ teamId: 14, leagueId: 7 })
	winsByTeams.push({ teamId: 14, wins: 4 })
	return sortTeamsByWinsFilter(teams, winsByTeams).findIndex( valor => valor.name === 'Lille' );
}

// 9 Realice una función que retorne una promesa con los nombres de los equipos en upper case.
// haga la llamada a la función creada desde esta función y asignarle la respuesta a la variable response.
// recuerde que debe esperar el retorno de función asíncrona para que su resultado pueda ser mostrado por el
// console.log. Utilice async await para la llamada asíncrona a la función.
// NOTA: solo debe crear la función asíncrona y agregar la llamada en la siguiente función.

function getTeamsNamesAsUpperCaseAux(teams) { 
	return new Promise(resolve => {
		resolve(teams);
	});
}
async function getTeamsNamesAsUpperCase() {
	let response = null
	try{
		response = await getTeamsNamesAsUpperCaseAux( teams.map((value)=>value.name.toUpperCase()) );
	}catch(err) {
    	response = await 'error : ', err;
	}
	console.log('response:')
	console.log(response)
}
//getTeamsNamesAsUpperCase()

// Impresión de soluciones. No modificar.
console.log('Pregunta 0')
console.log(listTeamsIds())
console.log('Pregunta 1')
console.log(listTeamsByCountry())
console.log('Pregunta 2')
console.log(sortTeamsByWins())
console.log('Pregunta 3')
console.log(leaguesWithWins())
console.log('Pregunta 4')
console.log(leaguesWithTeamWithLestWins())
console.log('Pregunta 5')
console.log(leaguesWithTeamWithMostWins())
console.log('Pregunta 6')
console.log(sortLeaguesByTeamsByWins())
console.log('Pregunta 7')
console.log((sortLeaguesByTeams()))
console.log('Pregunta 8')
console.log((newTeamRanking()))
console.log('Pregunta 9')
getTeamsNamesAsUpperCase()
