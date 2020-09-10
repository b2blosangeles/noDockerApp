<template>
    <div class="card shadow m-2  banner-bg">
        <div class="card-body alert-default border border-default">
            <div class="container-fluid m-0">
                <div class="row">
                    <div class="col-2 p-0 m-0 text-left">
                        <form>
                            <div class="form-group">
                                <!--label>Select</label-->
                                <select class="form-control mt-6" :required="true" @change="onSelect($event)" v-model="form.branch">
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
                    <div class="col-8 p-6 m-0 text-center">
                            <h1 class="mt-3">Vue.JS SPA Service {{ $parent.vueRootCommon.solution }}</h1>
                    </div>
                    <div class="col-2 p-0 m-0 text-right">
                        <!--a class="btn btn-sm btn-success m-1 pull-right" href="JavaScript:void(0)" v-on:click="loadForm()">
                                Form
                        </a-->
                    </div>
                </div>
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
            branches : [{k:'a', v:'solution A'}, {k:'b', v:'solution B'}],
            form : {
                serverName  : '',
                branch      : ''
            }
        }
    },
    mounted() {
    },
    methods :{
        loadForm() {
            var me = this;
            me.$parent.module = (me.$parent.module === 'form') ? 'list' : 'form';
        },
        onSelect(even) {
            this.$parent.vueRootCommon.solution = event.target.value;
        },
    }
}
</script>
 
<style>
.banner-bg {
    background-repeat: no-repeat;
    background-image: url("/images/banner-bg.jpg"); 
    background-size: cover;
}
</style>
