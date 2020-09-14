<template>
<div class="card shadow m-2 mr-1 mt-0 mb-0" v-if="isError() || isWarning()">
    <div class="card-body card-master-section text-left alert-danger" v-if="isError()">
        <div v-for="o in  toArray($parent.vueRootCommon.debug.error)">{{ o.v}}</div>
    </div>
    <div class="card-body card-master-section text-left alert-warning" v-if="isWarning()">
        <div v-for="o in toArray($parent.vueRootCommon.debug.warning)">{{ o.v}}</div>
    </div>
</div>
</template>

<script>
module.exports = {
    props: ['vueRootCommon'],
    data: function() {
        return {
        }
    },
    mounted() {},
    methods : {
        toArray(obj) {
            let list = [];
            for (o in obj) {
                list.push({k : o, v : obj[o]});
            }
            return list;
        },
        isError() {
            return (this.$parent.vueRootCommon.debugModel) && ((!Object.keys(this.$parent.vueRootCommon.debug.error).length ) ? false : true);
        },
        isWarning() {
            return (this.$parent.vueRootCommon.debugModel) &&  ((!Object.keys(this.$parent.vueRootCommon.debug.warning).length) ? false : true);
        }
    }
}
</script>

<style>
</style>