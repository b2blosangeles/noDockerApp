<template>
    <div class="mb-2">{{owner}}  &#169; {{year()}}</div>
</template>

<script>
module.exports = {
    props: [],
    data: function() {
        return {
            owner:this.$parent.owner
        }
    },
    
    methods : {
        year() {
            return new Date().getFullYear();
        }
    }
}
</script>

<style>

</style>