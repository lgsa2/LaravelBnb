<template>
    <div class="card">
        <div class="card-body w-100">
            <router-link :to="{ name: 'bookable', params:{ id: bookable.id } }">
                <h5 class="card-title"> {{ bookable.title }}</h5>
            </router-link>
            <p class="card-text">{{ bookable.description }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props:{bookable : Object}
}
</script>