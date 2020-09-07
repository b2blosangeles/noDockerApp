var vueApp = {};
vueApp.execDelet = function(serverName) {
    var me = this;
    $.ajax({
        type: 'POST',
        url:'/api',
        data: {
            cmd :'deleteHost',
            serverName :serverName
        },
        success: function(result) {
            if (result.status !== 'success') {
                vueApp.showErrorMessage(result.message);
            } else {
                me.refreshList(result.list);
                vueApp.showErrorMessage('');
            }
            $('#confirm_modal').html('');
            $('#confirm_modal').modal('hide');
        },
        dataType: 'JSON'
    });
};

vueApp.formData = function() {
    var object = {};
    var formData = $('form').serializeArray();
    for (o in formData) {
        object[formData[o].name] = formData[o].value;
    };
    return (!object['serverName'] || !object['gitHub']) ? false : object;
}
vueApp.resetForm = function() {
    $('form').trigger("reset");
    this.showErrorMessage('');
}
vueApp.addHost = function() {
    var me = this;
    var data = vueApp.formData();
    if (!data) {
        me.showErrorMessage('Wong form data!');
    } else {
        $.ajax({
            type: 'POST',
            url:'/api',
            data: {
                cmd :'addHost',
                data: vueApp.formData()
            },
            success: function(result) {
                if (result.status !== 'success') {
                    vueApp.showErrorMessage(result.message);
                } else {
                    me.resetForm();
                } 
            },
            dataType: 'JSON'
        });
    }
};
vueApp.loadList = function() {
    var me = this;
    $.ajax({
        type: 'POST',
        url:'/api',
        data: {
            cmd :'loadList'
        },
        success: function(result) {
            me.refreshList(result.list);
        },
        dataType: 'JSON'
    });
}

vueApp.showErrorMessage = function(str) {
    $('#error_section').html(str)
}
$(document).ready(
    function() {
        
        new Vue({
            el: '#vHostApp',
            data: function() {
                return {
                    commonData :{
                        list : [],
                        dockers : [],
                        popUp : {
                            serverName : ''
                        },
                        formStarted : false
                    },
                    triggerSpinner : false,
                    module : 'list'
                }
            },
            methods :{
                dataEngine() {
                    return this.$refs.dataEngine
                }
            },
            components: {
                'popUpModal': httpVueLoader('/js/vueApp/popUpModal.vue'),
                'dataEngine': httpVueLoader('/js/vueApp/dataEngine.vue'),
                'spinner'   : httpVueLoader('/js/vueApp/spinner.vue'),
                'appHeader' : httpVueLoader('/js/vueApp/appHeader.vue')
            }
        });
    }
) 
