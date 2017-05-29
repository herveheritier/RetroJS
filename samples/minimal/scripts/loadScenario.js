LoadScenario = function(callback) {

out("loading scenario");

var source = "";

var url = $QS("#retrojs").href;

var req = new XMLHttpRequest();
req.open("GET",url,true);
req.overrideMimeType('text/text');
req.send();

req.onreadystatechange = function(){
    if (req.readyState== 4 && req.status == 200){

    out("scenario loaded");
    
    source = req.responseText;

/**
 *      Support pour le scenario
 * 
 **/

Scenario = function() {
    this.screenWidth = Gbl.sceenWidth,
    this.screenHeight = Gbl.sceenHeight,
    this.mapHeight = Gbl.mapHeight,
    this.mapWidth = Gbl.mapWidth,
    this.mapOrigin = Gbl.mapOrigin,
    this.mapHeight = Gbl.mapHeight,
    this.spriteSize = Gbl.spriteSize,
    this.thick = Gbl.thick,
    this.unit = Gbl.unit,
    this.showFps = Gbl.showFps,
    this.activeOnColid = Gbl.activeOnColid,
    this.elements = []
}

Scenario.verbs = {
    name : { fct : "_name", min : 1, max : 1, deprecated:false, usage : "name(string)" },
    background : { fct : "_background", min : 1, max : 1, deprecated:false, usage : "background(imageId)" },
    screenWidth: { fct : "_screenWidth", min : 1, max : 1, deprecated:false, usage : "screenWidth(number)" },
    screenHeight: { fct : "_screenHeight", min : 1, max : 1, deprecated:false, usage : "screenHeight(number)" },
    mapWidth: { fct : "_mapWidth", min : 1, max : 1, deprecated:false, usage : "mapWidth(number)" },
    mapHeight: { fct : "_mapHeight", min : 1, max : 1, deprecated:false, usage : "mapHeight(number)" },
    mapOrigin: { fct : "_mapOrigin", min : 2, max : 2, deprecated:false, usage : "mapOrigin(col,row)" },
    spriteSize: { fct : "_spriteSize", min : 1, max : 1, deprecated:false, usage : "spriteSize(number)" },
    thick: { fct : "_thick", min : 1, max : 1, deprecated:false, usage : "thick(number)" },
    unit: { fct : "_unit", min : 1, max : 1, deprecated:false, usage : "unit(number)" },
    showFps: { fct : "_showFps", min : 0, max : 0, deprecated:false, usage : "showFps" },
    unactivateOnColid: { fct : "_unactivateOnColid", min : 0, max : 0, deprecated:false, usage : "unactivateOnColid" }
}

Scenario.prototype._name = function() {
    this.name = this.getParam(0);
}

Scenario.prototype._background = function() {
    this.background = this.getParam(0);
}

Scenario.prototype._screenWidth = function() {
    this.screenWidth = parseInt(this.getParam(0));
}

Scenario.prototype._screenHeight = function() {
    this.screenHeight = parseInt(this.getParam(0));
}

Scenario.prototype._mapWidth = function() {
    this.mapWidth = parseInt(this.getParam(0));
}

Scenario.prototype._mapHeight = function() {
    this.mapHeight = parseInt(this.getParam(0));
}

Scenario.prototype._mapOrigin = function() {
    this.mapOrigin.col = parseInt(this.getParam(0));
    this.mapOrigin.row = parseInt(this.getParam(1));
}

Scenario.prototype._spriteSize = function() {
    this.spriteSize = parseInt(this.getParam(0));
}

Scenario.prototype._thick = function() {
    this.thick = parseInt(this.getParam(0));
}

Scenario.prototype._unit = function() {
    this.unit = parseInt(this.getParam(0));
}

Scenario.prototype._showFps = function() {
    this.showFps = true
}

Scenario.prototype._unactivateOnColid = function() {
    this.activeOnColid = false;
}

Scenario.prototype.getParam = function(p) {
    return this.params[p].substr(0,1)=="$" ? this.vars[this.params[p]] : this.params[p];
}

Scenario.prototype.populate = function(content) {

    for(var i in content) {
        var w = /([A-Z,a-z]*)/.exec(content[i]);
        var s = w[1];
        if(!Scenario.verbs[s]) { 
            out("!!! UNKNOWN SCENARIO VERB !!! : "+content[i]);
            continue;
        }
        var p = /\((.*)\)/.exec(content[i]);
        this.params = p!=null ? p[1].split(",") : [];
        if(this.params.length<Scenario.verbs[s].min) {
            out("!!! MISSING PARAMETER FOR SCENARIO VERB !!! : "+content[i]);
            continue;
        }
        if(this.params.length>Scenario.verbs[s].max && (Scenario.verbs[s].max!=0 || Scenario.verbs[s].min==0)) {
            out("!!! TOO MANY PARAMETER FOR SCENARIO VERB !!! : "+content[i]);
            continue;
        }

        this[Scenario.verbs[s].fct]();

    }

    delete this.params;
}

Scenario.prototype.generate = function(element,col,row,scripts,elements,vars) {
    //var vars = [];
    var verbs = [];
    for(var j in elements[element].content) {
        var w = /setVar\((.+),(.+)\)/.exec(elements[element].content[j]);
        if(w) vars[w[1]]=w[2];
        var w = /script\((.+)\)/.exec(elements[element].content[j]);
        if(w) verbs = verbs.concat(scripts["_"+w[1]].content);
    }
    result = verbs.join(" ");
    for(var j in vars) {
        var r = vars[j];
        r = r=="@col" ? col : r;
        r = r=="@row" ? row : r;
        result = result.replace(new RegExp("!"+j+",","g"),r+",");
        result = result.replace(new RegExp("!"+j+"\\)","g"),r+")");
    }

    return scriptDecode(result);
}

Scenario.prototype.generateFromMap = function(map,scripts,elements) {
    var imax = this.mapWidth*this.mapHeight;
    for(var i=0;i<imax;i++) {
        var col = i%this.mapWidth;
        var row = Math.floor(i/this.mapWidth);
        if(map.grid[i]!="_" && !elements["_"+map.grid[i]]) {
            out("!!! MAP ELEMENT WITHOUT ELEMENT DIRECTIVE DECLARATION !!! : "+map.grid[i]);
            continue;
        }
        var vars = [];
        var verbs = [];
        if(map.grid[i]!="_") {
            var e = "_"+map.grid[i];
            scenario.elements.push( { script : this.generate(e,col-this.mapOrigin.col,row-this.mapOrigin.row,scripts,elements,[]) } );
        }
    }
}

Scenario.prototype.generateElement = function(name,qty,scripts,elements,vars) {
    var allVars = vars.length==0 ? "" : vars.split("/");
    for(var i=0;i<qty;i++) {
        var elementVars = [];
        if(allVars.length>0) {
            var v = allVars[i].split(";").map(function(x){var p=x.split(":"); var s={}; s.key=p[0]; s.value=p[1]; return s; } );
            for(var j in v) { elementVars[v[j].key]=v[j].value; }
        }
        scenario.elements.push( { script : this.generate("_"+name,-1,-1,scripts,elements,elementVars) } );
    }
}

/**
 *      Support pour les ressources
 * 
 */

Resources = function() {}

Resources.verbs = {
    audio : { fct : "_audio", min : 2, max : 2, deprecated:false, usage : "audio(id,fileName)" },
    img : { fct : "_img", min : 2, max : 2, deprecated:false, usage : "img(id,fileName)" }
}

Resources.prototype._audio = function() {
    this.id = this.getParam(0);
    this.fileName = this.getParam(1);
    soundCounter++;
    var audio = document.createElement("audio");
    audio.id = this.id;
    audio.onloadeddata = function() { soundIsLoaded(); };
    var source = document.createElement("source");
    source.src = this.fileName;
    source.type = "audio/mpeg";
    audio.appendChild(source);
    $QS("body").appendChild(audio);
    out("audio "+this.id+" added");
}

Resources.prototype._img = function() {
    this.id = this.getParam(0);
    this.fileName = this.getParam(1);
    imageCounter++;
    var img = document.createElement("img");
    img.id = this.id;
    img.src = this.fileName;
    img.style = "display:none";
    img.onload = function() { imageIsLoaded(this.id); };
    $QS("body").appendChild(img);
    out("img "+this.id+" added");
}

Resources.prototype.getParam = function(p) {
    return this.params[p].substr(0,1)=="$" ? this.vars[this.params[p]] : this.params[p];
}

Resources.prototype.populate = function(content) {
    for(var i in content) {
        var w = /([A-Z,a-z]*)/.exec(content[i]);
        var s = w[1];
        if(!Resources.verbs[s]) { 
            out("!!! UNKNOWN RESOURCES VERB !!! : "+content[i]);
            continue;
        }
        var p = /\((.*)\)/.exec(content[i]);
        this.params = p!=null ? p[1].split(",") : [];
        if(this.params.length<Resources.verbs[s].min) {
            out("!!! MISSING PARAMETER FOR RESOURCES VERB !!! : "+content[i]);
            continue;
        }
        if(this.params.length>Resources.verbs[s].max && (Resources.verbs[s].max!=0 || Resources.verbs[s].min==0)) {
            out("!!! TOO MANY PARAMETER FOR RESOURCES VERB !!! : "+content[i]);
            continue;
        }

        this[Resources.verbs[s].fct]();

    }

    delete this.params;
}

/**
 *      Support pour la map écran
 * 
 **/

Map = function() {
    this.grid = []
}

Map.prototype.populate = function(content) {
    for(var i in content) {
        var e = content[i].split(".");
        if(e.length==0) out("!!! INVALID MAP - NO CONTENT !!! : "+content[i]);
        if(e[0]!="") out("!!! EVERY LINE'S MAP MUST BEGIN WITH A POINT !!! : "+content[i]);
        if(e[e.length-1]!="") out("!!! EVERY LINE'S MAP MUST END WITH A POINT !!! : "+content[i]);
        e.shift();
        e.pop();
        if(e.length!=scenario.mapWidth) out("!!! INCORRECT LENGTH FOR LINE MAP !!! : "+content[i]);
        while(e.length>0) this.grid.push(e.shift());
    }
    if(this.grid.length<scenario.mapWidth*scenario.mapHeight) out("!!! MISSING LINE(S) IN MAP !!!");
    if(this.grid.length>scenario.mapWidth*scenario.mapHeight) out("!!! TOO MANY LINES IN MAP !!!");
}

/**
 *      Support pour les chemins
 * 
 */

Pathes = function() {
    this.pathes = new Object();
}

Pathes.verbs = {
    path : { fct : "_path", min : 2, max : 2, deprecated:false, usage : "path(id,data)" }
}

Pathes.prototype.populate = function(content) {
    for(var i in content) {
        var w = /([A-Z,a-z]*)/.exec(content[i]);
        var s = w[1];
        if(!Pathes.verbs[s]) { 
            out("!!! UNKNOWN PATHES VERB !!! : "+content[i]);
            continue;
        }
        var p = /\((.*)\)/.exec(content[i]);
        this.params = p!=null ? p[1].split(",") : [];
        if(this.params.length<Pathes.verbs[s].min) {
            out("!!! MISSING PARAMETER FOR PATHES VERB !!! : "+content[i]);
            continue;
        }
        if(this.params.length>Pathes.verbs[s].max && (Pathes.verbs[s].max!=0 || Pathes.verbs[s].min==0)) {
            out("!!! TOO MANY PARAMETER FOR PATHES VERB !!! : "+content[i]);
            continue;
        }
        var c = this.params[1].split("/");
        var points = [];
        for(var j in c) {
            var d = c[j].split(":");
            points.push([parseInt(d[0]),parseInt(d[1])]);
        }
        this.pathes[this.params[0]]=points;
    }

    delete this.params;
}

/**
 *      Support pour les scripts
 * 
 **/

Script = function() {
    this.content = ""
}

Script.prototype.populate = function(content) {
    this.content = content;
}

scriptDecode = function(scriptString) {
    // décodage et controle du script

    var instructions = [];
    var etiqs = [];
    var tmp = scriptString.split(/\s* \s*/);
    var commentActive = false;
    for(var i in tmp) if(tmp[i]!="") {
        if(/^\*/.exec(tmp[i])!=null && !commentActive) { 
            commentActive=true; 
        }
        else if(/\*$/.exec(tmp[i])!=null) { 
            commentActive=false; continue; 
        }
        if(commentActive) continue;
        var key=/:{1}|[A-Z,a-z]+/.exec(tmp[i])[0];
        if(key==":") {
            var etiq = /[^:]*$/.exec(tmp[i])[0];
            // mémorise la position de l'instruction qui suit l'étiquette
            // dans la table des étiquettes
            etiqs[etiq]=instructions.push({cmd:key,etiq:etiq,text:tmp[i]});
        }
        else {
            var params = /\((.*)\)$/.exec(tmp[i]);
            var n = 0;
            if(params==null) {
                instructions.push({cmd:key,text:tmp[i]});
            }
            else {
                var p = params[1].split(",");
                n = p.length;
                instructions.push({cmd:key,params:p,text:tmp[i]});
            }
            if(!Gbl.verbs[key]) out("!!! INVALID VERB : "+key+" !!!    >>>>>>>> "+tmp[i]);
            else {
                if(Gbl.verbs[key].deprecated) out("!!! warning : "+key+" verb is deprecated !!!");
                if(n<Gbl.verbs[key].min && Gbl.verbs[key].min!=Gbl.verbs[key].max) out("!!! VERB WITH INVALID PARAMETER : "+key+" needs at least "+Gbl.verbs[key].min+" parameter(s) !!!    >>>>>>>> "+tmp[i])
                else if(n<Gbl.verbs[key].min && Gbl.verbs[key].min==Gbl.verbs[key].max) out("!!! VERB WITH INVALID PARAMETER : "+key+" needs exactly "+Gbl.verbs[key].min+" parameter(s) !!!    >>>>>>>> "+tmp[i])
                else if(Gbl.verbs[key].max>0 && n>Gbl.verbs[key].max && Gbl.verbs[key].min!=Gbl.verbs[key].max) out("!!! VERB WITH INVALID PARAMETER : "+key+" needs at least "+Gbl.verbs[key].min+" parameter(s) !!!    >>>>>>>> "+tmp[i])
                else if(Gbl.verbs[key].max>0 && n>Gbl.verbs[key].max && Gbl.verbs[key].min==Gbl.verbs[key].max) out("!!! VERB WITH INVALID PARAMETER : "+key+" needs exactly "+Gbl.verbs[key].min+" parameter(s) !!!    >>>>>>>> "+tmp[i])
            }
        }
    }

    return { instructions : instructions, etiqs : etiqs };
}

/**
 *      Support pour les elements
 * 
 **/

Element = function() {
    this.content = ""
}

Element.prototype.populate = function(content) {
    this.content = content;
}


// découpage par ligne
var all = source.split(/\n/);

// suppresion des lignes de commentaire
for(var i=all.length-1;i>=0;i--) if(all[i].substr(0,1)=="*") all.splice(i,1);

// suppression des commentaires de fin de ligne
for(var i=all.length-1;i>=0;i--) {
    var s = /^(.*) \*\*.*/.exec(all[i]);
    all[i] = s ? s[1] : all[i];
    // var s=/^[^*]*/.exec(all[i]);
    // all[i] = s ? s[0] : "";
}

// suppression des blancs non significatifs
for(var i in all) all[i]=all[i].trim();

// suppression des lignes vides
for(var i=all.length-1;i>=0;i--) if(all[i].trim()=="") all.splice(i,1);

// mise en evidence des directives
var directive = [];
var nd=null;
for(var i in all) {
    var word = all[i].split(/\s* \s*/);
    for(var j in word) {
        if(/^#.*$/.exec(word[j])!=null) {
            nd = word[j];
            if(directive[nd]) out("!!! DUPLICATE DIRECTIVE !!! : "+nd);
            directive[nd]=[];
        }
        else {
            if(nd!=null) directive[nd].push(word[j]);
            else out("!!! DIRECTIVE ABSENTE !!! : "+word[j]);
        }
    }
}

var scenario = new Scenario();
var resources = new Resources();
var map = new Map();
var pathes = new Pathes();
scripts = [];
var elements = [];

// traitement des directives
for(var i in directive) {
    var directiveName = /#(([A-Za-z]*))/.exec(i)[1];
    var s = /\((.+)\)$/.exec(i);
    var directiveParam = s ? s[1] : null;
    switch(directiveName) {
        case "scenario":
            out(directiveName+" ("+directive[i].length+" verbs)");
            scenario.populate(directive[i]);
            break;
        case "resources":
            out(directiveName+" ("+directive[i].length+" verbs)");
            resources.populate(directive[i]);
            break;
        case "map":
            out(directiveName+" ("+directive[i].length+" verbs)");
            map.populate(directive[i]);
            break;
        case "pathes":
            out(directiveName+" ("+directive[i].length+" verbs)");
            pathes.populate(directive[i]);
            scenario.pathes = pathes.pathes;
            break;
        case "script":
            out(directiveName+" '"+directiveParam+"' ("+directive[i].length+" verbs)");
            if(directiveParam==null) {
                out("!!! MISSING PARAMETER FOR SCRIPT DIRECTIVE !!! : "+i);
                break;
            }
            scripts["_"+directiveParam] = new Script();
            scripts["_"+directiveParam].populate(directive[i]);
            break;
        case "element":
            out(directiveName+" '"+directiveParam+"' ("+directive[i].length+" verbs)");
            if(directiveParam==null) {
                out("!!! MISSING PARAMETER FOR SCRIPT DIRECTIVE !!! : "+i);
                break;
            }
            elements["_"+directiveParam] = new Element();
            elements["_"+directiveParam].populate(directive[i]);
            break;
        case "generateFromMap":
            out(directiveName);
            if(directiveParam!=null) {
                out("!!! GENERATE FROM MAP DIRECTIVE NEED'NT PARAMETER !!! : "+i);
                break;
            }
            scenario.generateFromMap(map,scripts,elements);
            break;
        case "generateElement":
            out(directiveName+" '"+directiveParam+"'");
            if(directiveParam==null) {
                out("!!! MISSING PARAMETER FOR GENERATE ELEMENT DIRECTIVE !!! : "+i);
                break;
            }
            directiveParam = directiveParam.split(",");
            if(directiveParam.length!=2 && directiveParam.length!=3) {
                out("!!! GENERATE ELEMENT DIRECTIVE NEED AT LEAST 2 PARAMETERS !!! : "+i);
                break;
            }
            if(parseInt(directiveParam[1]).isNaN) {
                out("!!! GENERATE ELEMENT DIRECTIVE'S 2ND PARAMETER MUST BE AN INTEGER !!! : "+i);
                break;
            }
            if(parseInt(directiveParam[1])<=0) {
                out("!!! GENERATE ELEMENT DIRECTIVE'S 2ND PARAMETER MUST'NT GREATER THAN ZERO !!! : "+i);
                break;
            }
            var vars="";
            if(directiveParam.length>2) {
                vars=directiveParam[2];
            }
            scenario.generateElement(directiveParam[0],directiveParam[1],scripts,elements,vars)
            break;
        default:
            out("!!! UNKNOWN DIRECTIVE !!! : "+i);
            break;
    }
}


var directiveNumbers = 0;
for(var i in directive) {
    directiveNumbers++;
}

var scriptNumbers = 0;
for(var i in scripts) {
    scriptNumbers++;
}

var elementNumbers = 0;
for(var i in elements) {
    elementNumbers++;
}

out("");
out("Scenario composed with "+directiveNumbers+" directives.");
out("There are "+scriptNumbers+" scripts and "+elementNumbers+" elements.");

callback(scenario);

}
}
}