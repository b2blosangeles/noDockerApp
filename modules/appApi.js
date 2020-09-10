(function () { 
	var obj =  function (env, pkg) {
        var fs = require('fs'),
            me = this;
		
		this.call = function(rest, incomeData, callback) {
            callback({mark : 'A', incomeData: incomeData, dir: __dirname, env : env });
		};	
	};
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = obj;
	} 

})();
