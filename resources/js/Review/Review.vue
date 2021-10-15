<template>
    <success v-if="success"></success>
    <fatal-error v-else-if="error"></fatal-error>
    <div class="row" v-else>
        <div :class="[{'col-md-4': twoColumn},{'d-none': oneColumn}]">
            <div class="card">
                <div class="card-body">
                    <div v-if="loading" >Loading...</div>
                    <div v-if="hasBooking">
                        <p>
                            Stayed at <router-link :to="{name: 'bookable', params:{id: booking.bookable.id}}">{{booking.bookable.title}}</router-link>
                        </p>
                        <p>From {{booking.from}} To {{booking.to}} </p>
                    </div>
                </div>
            </div>
        </div>
        <div :class="[{'col-md-8': twoColumn},{'col-md-12': oneColumn}]">
            <div v-if="loading">
                Loading...
            </div>
            <div v-else>
                <div v-if="alreadyReviewed">
                    <h3>You've already Reviewed this booking!!</h3>
                </div>
                <div v-else>
                    <div class="form-group">
                        <label for="text-muted">Select the star rating (1 is worst - 5 is best)</label>
                        <star-rating  class="fa-3x"  v-model="review.rating"></star-rating>
                    </div>
                    <div class="form-group">
                        <label for="content" class="text-muted">Describe your experiense</label>
                        <textarea name="content" cols="30" rows="10" class="form-control" v-model="review.content" :class="[{'is-invalid': errorFor('content')}]">></textarea>
                        <v-errors :errors="errorFor('content')"></v-errors>
                    </div>

                    <button class="btn btn-lg btn-secondary btn-block" @click.prevent="submit" :disabled="sending">Submit</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import {is404, is422} from './../Shared/utils/response';
import validationErrors from './../Shared/mixins/validationErrors';

export default {
    mixins:[validationErrors],
    data(){
        return{
            review:{
               id:null, 
               rating:5, 
               content:null
            },
            existingReview:null,
            loading:false,
            booking:null,
            error: false,
            sending:false,
            success:false
        }  
    },
    async created(){
        this.review.id = this.$route.params.id;
        this.loading = true;
        this.success = false;

        try {
            this.existingReview = (await axios.get(`/api/reviews/${this.review.id}`)).data;
        } 
        catch(err){
            if(is404(err)){
                try {
                    this.booking = (await axios.get(`/api/booking-by-review/${this.review.id}`)).data;
                } 
                catch(err){
                    if(is404(err)){
                        this.error = true;
                    }
                }
                
            } else{
                this.error = true;
            }

        }

        this.loading = false;
    },
    computed:{
        alreadyReviewed(){
            return this.existingReview && !this.booking;
        },
        hasReview(){
            return this.existingReview != null;
        },
        hasBooking(){
            return this.booking != null;
        },
        twoColumn(){
            return this.loading || !this.alreadyReviewed
        },
        oneColumn (){
            return !this.loading && this.alreadyReviewed
        }           
    },
    methods:{
        submit(){
            this.errors = null;
            this.sending= true;
            axios.post(`/api/reviews`, this.review)
            .then(response => {
                this.success = (201 ==  response.status);
            })
            .catch(err => {
                if(is422(err)){
                    const errors = err.response.data.errors;

                    if(errors["content"] && 1 == _.size(errors)){
                        this.errors = errors;
                        return;
                    }

                }

                this.error = true;
            })
            .then(() => (this.sending = false));
        }
    }
}
</script>

