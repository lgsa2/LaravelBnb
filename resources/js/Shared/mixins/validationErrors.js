export default {
    data() {
        return {
            errors: null
        };
    },
    methods: {
        errorFor(field) {
            return this.hasErrors && this.errors[field] ? this.errors[field] : null;
        }
    }
};