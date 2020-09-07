var vueApp = {};

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

vueApp.showErrorMessage = function(str) {
    $('#error_section').html(str)
}
$(document).ready(
    function() {
        var componentsLoader = function(app, list){
            let r = {};
            for (o in list) {
                r[o] = httpVueLoader('/js/vueApp/' + app + '/' + list[o]);
            }
            return r;
        }
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
            components: componentsLoader('app', {
                'popUpModal': 'popUpModal.vue',
                'dataEngine': 'ataEngine.vue',
                'spinner'   : 'spinner.vue',
                'appHeader' : 'appHeader.vue',
                'appForm'   : 'vForm.vue'
            })
        });

        new Vue({
            el: '#vHostApp2',
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
                },
                moduleEngine(m) {
                    httpVueLoader('/js/vueApp/app2/' + m);
                }
            },
            components: componentsLoader('app2', {
                'popUpModal': 'popUpModal.vue',
                'dataEngine': 'ataEngine.vue',
                'spinner'   : 'spinner.vue',
                'appHeader' : 'appHeader.vue',
                'appForm'   : 'vForm.vue'
            })
        });
    }
) 
