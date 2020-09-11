$(document).ready(
    function() {
        var vueRootCommon = {solution: ''};
        var componentsLoader = function(cfg){
            let r = {};
            if (cfg.TPL) {
                for (var o in cfg.TPL) {
                    let uri2 = cfg.TPL[o].replace(/\/([^/]+)$/, '/');
                   // alert(uri2);
                    r[o] =  httpVueLoader('data:text/plain;[' + uri2 + '-' + o +']' + _TPL[cfg.TPL[o]])
                }    
            }
            for (var o in cfg.LOAD) {
                r[o] =  httpVueLoader(cfg.LOAD[o]);
            }
            return r;
        }
        /*
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
            components: componentsLoader({
                LOAD :{
                    'appMaster' : {
                        'popUpModal': 'popUpModal.vue',
                        'dataEngine': 'dataEngine.vue',
                        'spinner'   : 'spinner.vue',
                        'header' : 'appHeader.vue',
                        'form'   : 'vForm.vue'
                    }
                }
            })
        });
        */
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
            components: componentsLoader({
                    LOAD: {
                    }, 
                    TPL :{
                        'popUpModal': '/vueApp/appService/popUpModal.vue',
                        'appHeader' : '/vueApp/appService/appHeader.vue',
                        'dataEngine': '/vueApp/appService/dataEngine.vue',
                        'spinner'   : '/vueApp/appService/spinner.vue',
                        'appForm'   : '/vueApp/appService/vForm.vue',
                        'copyright' : '/vueApp/vueComm/copyright.vue'
                    }
            })
        });
    }
) 
