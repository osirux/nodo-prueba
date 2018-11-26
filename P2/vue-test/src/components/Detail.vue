<template>
    <div>
        <ul>
            <li>
                <a class="active" @click="volver" style=""> <strong> < </strong></a>
            </li>
        </ul>
        <h1 v-show="isLoading">Cargando Detalle...</h1>
        <div class="card">
            <div class="container">
                <!--Lo podria recorrer con v-for pero son tan pocos datos que no vale la pena-->
                <h2>Detalle</h2>
                <p>Id: {{detail._id}}</p>
                <p>Male: {{detail.male}}</p>
                <p>House: {{detail.house}}</p>
                <p>Slug: {{detail.slug}}</p>
                <p>Name: {{detail.name}}</p>
                <p>PageRank: {{detail.pageRank}}</p>
                <p>Books: {{detail.books != undefined ? detail.books[0] : ''}}</p>
                <p>Title: {{detail.titles != undefined ? detail.titles[0] : ''}}</p>
            </div>
        </div>
    </div>
</template>
<script>
    import store from "../store.js";
    export default {
        name: 'detail',
        data() {
            return {
                isLoading: false,
            }
        },
        /**
         * @description carga los datos desde el store a la vista.
         */
        computed: {
            detail: () => store.state.detail,
        },
        /**
         * @description este metodo sirve psra volver al inicio.
         */
        methods: {
            volver() {
                this.$router.push({
                    name: "list"
                })
            }
        }
    }
</script>
<style scoped>
    .card {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        transition: 0.3s;
        width: 40%;
        border-radius: 5px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
    }
    .card:hover {
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    }
    .container {
        margin: 0px auto;
        padding: 2px 16px;
    }
    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        background-color: #333;
    }
    li {
        float: left;
    }
    li a {
        display: block;
        color: white;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
    }
    li a:hover {
        background-color: #111;
    }
</style>