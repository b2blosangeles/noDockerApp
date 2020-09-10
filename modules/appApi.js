(function () { 
	var obj =  function (env, pkg, req, res) {
        var fs = require('fs'),
            me = this;
		
		this.call = function(rest, p, data) {
            res.send({rest:rest, p : p, data: data, dir: __dirname, env : env });
		};	
	};
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = obj;
	} 

})();
