(function () { 
	var obj =  function (env, pkg, req, res) {
        var fs = require('fs'),
            me = this,
			dirPatt = /\/spa\-package\//;
		this.call = function(p, data) {
			let spaDir = env.appFolder + '/www/js/package/';
			let cfgFn = spaDir + p.replace(dirPatt, '');
			let fileAttr = me.getConfigAttr(cfgFn);
			let cfg = {};
			try {
				cfg = pkg.require(fileAttr.fileName);
			} catch (e) {}
			me.sendHeader(fileAttr.type);
			if (fileAttr.type.indexOf(['js']) !== -1) {
				me.packJsFile(cfg);
				return true;
			} 
			me.packJsFile(cfg);
		};

		this.packJsFile = function(cfg) {
			var codeStr = 'if (!_TPL) var _TPL = {};' + "\n";
			var _f = {},
				appDir = env.appFolder + '/www';
			if (cfg.TPL) {
				for (var k in cfg.TPL) {
					_f['A_' + k] = (function(k) {
						return function(cbk) {
							fs.readFile(appDir + cfg.TPL[k], 'utf-8', (err, data)=> {
								cbk((err) ? false : data);
							});
						}
					})(k)
				}
			}
			if (cfg.JS) {
				for (var k in cfg.JS) {
					_f['B_' + k] = (function(k) {
						return function(cbk) {
							fs.readFile(appDir + cfg.JS[k], 'utf-8', (err, data)=> {
								cbk((err) ? false : data);
							});
						}
					})(k)
				}
			}
			var cp = new pkg.crowdProcess();
			cp.serial(
				_f,
				function(data) {
					codeStr += "/* ====== TPL code ====== */ \n"
					for (var k in cfg.TPL) {
						codeStr += "/* ===> " + cfg.TPL[k] + " */ \n\n";
						if (cp.data['A_' + k] !== false) {
							codeStr += '_TPL["' + cfg.TPL[k] + '"] = "' + encodeURIComponent(cp.data['A_' + k]) + '";' + "\n\n";
						}
					}
					codeStr += "/* ====== JS code ====== */ \n"
					for (var k in cfg.JS) {
						codeStr += "/* ===> " + cfg.JS[k] + " */ \n\n";
						if (cp.data['B_' + k] !== false) {
							codeStr += cp.data['B_' + k] + "\n\n";
						}
					}
					res.send(codeStr);
			}, 30000);

			return true;
			var me = this;
			var qaletBabel = false;
			var _f = {};
			var t_arr = [], t_json = {};
			if (o.tpls) {
				for (var i=0; i < o.tpls.length; i++) {
					t_json[o.tpls[i]] = true;
				}
			}
			/*-- prepare data set -> */
			var d_arr = [], d_json = {};
			if (o.data) {
				for (var i=0; i < o.data.length; i++) {
					d_json[o.data[i]] = true;
				}
			}			
			/* -- prepare data set */
			
			var rr = o.filelist, arr=[], main_list = {};
			for (var k in rr) {
				main_list[rr[k].replace(/\s/g,'')] = true;
			}
			var plus_arr = (!req.query.plus)?[]:(req.query.plus.split(','));
			if ((plus_arr[0]) && plus_arr[0].replace(/\s/g,'') === 'all' && typeof o.mservice == 'object') {
				plus_arr = [];
				for (var k in o.mservice) {
					plus_arr[plus_arr.length] = k;					
				}	
			}

			if ((o.dependence) && typeof o.dependence == 'object') {
				for (var k in plus_arr) {
					if (o.dependence[plus_arr[k]]) {
						var m = (typeof o.dependence[plus_arr[k]] === 'string')?o.dependence[plus_arr[k]].split(','):o.dependence[plus_arr[k]];
						for (var j=0; j < m.length; j++) {
							main_list[m[j].replace(/\s/g,'')] = true;
						}
						
					}
				}
			}	
			
			for (var k in main_list) {
				arr.push({path:k, code:''});
			}
			
			if ((o.mservice) && typeof o.mservice == 'object') {
				for (var k in plus_arr) {
					if (o.mservice[plus_arr[k]]) {
						var m = (typeof o.mservice[plus_arr[k]] === 'string')?o.mservice[plus_arr[k]].split(','):o.mservice[plus_arr[k]];
						for (var j=0; j < m.length; j++) {
							arr.push({path:m[j].replace(/\s/g,''), code:plus_arr[k]});
						}
						
					}
				}
			}				

			/* -- data process -- */
			
			if ((o.ms_data) && typeof o.ms_data == 'object') {
				for (var k in plus_arr) {
					if (o.ms_data[plus_arr[k]]) {
						var m = (typeof o.ms_data[plus_arr[k]] === 'string')?o.ms_data[plus_arr[k]].split(','):o.ms_data[plus_arr[k]];
						for (var j=0; j < m.length; j++) {
							d_json[m[j].replace(/\s/g,'')] = true;
						}
						
					}
				}
			}			
			
			for (var k in d_json) {
				d_arr.push(k);
			}
			if (d_arr) {
				for (var v in d_arr) {
					_f['_DATA_'+d_arr[v]] = (function(v) {
						var fn = space_root + '/files' + d_arr[v];
						return function(cbk) {
							pkg.fs.exists(fn,function(exists){
								if(exists){
									pkg.fs.readFile(fn,'utf8', function (err,data) {
										if (!err) {
											cbk('_DATA_["'+d_arr[v]+'"] = '+ me.miniCode(data) + ';');
										} else {
											cbk('');
										}
									});
								} else {
									cbk('');
								}
							});
						}

					})(v);
				}
			}	
			/* -- data process end -- */			
			
			
			/* -- tpl process -- */
			if ((o.ms_tpls) && typeof o.ms_tpls == 'object') {
				for (var k in plus_arr) {
					if (o.ms_tpls[plus_arr[k]]) {
						var m = (typeof o.ms_tpls[plus_arr[k]] === 'string')?o.ms_tpls[plus_arr[k]].split(','):o.ms_tpls[plus_arr[k]];
						for (var j=0; j < m.length; j++) {
							t_json[m[j].replace(/\s/g,'')] = true;
						}
						
					}
				}
			}			
			
			for (var k in t_json) {
				t_arr.push(k);
			}
			if (t_arr) {
				for (var v in t_arr) {
					_f['_tpl_'+t_arr[v]] = (function(v) {
						var fn = space_root + '/files' + t_arr[v];
						return function(cbk) {
							pkg.fs.exists(fn,function(exists){
								if(exists){
									pkg.fs.readFile(fn,'utf8', function (err,data) {
										if (!err) {
											cbk('_TPL_["'+t_arr[v]+'"] = decodeURIComponent("'+encodeURIComponent(data.replace(/\n|\r\n|\r/g, ' '))+'");');
										} else {
											cbk('');
										}
									});
								} else {
									cbk('');
								}
							});		
						}

					})(v);
				}
			}	
			/* -- tpl process end -- */			
			
			for (var v in arr) {
				_f['['+arr[v].code+']'+arr[v].path] = (function(v) {
					var fn = space_root + '/files' + arr[v].path;
					fn = fn.replace(/\/\//ig,'/');
					return function(cbk) {
						pkg.fs.exists(fn,function(exists){
							if(exists){
								if (fn.match(/\.(jsx)$/i)) {
									if (!qaletBabel) {
										var Babel  = require(env.root_path + "/package/qaletBabel/qaletBabel.js");
										qaletBabel = new Babel();
									}									
									pkg.fs.stat(fn, function(err, s){
									//	if (err) {
									//		cbk('console.log("'+err.message.replace('"', '')+'");');
									//	} else {
											me.pkCache.qaletBabel(fn, s.mtime.getTime(),
												cbk,
												qaletBabel
											);													
									//	}   
										
									});									
										
								} else {
									pkg.fs.readFile(fn,'utf8', function (err,data) {
											if (!err) {
												cbk(me.miniCode(data));
											} else {
												cbk('');
											}
										});
								}	
	
							} else {
								cbk('');
							}
						});		
					}

				})(v);
			}

			var cp = new pkg.crowdProcess();
			cp.serial(
				_f,
				function(data) {
					
					var str0 = 'if (!console) var console ={}; ';
					str0 += "if (!console.log) console.log =function() {}; \n";
					var _T = '', _D = '', _TC = '', _DC = '', _C = '', _CC = '';
			
					str0 += "/*==== Built time : " + ((!me.mini_code)?data._spent_time:'--') + " ms: ====*/\n\n"; 
					str0 += 'if (!_TPL_) var _TPL_ = {};' + "\n\n";
					str0 += 'if (!_DATA_) var _DATA_ = {}; ' + "\n\n";
					
					_T += '/*---- Template files: ';
					for (var k in t_arr) {
						_T += t_arr[k] + '; ';
						_TC += data.results['_tpl_'+t_arr[k]]+ "\n";
					}
					_T += " ----*/\n";

					_D += '/*---- Data files: ';
					for (var k in d_arr) {
						_D += d_arr[k] + '; ';
						//continue;
						var syntax = pkg.syntaxError(data.results['_DATA_' + d_arr[k]]);
						if (syntax) {
							_DC += 'console.log("Package error on data file ' + d_arr[k] + ' ->'+ '"); ' + "\n" +
							'console.log(decodeURIComponent("'+ encodeURIComponent(JSON.stringify(syntax)) + '"));' + "\n";
						} else {	
							_DC += data.results['_DATA_' + d_arr[k]]+ "\n";
						}
					}
					_D += " ----*/\n";
					
					var code_result = {}, path_result = {};
					for (var v in arr) {
						
						if (!path_result[arr[v].code]) path_result[arr[v].code] = '';
						path_result[arr[v].code] += arr[v].path + '; ';	

						if (!code_result[arr[v].code]) code_result[arr[v].code] = '';
						code_result[arr[v].code] += "\n/**** " + arr[v].path + " ****/\n" + data.results['['+arr[v].code+']'+arr[v].path]+ "\n";
						
					}	
					if (path_result['']) _C += '/*---- File list:' + path_result[''] + ' ----*/'+ "\n";
					if (code_result['']) _CC += "\n"+'/* --- Files: ---> */' + "\n\n" + 
						code_result[''] + "\n\n";
					
					var _CM = '';
					for (var k in path_result) {
						if (!k) continue;
						var _v = code_result[k];
						var syntax = pkg.syntaxError(_v);
						if (syntax) {
							_v = 'console.log("Package error on ' +  path_result[k] + ' ->'+ '"); ' + "\n" +
							'console.log(decodeURIComponent("'+ encodeURIComponent(JSON.stringify(syntax)) + '"));' + "\n";
						}
						_C += "\n/*---- Mservice " + k + ' file list:' + path_result[k] +  "----*/\n";
						_CM += "\n/*---- Mservice " + k + ' files ---->*/' + "\n" +
							'_QALET_._Q["'+k+'"] = function(mapping_data) {' + _v + '}; ' + "\n\n";
					}
					if (_CM) {
						_CC += 'if (!_QALET_) var _QALET_={_p:0, data:{},_Q:{}, _newlet:{}, _d:{}}; '+ 
							_CM +
							'// if (typeof _INITQALET_ == "function") _INITQALET_(); '
					}
					
					var cbk_s = (!req.query.callback)?'':req.query.callback;
					
					var orig_code = str0 +  _T + _D + _C + "\n\n" + _TC + _DC + _CC
					if (cbk_s) orig_code+= "\n" + 'if (typeof ' + cbk_s + ' == "function") ' + cbk_s+'();';
					
				//	me.sendHeader();
					res.send(orig_code);
				},
				30000
			);
		}
		this.getConfigAttr = (fn) => {
			let patt = /(\.min|)\.(js|css|jsx)$/i;
			let v = fn.match(patt);
			return (!v)? {} : {
				'isMini' 	: (v[1]) ? true : false,
				'type'		: (v[2]) ? v[2] : '',
				'fileName'	: (!v[2]) ? fn : (fn.replace(patt, '.') + v[2] + '.json')
			};
		};
		this.sendHeader = (filetype) => {
			var me = this;
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "X-Requested-With");
			res.header('Access-Control-Allow-Headers', 'Content-Type'); 
			if (filetype == 'js' || filetype == 'jsx') {
				res.setHeader('Content-Type', "text/javascrip");
			} else if (filetype == 'css') {
				me.is_css = true;
				res.setHeader('Content-Type', "text/css");
			} else {
				res.setHeader('Content-Type', "text/html");
			}			
		}
	};
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = obj;
	} 

})();
