<template>
    <div>
        <div class="invalid-feedback" v-for="(error,index) in errors" :key="index">{{error}}</div>
    </div>
</template>

<script>
export default {
    props:['errors']
}
</script>

<style scoped>
.form-control.is-invalid ~ div > .invalid-feedback{
    display: block;
}
</style>