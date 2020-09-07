<template>
<div class="card shadow m-2 mr-1 mt-0 mb-0">
    <div class="card-body card-master-section text-left">
        <form>
            <div class="form-group">
                <label>Select</label>
                <select class="form-control" :required="true" @change="onSelect($event)" v-model="form.branch">
                    <option value="" :selected="form.branch === ''" >Select a solution</option>
                    <option 
                    v-for="option in branches" 
                    v-bind:value="option.k"
                    :selected="option.k == form.branch"
                    >{{ option.v }} ({{ option.k }})</option>
                </select>
            </div>
        </form>
    </div>
</div>
</template>
 
<script>
module.exports = {
    props: ['vueRootCommon'],
    data: function() {
        return {
            errors: {},
            branches : [{k:'a', v:'solution A'}, {k:'b', v:'solution B'}],
            form : {
                serverName  : '',
                branch      : ''
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
        onSelect(even) {
            this.$parent.vueRootCommon.solution = event.target.value;
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

.card-master-section { min-height: 6em; }

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
