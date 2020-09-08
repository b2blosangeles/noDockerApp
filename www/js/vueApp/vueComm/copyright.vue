<template>
    <div class="hello">Copyright &#169; {{year()}}</div>
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
            return 2018
        }
    }
}
</script>

<style>
.hello {
    background-color: #ffe;
}
</style>