<template>
    <div class="mb-2">Copyright &#169; {{year()}}</div>
</template>

<script>
module.exports = {
    
    data: function() {
        return {
            who: 'world'
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