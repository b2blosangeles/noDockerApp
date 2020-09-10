const express = require('express');
const app = express();
var ECT = require('ect');
var bodyParser = require('body-parser');
var path = require('path');

const port = 3000;
var env = {
    root : __dirname,
    dataFolder : '/var/_localData',
    appFolder : '/var/_localApp'
}
var pkg = {
    require : function(fileName, isCache) {
        if (!isCache) {
            delete require.cache[fileName];
        }
        return require(fileName);
    },
    crowdProcess : require(__dirname + '/vendor/crowdProcess/crowdProcess.js'),
    tpl : ECT({watch: true, cache: false, root: env.root + '/views', ext : '.ect' })
}
// app.set('view engine', 'ect');
app.engine('ect', pkg.tpl.render);

app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies   
  extended: true
})); 

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

var RESTS = 'get|put|post|delete'.split('|');

for (var i=0 ; i < RESTS.length; i++) {
    (function() {
        app[RESTS[i]](/(.+)$/i, (req, res) => {
            var ROUTER = pkg.require(__dirname + '/modules/appRouter.js');
            var appRoute = new ROUTER(env, pkg, req, res);
            try {
                appRoute.route(RESTS[i]);
            } catch (err) {
                res.send(err.toString());
            }
        });
    })(i)
}
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
