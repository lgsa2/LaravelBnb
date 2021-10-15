<template>
    <div class="d-flex fa-lg">
        <i class="fas fa-star pointer" v-for="i in fullStar" :key="i + 'full'" @click="$emit('input', i)"></i>
        <i class="fas fa-star-half-alt pointer" v-if="halfStar"></i>
        <i class="far fa-star pointer" v-for="i in emptyStar" :key="i + 'empty'" @click="$emit('input', fullStar + i)"></i>
    </div>
</template>

<script>
export default {
    props:{
        value:Number
    },
    computed:{
        halfStar(){
            return false;
        },
        fullStar(){
            return Math.round(this.value);
        },
        emptyStar(){
            return 5 - Math.ceil(this.value);
        }
    }
}
</script>

<style scoped>
.pointer {
    cursor: pointer;
}
</style>