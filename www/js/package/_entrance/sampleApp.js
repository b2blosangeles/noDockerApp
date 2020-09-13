$(document).ready(
    function() {
        var vueRootCommon = {solution: ''};
        var componentsLoader = function(cfg){
            let r = {};
            if (cfg.TPL) {
                for (var o in cfg.TPL) {
                    let uri = cfg.TPL[o].replace(/\/([^/]+)$/, '/');
                    r[o] =  httpVueLoader('data:text/plain;[' + uri +']' + _TPL[cfg.TPL[o]])
                }    
            }
            for (var o in cfg.LOAD) {
                r[o] =  httpVueLoader(cfg.LOAD[o]);
            }
            return r;
        };

        var dynamicLoaderComponent = function(v, o){
            for (var k in v) {
                let uri = v[k].replace(/\/([^/]+)$/, '/');
                if (!uri || uri === '/' || !k)  {
                    continue;
                } else {
                    var tpl = (!_TPL[k]) ? httpVueLoader(v[k]) : httpVueLoader('data:text/plain;[' + uri + ']' + _TPL[k]);
                    if (!o) {
                        Vue.component(k, tpl);
                    } else {
                        o.$options.components[k] = tpl;
                    }
                }
            }       
        };

        new Vue({
            el: '#vAppMaster',
            data: function() {
                return {
                    owner : 'shusiou.win 2.0'
                }
            },
            created() {

            },
            mounted () {
                dynamicLoaderComponent({'copyright' : '/vueApp/vueComm/copyright.vue'}, this);
                this.$forceUpdate();
            },
            methods : {
            },
            components: componentsLoader({
                PARKING : {

                },
                TPL     :{
                //    'copyright' : '/vueApp/vueComm/copyright.vue'
                }
            })
        });
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
                    vueRootCommon :  (typeof vueRootCommon === 'undefined')? {} : vueRootCommon,
                    owner : 'shusiou.win 1.0'
                }
            },
            mounted () {
               // console.log(this.components);
            },
            methods :{
                dataEngine() {
                    return this.$refs.dataEngine
                }
            },
            components: componentsLoader({
                    LOAD    : {
                    }, 
                    TPL     :{
                        'popUpModal': '/vueApp/appService/popUpModal.vue',
                        'appHeader' : '/vueApp/appService/appHeader.vue',
                        'dataEngine': '/vueApp/appService/dataEngine.vue',
                        'spinner'   : '/vueApp/appService/spinner.vue',
                        'appForm'   : '/vueApp/appService/vForm.vue',
                        'fileUpload': '/vueApp/vueComm/fileUpload/fileUpload.vue'
                    }
            })
        });
    }
) 
