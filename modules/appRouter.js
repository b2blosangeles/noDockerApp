(function () { //
	var obj =  function (env, pkg, req, res) {
		let fs = require('fs');
		let me = this;

		this.route = (rest) => {
			let p = req.params[0],
				mp = p.match(/\/([^\/]+)(\/|$)/);

			if (mp && mp[1] === 'api') {
				let API = pkg.require(__dirname + '/appApi.js');
				let api = new API(env, pkg, req, res);
				var data = (rest === 'get') ? req.query : req.body;
				api.call(rest, p, data);
				return true
			}
			if (mp && mp[1] === 'spa-package') {
				let SPA = pkg.require(__dirname + '/appSpaPackage.js');
				let spa= new SPA(env, pkg, req, res);
				spa.call(p);
				return true
			}
			if (p == '/') {
				var fn = env.root + '/www/index.html';
				res.sendFile(fn);
				return true
			} else {
				var fn = env.root + '/www' + p;
				fs.stat(fn, function(err, stat) {
					if(err == null) {
						res.sendFile(fn);
					} else  {
						res.render(env.root  + '/views/html/page404.ect');
					}
				});
			}
		}
	};
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = obj;
	} 

})();
