<template>
    <div>
        <h6 class="text-uppercase text-secundary font-weight-bolder">Price breakdown</h6>

        <div v-for="(days,price) in price.breakdown" 
        :key="price"
        class="pt-2 pb-2 border-bottom border-top d-flex justify-content-between">
            <span>{{ days }} x ${{ price }}</span>
            <span>${{ days*price }}</span>
        </div>

        <div class="font-weight-bolder d-flex justify-content-between"> 
            <span>Total</span>  
            <span>{{value}}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        price: Object,
    },
    data(){
        return {
            value:''
        }
    },
    watch:{
        price(){
            this.value = this.price.total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        }
    },
    created(){
        this.value = this.price.total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    }
};
</script>