(function () { 
	var obj =  function (env, pkg, req, res) {
        var fs = require('fs'),
            me = this;
		
		this.call = function(p, data) {
            res.send({p : p, data: data, dir: __dirname, env : env });
		};	
	};
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = obj;
	} 

})();
