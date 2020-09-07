$(document).ready(
    function() {
        var vueRootCommon = {solution: ''};
        var componentsLoader = function(app, list){
            let r = {};
            for (o in list) {
                r[o] = httpVueLoader('/js/vueApp/' + app + '/' + list[o]);
            }
            return r;
        }
        new Vue({
            el: '#vAppMaster',
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
                    module : 'list',
                    vueRootCommon : (typeof vueRootCommon === 'undefined')? {} : vueRootCommon
                }
            },
            methods :{
                dataEngine() {
                    return this.$refs.dataEngine
                }
            },
            components: componentsLoader('appMaster', {
                'popUpModal': 'popUpModal.vue',
                'dataEngine': 'ataEngine.vue',
                'spinner'   : 'spinner.vue',
                'appHeader' : 'appHeader.vue',
                'appForm'   : 'vForm.vue',
            })
        });

        new Vue({
            el: '#vAppService',
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
                    module : 'list',
                    vueRootCommon :  (typeof vueRootCommon === 'undefined')? {} : vueRootCommon
                }
            },
            methods :{
                dataEngine() {
                    return this.$refs.dataEngine
                }
            },
            components: componentsLoader('appService', {
                'popUpModal': 'popUpModal.vue',
                'dataEngine': 'ataEngine.vue',
                'spinner'   : 'spinner.vue',
                'appHeader' : 'appHeader.vue',
                'appForm'   : 'vForm.vue'
            })
        });
    }
) 
