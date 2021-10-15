<template>
    <div>
        <nav class="navbar bg-white border-bottom navbar-light">
            <router-link class="navbar-brand mr-auto" to="/">LaravelBnb</router-link>
            <router-link class="btn nav-button" :to="{name: 'basket'}">
                Basket
                <span v-if="itemsInBasket" class="badge bg-light">{{ itemsInBasket }}</span>
            </router-link>
            <router-link class="btn nav-button" to="/bookable">Perfil</router-link>
        </nav>
        
        <div class="container mt-4 mb-4 pr-4 pl-4s">
            <router-view></router-view>
        </div>
        
    </div>
</template>


<script>
import { mapState, mapGetters } from 'vuex'

export default {
    data(){
        return{
            lastSearch : this.$store.state.lastSearch
        };
    },
    computed:{
        ...mapState({
            lastSearchComputed: state => state.lastSearch
        }),
        ...mapGetters({
            itemsInBasket: "itemsInBasket"
        })
    } 

}
</script>