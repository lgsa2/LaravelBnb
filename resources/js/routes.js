import VueRouter from 'vue-router';
import Bookables from './Bookable/Bookables.vue';
import Bookable from './OneBookable/Bookable.vue';
import Review from './Review/Review.vue';
import Basket from './Basket/Basket.vue';

const routes = [{
        path: "/",
        component: Bookables,
        name: "home"
    },
    {
        path: "/bookable/:id",
        component: Bookable,
        name: "bookable"
    },
    {
        path: "/reviews/:id",
        component: Review,
        name: "Review"
    },
    {
        path: "/basket",
        component: Basket,
        name: "basket"
    }
];

const router = new VueRouter({
    routes: routes,
    mode: "history"
});

export default router;