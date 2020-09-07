<template>
<div class="card shadow m-2 mr-1">
    <div class="card-body card-service-section text-left m-0 p-0">
        <div v-if="!isSolutionA() && !isSolutionB()" class="text-center">
            <img src="/images/underConstraction.jpg" />
        </div>
        <div class="m-2 p-2">
            <form v-if="isSolutionA()">
                <div class="form-group">
                    <label>Host ServerName *  {{$parent.vueRootCommon.solution }} </label>
                    <input type="text" class="form-control" maxlength="64" v-model="form.serverName" placeholder="Host ServerName">
                </div>
                <div class="form-group">
                    <label>Branche</label>
                    <select class="form-control" :required="true" @change="onBranchSelect($event)" v-model="form.branch">
                        <option 
                        v-for="option in branches" 
                        v-bind:value="option.branch"
                        :selected="option.branch ==  form.branch"
                        >{{ option.branch }}</option>
                    </select>
                </div>
            </form>

            <form v-if="isSolutionB()">
                <div class="form-group">
                    <label>Host ServerName *  {{$parent.vueRootCommon.solution }} </label>
                    <input type="text" class="form-control" maxlength="64" v-model="form.serverName" placeholder="Host ServerName">
                </div>
                <div class="form-group">
                    <label>Branche</label>
                    <select class="form-control" :required="true" @change="onBranchSelect($event)" v-model="form.branch">
                        <option 
                        v-for="option in branches" 
                        v-bind:value="option.branch"
                        :selected="option.branch ==  form.branch"
                        >{{ option.branch }}</option>
                    </select>
                </div>
            </form>
        </div>
    </div>
</div>
</template>
 
<script>
module.exports = {
    props: ['vueRootCommon'],
    data: function() {
        return {
            errors: {},
            publicDockers     : [],
            branches : null,
            form : {
                serverName  : '',
                gitHub      : '',
                branch      : '',
                siteDocker  : false,
                publicDocker: '',
                docker: {
                    type : '',
                    ports : [],
                    dockerFile : ''
                },
            }
        }
    },
    mounted() {
        var me = this;
        setTimeout(
            function() {
            }, 1000
        );
    },
    methods : {
        isSolutionA () {
            return (this.$parent.vueRootCommon.solution === 'a') ? true : false;
        },
        isSolutionB () {
            return (this.$parent.vueRootCommon.solution === 'b') ? true : false;
        },

        initForm() {
            var me = this;
            me.branches = null;
            me.form = {
                serverName  : '',
                gitHub      : '',
                branch      : '',
                siteDocker  : false,
                publicDocker: '',
                docker: {
                        type : '',
                        ports : [],
                        dockerFile : ''
                }
            };

        },
        cleanForm() {
            var me = this;
            me.branches = null;
            me.form.serverName = '';
            me.form.branch = '';
            me.form.siteDocker  = false;
            me.form.publicDocker = '';
            me.form.docker = {
                    type : '',
                    ports : [],
                    dockerFile : ''
                };

        },
        changedGit(e) {
            var me = this;
            me.cleanForm();
        },

        saveVHost() {
            var me = this;
        },

        reset() {
            var me = this;
            me.form = {};
            me.errors={};
            me.branches = [];
        },
        cancel() {
            var me = this;
            me.reset();
            me.$parent.module = (me.$parent.module === 'form') ? 'list' : 'form';
        },
        isformValid() {
            return true;
        }
    }
}
</script>
 
<style>
.card-service-section { min-height: 36em; }

.noFormImage {
    min-width: 100%;
    min-height :88px;
    /* background-image: url("/imgs/icon1.png"); */
    background-color: transparent;
    background-size: 100%;
    background-position: center;
    background-repeat: no-repeat;
}
.dropdown-pick-docker {
    height:20em;
    z-index: 3000;
    width: 800px !important; 
    overflow-y: scroll;
    overflow-x: hidden;
}

.bg-odd {  min-height : 6em; border-bottom: 1px dashed; border-color: #aaa;}
.bg-even {  min-height : 6em;  border-bottom: 1px dashed; border-color: #aaa; }
.border-width-1 {  border-width: 6px; border-color: #999}

input.dockerfile[readonly] {
  background-color:transparent;
}

</style>
