$(document).ready(
    function() {
        var vueRootCommon = {solution: ''};
        var componentsLoader = function(cfg){
            let r = {};
            if (cfg.TPL) {
                for (var o in cfg.TPL) {
                    let uri2 = cfg.TPL[o].replace(/\/([^/]+)$/, '');
                    r[o] =  httpVueLoader('data:text/plain[' + uri2 + ']' + _TPL[cfg.TPL[o]])
                }    
            }
            
            for (var o in cfg.LOAD) {
                if (cfg.LOAD[o]) {
                    let uri = '/js/vueApp/' + o;
                    for (p in cfg.LOAD[o]) {
                        r[p] = httpVueLoader(uri + '/' + cfg.LOAD[o][p]);
                    }
                }
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
            components: componentsLoader({
                LOAD :{
                    'appMaster' : {
                        'popUpModal': 'popUpModal.vue',
                        'dataEngine': 'ataEngine.vue',
                        'spinner'   : 'spinner.vue',
                        'appHeader' : 'appHeader.vue',
                        'appForm'   : 'vForm.vue'
                    }
                }
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
            components: componentsLoader({
                    LOAD: {

                    }, TPL :{
                        'popUpModal': '/js/vueApp/appService/popUpModal.vue',
                        'dataEngine': '/js/vueApp/appService/ataEngine.vue',
                        'spinner'   : '/js/vueApp/appService/spinner.vue',
                        'appHeader' : '/js/vueApp/appService/appHeader.vue',
                        'appForm'   : '/js/vueApp/appService/vForm.vue',
                        'copyright' : '/js/vueApp/vueComm/copyright.vue'
                    }
            })
        });
    }
) 
