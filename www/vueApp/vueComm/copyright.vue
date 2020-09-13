<template>
    <div class="mb-2">Copyright &#169; {{owner}} {{year()}}</div>
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