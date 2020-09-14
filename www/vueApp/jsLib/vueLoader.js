var VueLoader = {};
VueLoader.components = function(cfg){
    let r = {};
    if (cfg.TPL) {
        for (var o in cfg.TPL) {
            if (!_TPL.vue[cfg.TPL[o]]) {
                continue;
            } else {
                r[o] =  httpVueLoader(_TPL.vue[cfg.TPL[o]])
            }
        }    
    }
    for (var o in cfg.LOAD) {
        r[o] =  httpVueLoader(cfg.LOAD[o]);
    }
    return r;
};

VueLoader.dynamic = function(v, o){
    for (var k in v) {
        let uri = v[k].replace(/\/([^/]+)$/, '/');
        if (!uri || uri === '/' || !k)  {
            continue;
        } else {
            var tpl = (!_TPL.vue[k]) ? httpVueLoader(v[k]) : httpVueLoader('data:text/plain;[' + uri + ']' + _TPL.vue[k]);
            if (!o) {
                Vue.component(k, tpl);
            } else {
                o.$options.components[k] = tpl;
            }
        }
    }       
};