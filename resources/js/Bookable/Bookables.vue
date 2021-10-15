<template>
    <div>
        <div v-if="loading">
            Data is loading...
        </div>
        <div v-else>
            <div class="row mb-4" v-for="row in rows" :key="'row' + row">
                <div class="col d-flex align-items-stretch" v-for="(bookable,column) in bookablesInRow(row)" :key="'column ' + column">
                    <bookable-list-item 
                    :bookable="bookable"
                    ></bookable-list-item>
                </div>
                <div class="col " v-for="p in placeholdersInRow(row)" :key="'placeholder' + p"></div>
            </div>
        </div>
    </div>
</template>

<script>
import BookableListItem from './BookableListItem.vue'
export default {
    components:{
        BookableListItem
    },
    data(){
        return{
            bookables: null,
            loading:true,
            columns:3
        }
    },
    computed:{
        rows(){
            return this.bookables === null? 0: Math.ceil(this.bookables.length / this.columns);
        }
    },
    methods:{
        bookablesInRow(row){
            return this.bookables.slice((row-1) * this.columns, row * this.columns);
        },
        placeholdersInRow(row){
            return this.columns - this.bookablesInRow(row).length;
        }
    },
    created(){
        // const p = new Promise((resolve, reject) => {
        //     setTimeout(() => resolve("Hello"), 300);
        // });

        // p.then(result => console.log(`Sucess`));

        axios.get("/api/bookables").then(response => {
            this.bookables = response.data;
            this.loading = false;
        });

   
    }
}
</script>