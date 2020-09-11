<template>
</template>

<script>
module.exports = {
    props: ['commonData'],
    data: function() {
        return {
        }
    },
    created() {
        var me = this;
    },
    methods :{
        saveData(data, callback) {
            var me = this;
            me.$parent.triggerSpinner = true;
            $.ajax({
                type: 'POST',
                url:'/api',
                data: data,
                success: function(result) {
                    me.$parent.triggerSpinner = false;
                    if (result.status === 'success') {
                        // me.getVHostList();
                    }
                    callback(result); 
                },
                error: function (jqXHR, textStatus, errorThrown) { 
                    me.$parent.triggerSpinner = false;
                },
                dataType: 'JSON'
            });
        }
    }
}
</script>
 
<style>
</style>
