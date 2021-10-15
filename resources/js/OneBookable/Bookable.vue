<template>
    <fatal-error v-if="error"></fatal-error>
    <div v-else class="row">
        <div class="col-md-8">
            <div class="card">
                <div class="card-body">
                    <div v-if="!loading">
                        <h2>{{ bookable.title }}</h2>
                        <hr>
                        <article>{{ bookable.description }}</article>
                    </div>
                    <div v-else>loading...</div>
                </div>
            </div>
            <review-list :bookableId="this.$route.params.id"></review-list>
        </div>
        <div class="col-md-4"> 
            <availability :bookableId="this.$route.params.id" @avaibility="checkPrice($event)" class="mb-4"></availability>
            <transition name=fade>
                <price-breakdown v-if="price" :price="price" class="mb-4" ></price-breakdown>
            </transition>
            <transition-group name=fade>
                <button class="btn btn-outline-secondary btn-block" v-if="price" @click="addToBasket()" key="book" :disabled="inBasketAlreadyFromGetters">Book now</button>
                <button v-if="inBasketAlreadyFromGetters" class="btn btn-outline-secondary btn-block" @click="removeFromBasket()" key="remove">Remove from Basket</button>
            </transition-group>
            <div v-if="inBasketAlreadyFromGetters" class="mt-4 text-muted warning">
                Seems like you've added this object already
            </div>
        </div>
    </div>
</template>

<script>
import Availability from './Availability';
import ReviewList from './ReviewList';
import PriceBreakdown from './PriceBreakdown';
import { mapState } from 'vuex'
export default {
    components:{
        Availability,
        ReviewList,
        PriceBreakdown
    },
    data(){
        return{
            bookable:null,
            loading: false,
            error:false,
            price:null
        }
    },
    created(){
        this.loading = true;
        const id = this.$route.params.id;
        axios.get(`/api/bookables/${id}`).then(response => {
            this.bookable = response.data;
            this.loading = false;
        }).catch(err => {
            this.error = true;
        });

    },
    computed:{
    ...mapState({
        lastSearch: "lastSearch",
        // inBasketAlready(state) {
        //     if(null == this.bookable){
        //         return false;
        //     }

        //     return state.basket.items.reduce((result, item) => result || item.bookable.id == this.bookable.id, false);
        }),
        inBasketAlreadyFromGetters(){
            if(null == this.bookable){
                return false;
            }
            return this.$store.getters.inBasketAlready(this.bookable.id);
        }
    },
    methods:{
        async checkPrice(hasAvailability){
            if(!hasAvailability){
                this.price = null;
            }
            else{
                try {
                    this.price = (await axios.get(`/api/bookables/${this.bookable.id}/price?from=${this.lastSearch.from}&to=${this.lastSearch.to}`)).data.data;
                    console.log("Price Bookable - " + this.price.total);
                } catch (error) {
                    this.price = null;
                }
            }

        },
        addToBasket(){
            this.$store.dispatch("addToBasket",{
                bookable: this.bookable,
                price: this.price,
                dates: this.lastSearch
            });
        },
        removeFromBasket(){
            this.$store.dispatch("removeFromBasket", this.bookable.id);
        }
    }
}
</script>

<style scoped>
.warning{
    font-size: 00.7rem;
}
</style>