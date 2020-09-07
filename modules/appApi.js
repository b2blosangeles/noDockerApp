(function () { 
    

	var obj =  function (env, pkg, req, res) {
        var fs = require('fs'),
            me = this;
		
		this.run = function(p) {
            res.send(p);
            // res.send({dir: __dirname, env : env, param : req.params, query: req.query});
		};	
	};
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = obj;
	} 

})();
