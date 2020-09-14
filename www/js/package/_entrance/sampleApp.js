$(document).ready(
    function() {
        var vueRootCommon = {solution: ''};
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
                VueLoader.dynamic({'copyright' : '/vueApp/vueComm/copyright.vue'}, this);
                this.$forceUpdate();
            },
            methods : {
            },
            components: VueLoader.components({
                PARKING : {

                },
                TPL     : {
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
            components: VueLoader.components({
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
            components: VueLoader.components({
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
