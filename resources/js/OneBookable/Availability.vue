<template>
    <div>
        <h6 class="text-uppercase text-secundary font-weight-bolder"> 
        Check Availability
        <transition name="fade">
            <span v-if="noAvailability" class="text-danger">(NOT AVAILABLE)</span>
            <span v-if="hasAvailability" class="text-success">(AVAILABLE)</span>
        </transition>
        </h6>

        <div class="form-row">
            <div class="form-group col-md-6">
              <label for="from">From </label>
              <input 
              type="date" 
              name="from" 
              id="from" 
              class="form-control form-control-sm" 
              placeholder="Start Date" 
              v-model="from"
              :class="[{'is-invalid':errorFor('from')}]">
              <v-errors :errors="errorFor('from')"></v-errors>
            </div>

            <div class="form-group col-md-6">
              <label for="to">To </label>
              <input 
              type="date" 
              name="from" 
              id="from" 
              class="form-control form-control-sm" 
              placeholder="End Date" 
              v-model="to"
              :class="[{'is-invalid':errorFor('to')}]">
              <v-errors :errors="errorFor('to')"></v-errors>
            </div>
        </div>
        <button type="button" class="btn btn-secondary btn-block" @click="check" :disabled="loading">
            <span v-if="!loading">Check</span>
            <span v-else><i class="fas fa-circle-notch fa-spin"></i> Checking...</span>
        </button>
    </div>

</template>

<script>
import validationErrors from './../Shared/mixins/validationErrors';
import {is404, is422} from './../Shared/utils/response';
export default {
    mixins:[validationErrors],
    props:{
        bookableId: [String, Number]
    },
    data(){
        return{
            to: this.$store.state.lastSearch.to,
            from: this.$store.state.lastSearch.from,
            loading:false,
            status:null
        };
    },
    methods:{
        async check(){
            this.loading = true;
            this.errors = null;

            this.$store.dispatch('setLastSearch',{
                from:this.from,
                to: this.to
            });

            try {
                this.status = (await axios.get(`/api/bookables/${this.bookableId}/availability?from=${this.from}&to=${this.to}`)).status;
                this.$emit('avaibility', this.hasAvailability);
            } catch (error) {
                if(is422(error)){
                    this.errors = error.response.data.errors;
                }

                this.status = error.response.status;
                this.$emit('avaibility', this.hasAvailability);

            }

            this.loading = false;
        }
    },
    computed:{
        hasErrors(){
            return 422 == this.status && this.errors!= null;
        },
        hasAvailability(){
            return 200 == this.status;
        },
        noAvailability(){
            return 404 == this.status;
        }
    }
}
</script>

<style scoped>

label{
    font-size: 0.7rem;
    text-transform: uppercase;
    color: gray;
    font: bolder;
}

</style>