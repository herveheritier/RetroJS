// globals declaration

Gbl = function() {};

const LAYER_DECOR = "0";
const LAYER_MATERIAL = "1";
const LAYER_MOBILE = "2";

Gbl.screenWidth     = 16;
Gbl.screenHeight    = 16;
Gbl.mapWidth        = 16;
Gbl.mapHeight       = 16;
Gbl.mapOrigin       = {col:0,row:0},
Gbl.spriteSize      = 16;
Gbl.canvasWidth     = 640;
Gbl.canvasHeight    = 480;
Gbl.thick           = 20;
Gbl.unit            = 2;
Gbl.showFps         = false;
Gbl.activeOnColid   = true;
Gbl.TAU             = 2 * Math.PI;
Gbl.keyCode         = 0;
Gbl.lastKeyCode     = 0;
Gbl.keyPressed      = [];
Gbl.keyEnter        = [];
Gbl.keyEnterPrev    = [];
Gbl.keyExit         = [];
Gbl.logLines        = 0;
Gbl.uid             = 0;
Gbl.pathes          = [];
Gbl.uidList         = [];

Gbl.canvasWidth = Gbl.mapWidth*Gbl.spriteSize;
Gbl.canvasHeight = Gbl.mapHeight*Gbl.spriteSize;
Gbl.halfSize = Math.floor(Gbl.spriteSize/2);

Gbl.setParameters = function(scenario) {
    Gbl.screenWidth = scenario.screenWidth ? scenario.screenWidth : Gbl.screenWidth;
    Gbl.screenHeight = scenario.screenHeight ? scenario.screenHeight : Gbl.screenHeight;
    Gbl.mapWidth = scenario.mapWidth ? scenario.mapWidth : Gbl.mapWidth;
    Gbl.mapHeight = scenario.mapHeight ? scenario.mapHeight : Gbl.mapHeight;
    Gbl.spriteSize = scenario.spriteSize ? scenario.spriteSize : Gbl.spriteSize;
    Gbl.thick = scenario.thick ? scenario.thick : Gbl.thick;
    Gbl.unit = scenario.unit ? scenario.unit : Gbl.unit;
    Gbl.showFps = scenario.showFps ? scenario.showFps : Gbl.showFps;
    Gbl.activeOnColid = scenario.activeOnColid ? scenario.activeOnColid : Gbl.activeOnColid;
    Gbl.canvasWidth = Gbl.screenWidth*Gbl.spriteSize;
    Gbl.canvasHeight = Gbl.screenHeight*Gbl.spriteSize;
    Gbl.halfSize = Math.floor(Gbl.spriteSize/2);
    Gbl.pathes = scenario.pathes;
}

// recherche d'un uid libre
Gbl.getUid = function() {
    var r = Gbl.uidList.length;
    for(var i=0;i<Gbl.uidList.length;i++) {
        if(!Gbl.uidList[i]) { r=i; break; }
    }
    Gbl.uidList[r]=true;
    return r;
}
// libere un uid
Gbl.releaseUid = function(uid) { delete Gbl.uidList[uid]; }

var sprites = [];
var dmap = [];
var scripts = [];
Gbl.namedSprites = [];
Gbl.baseTextures = [];
Gbl.textures = [];

window.addEventListener("keydown",function(event) {
    Gbl.enterKey(event.keyCode);
},false);

window.addEventListener("keyup",function(event) {
    Gbl.exitKey(event.keyCode);
},false);

Gbl.frameCount = 0;
Gbl.timeBegin = 0;
Gbl.oneFrame = function() {
    Gbl.frameCount++;
}
Gbl.getFPS = function() {
    var now = performance.now();
    var fps = Math.round(1000*Gbl.frameCount/(now-Gbl.timeBegin));
    Gbl.frameCount = 0;
    Gbl.timeBegin = performance.now();
    return fps;
}

Gbl.enterKey = function(keyCode) {
    Gbl.lastKeyCode = keyCode;
    Gbl.keyCode = keyCode;
    Gbl.keyPressed[keyCode] = true;
    if(Gbl.keyEnterPrev[keyCode]==true) {
        Gbl.keyEnter[keyCode]=false;
    }
    else {
        Gbl.keyEnter[keyCode]=true;
        Gbl.keyEnterPrev[keyCode]=true;
    }
    Gbl.keyExit[keyCode]=false;
}

Gbl.exitKey = function(keyCode) {
    if(Gbl.keyPressed[keyCode]==false) return;
    Gbl.keyCode = null;
    Gbl.keyPressed[keyCode]=false;
    Gbl.keyEnter[keyCode]=false;
    Gbl.keyExit[keyCode]=true;
    Gbl.keyEnterPrev[keyCode]=false;
}

Gbl.enterUp = function() { Gbl.enterKey(38); }
Gbl.exitUp = function() { Gbl.exitKey(38); }
Gbl.enterLeft = function() { Gbl.enterKey(37); }
Gbl.exitLeft = function() { Gbl.exitKey(37); }
Gbl.enterRight = function() { Gbl.enterKey(39); }
Gbl.exitRight = function() { Gbl.exitKey(39); }
Gbl.enterDown = function() { Gbl.enterKey(40); }
Gbl.exitDown = function() { Gbl.exitKey(40); }
Gbl.enterSpace = function() { Gbl.enterKey(32); }
Gbl.exitSpace = function() { Gbl.exitKey(32); }

Gbl.verbs = {
    setVar          :   { fct : "_setVar"           , min : 2,  max : 2,   deprecated:false,    usage : "setVar($variable,col|row|x|y)" },
    onColidGoto     :   { fct : "_onColidGoto"      , min : 2,  max : 0,   deprecated:false,    usage : "onColidGoto(nomSprite,etiquette[,etiquette])" },
    onColidPost     :   { fct : "_onColidPost"      , min : 2,  max : 0,   deprecated:false,    usage : "onColidPost(nomSprite,message)" },
    isColidGoto     :   { fct : "_isColidGoto"      , min : 2,  max : 0,   deprecated:false,    usage : "isColidGoto(nomSprite,etiquette[,etiquette])" },
    isColidPost     :   { fct : "_isColidPost"      , min : 2,  max : 2,   deprecated:false,    usage : "isColidPost(nomSprite,message)" },
    collisionRadius :   { fct : "_collisionRadius"  , min : 1,  max : 2,   deprecated:false,    usage : "collisionRadius(rayon) | collisionRadius(demiLargeur,demiHauteur)" },
    uncolid         :   { fct : "_uncolid"          , min : 0,  max : 1,   deprecated:false,    usage : "uncolid | uncolid(nomSprite)" },
    colidable       :   { fct : "_colidable"        , min : 0,  max : 0,   deprecated:false,    usage : "colidable"},
    uncolidable     :   { fct : "_uncolidable"      , min : 0,  max : 0,   deprecated:false,    usage : "uncolidable"},
    out             :   { fct : "_out"              , min : 1,  max : 1,   deprecated:false,    usage : "out(etiquette)"},
    outUp           :   { fct : "_outUp"            , min : 1,  max : 1,   deprecated:false,    usage : "outUp(etiquette)"},
    outDown         :   { fct : "_outDown"          , min : 1,  max : 1,   deprecated:false,    usage : "outDown(etiquette)"},
    outLeft         :   { fct : "_outLeft"          , min : 1,  max : 1,   deprecated:false,    usage : "outLeft(etiquette)"},
    outRight        :   { fct : "_outRight"         , min : 1,  max : 1,   deprecated:false,    usage : "outRight(etiquette)"},
    key             :   { fct : "_key"              , min : 2,  max : 2,   deprecated:false,    usage : "key(keyCode,etiquette)" },
    keyEnter        :   { fct : "_keyEnter"         , min : 2,  max : 2,   deprecated:false,    usage : "keyEnter(keyCode,etiquette)" },
    keyExit         :   { fct : "_keyExit"          , min : 2,  max : 2,   deprecated:false,    usage : "keyExit(keyCode,etiquette)" },
    keyGosub        :   { fct : "_keyGosub"         , min : 2,  max : 2,   deprecated:false,    usage : "keyGosub(keyCode,etiquette)" },
    isPlace         :   { fct : "_isPlace"          , min : 3,  max : 3,   deprecated:false,    usage : "isPlace(colonne,ligne,etiquette)" },
    isCol           :   { fct : "_isCol"            , min : 2,  max : 2,   deprecated:false,    usage : "isCol(colonne,etiquette)" },
    isRow           :   { fct : "_isRow"            , min : 2,  max : 2,   deprecated:false,    usage : "isRow(ligne,etiquette)" },
    onCount         :   { fct : "_onCount"          , min : 6,  max : 6,   deprecated:false,    usage : "onCount(nomSprite,etiq0,etiq1,etiq2,etiq3,etiq4)" },
    decor           :   { fct : "_decor"            , min : 0,  max : 0,   deprecated:false,    usage : "decor"},
    material        :   { fct : "_material"         , min : 0,  max : 0,   deprecated:false,    usage : "material"},
    mobile          :   { fct : "_mobile"           , min : 0,  max : 0,   deprecated:false,    usage : "mobile"},
    image           :   { fct : "_image"            , min : 1,  max : 1,   deprecated:false,    usage : "image(imageId)"},
    map             :   { fct : "_map"              , min : 4,  max : 5,   deprecated:false,    usage : "map(imageId,colonnes,lignes,numero)|map(imageId,x,y,w,h)"},
    animation       :   { fct : "_animation"        , min : 4,  max : 4,   deprecated:false,    usage : "animation(imageId,colonnes,lignes,periode)"},
    anime           :   { fct : "_anime"            , min : 2,  max : 2,   deprecated:false,    usage : "anime(debut,fin)"},
    isAnimeGoto     :   { fct : "_isAnimeGoto"      , min : 3,  max : 3,   deprecated:false,    usage : "isAnimeGoto(imageDebut,imageFin,etiquette)"},
    hide            :   { fct : "_hide"             , min : 0,  max : 0,   deprecated:false,    usage : "hide"},
    show            :   { fct : "_show"             , min : 0,  max : 0,   deprecated:false,    usage : "show"},
    sx              :   { fct : "_sx"               , min : 1,  max : 1,   deprecated:false,    usage : "sx(zoom)"},
    sy              :   { fct : "_sy"               , min : 1,  max : 1,   deprecated:false,    usage : "sy(zoom)"},
    x               :   { fct : "_x"                , min : 1,  max : 1,   deprecated:false,    usage : "x(x)"},
    y               :   { fct : "_y"                , min : 1,  max : 1,   deprecated:false,    usage : "y(y)"},
    col             :   { fct : "_col"              , min : 1,  max : 1,   deprecated:false,    usage : "col(colonne)"},
    row             :   { fct : "_row"              , min : 1,  max : 1,   deprecated:false,    usage : "row(ligne)"},
    replace         :   { fct : "_replace"          , min : 0,  max : 0,   deprecated:false,    usage : "replace"},
    dmapIn          :   { fct : "_dmapIn"           , min : 0,  max : 0,   deprecated:false,    usage : "dmapIn"},
    dmapOut         :   { fct : "_dmapOut"          , min : 0,  max : 0,   deprecated:false,    usage : "dmapOut"},
    seeUp           :   { fct : "_seeUp"            , min : 2,  max : 2,   deprecated:false,    usage : "seeUp(nomSprite,etiquette)"},
    seeDown         :   { fct : "_seeDown"          , min : 2,  max : 2,   deprecated:false,    usage : "seeDown(nomSprite,etiquette)"},
    seeLeft         :   { fct : "_seeLeft"          , min : 2,  max : 2,   deprecated:false,    usage : "seeLeft(nomSprite,etiquette)"},
    seeRight        :   { fct : "_seeRight"         , min : 2,  max : 2,   deprecated:false,    usage : "seeRight(nomSprite,etiquette)"},
    bestWay         :   { fct : "_bestWay"          , min : 2,  max : 0,   deprecated:true ,    usage : "bestWay(nomSprite,etiqUp,etiqDown,etiqLeft,etiqRight)" },
    bestWayTo       :   { fct : "_bestWayTo"        , min : 3,  max : 0,   deprecated:false,    usage : "bestWayTo(colonne,ligne,etiqUp,etiqDown,etiqLeft,etiqRight)" },
    up              :   { fct : "_up"               , min : 1,  max : 1,   deprecated:false,    usage : "up(y)"},
    down            :   { fct : "_down"             , min : 1,  max : 1,   deprecated:false,    usage : "down(y)"},
    left            :   { fct : "_left"             , min : 1,  max : 1,   deprecated:false,    usage : "left(x)"},
    right           :   { fct : "_right"            , min : 1,  max : 1,   deprecated:false,    usage : "right(x)"},
    goUp            :   { fct : "_goUp"             , min : 0,  max : 0,   deprecated:false,    usage : "goUp"},
    goDown          :   { fct : "_goDown"           , min : 0,  max : 0,   deprecated:false,    usage : "goDown"},
    goLeft          :   { fct : "_goLeft"           , min : 0,  max : 0,   deprecated:false,    usage : "goLeft"},
    goRight         :   { fct : "_goRight"          , min : 0,  max : 0,   deprecated:false,    usage : "goRight"},
    speed           :   { fct : "_speed"            , min : 1,  max : 1,   deprecated:false,    usage : "speed(vitesse)" },
    goto            :   { fct : "_goto"             , min : 1,  max : 0,   deprecated:false,    usage : "goto(etiquette[,etiquette])"},
    gosub           :   { fct : "_gosub"            , min : 1,  max : 0,   deprecated:false,    usage : "gosub(etiquette[,etiquette])"},
    return          :   { fct : "_return"           , min : 0,  max : 0,   deprecated:false,    usage : "return"},
    noReturn        :   { fct : "_noReturn"         , min : 0,  max : 0,   deprecated:false,    usage : "noReturn"},
    drainStack      :   { fct : "_drainStack"       , min : 0,  max : 0,   deprecated:false,    usage : "drainStack"},
    defer           :   { fct : "_defer"            , min : 2,  max : 0,   deprecated:false,    usage : "defer(delay,etiquette[,etiquette])"},
    undefer         :   { fct : "_undefer"          , min : 0,  max : 0,   deprecated:false,    usage : "undefer"},
    is              :   { fct : "_is"               , min : 4,  max : 0,   deprecated:false,    usage : "is(nomSprite,colonneRelative,ligneRelative,etiquette[,etiquette])"},
    isHere          :   { fct : "_isHere"           , min : 4,  max : 0,   deprecated:false,    usage : "isHere(nomSprite,colonne,ligne,etiquette[,etiquette])"},
    isUp            :   { fct : "_isUp"             , min : 2,  max : 0,   deprecated:false,    usage : "isUp(nomSprite,etiquette[,etiquette])"},
    isDown          :   { fct : "_isDown"           , min : 2,  max : 0,   deprecated:false,    usage : "isDown(nomSprite,etiquette[,etiquette])"},
    isLeft          :   { fct : "_isLeft"           , min : 2,  max : 0,   deprecated:false,    usage : "isLeft(nomSprite,etiquette[,etiquette])"},
    isRight         :   { fct : "_isRight"          , min : 2,  max : 0,   deprecated:false,    usage : "isRight(nomSprite,etiquette[,etiquette])"},
    post            :   { fct : "_post"             , min : 2,  max : 0,   deprecated:false,    usage : "post(nomSprite,message) | post(nomSprite,message,data[,data]])"},
    receiveGoto     :   { fct : "_receiveGoto"      , min : 2,  max : 0,   deprecated:false,    usage : "receiveGoto(message,etiquette)"},
    onReceiveGoto   :   { fct : "_onReceiveGoto"    , min : 2,  max : 0,   deprecated:false,    usage : "onReceiveGoto(message,etiquette)"},
    receive         :   { fct : "_receive"          , min : 1,  max : 0,   deprecated:false,    usage : "receive(message,$variable[,$variable])"},
    unreceive       :   { fct : "_unreceive"        , min : 0,  max : 0,   deprecated:false,    usage : "unreceive"},
    drainMailbox    :   { fct : "_drainMailbox"     , min : 0,  max : 0,   deprecated:false,    usage : "drainMailbox"},
    name            :   { fct : "_name"             , min : 0,  max : 0,   deprecated:false,    usage : "name(nomSprite)"},
    kill            :   { fct : "_kill"             , min : 0,  max : 0,   deprecated:false,    usage : "kill" },
    nop             :   { fct : "_nop"              , min : 0,  max : 0,   deprecated:false,    usage : "nop" },
    playSound       :   { fct : "_playSound"        , min : 1,  max : 1,   deprecated:false,    usage : "playSound(audioId)" },
    loopSound       :   { fct : "_loopSound"        , min : 1,  max : 1,   deprecated:false,    usage : "loopSound(audioId)" },
    pauseSound      :   { fct : "_pauseSound"       , min : 1,  max : 1,   deprecated:false,    usage : "pauseSound(audioId)" },
    stopSound       :   { fct : "_stopSound"        , min : 1,  max : 1,   deprecated:false,    usage : "stopSound(audioId)" },
    nickname        :   { fct : "_nickname"         , min : 1,  max : 1,   deprecated:false,    usage : "nickname(surnom)" },
    logon           :   { fct : "_logon"            , min : 0,  max : 0,   deprecated:false,    usage : "logon"},
    logoff          :   { fct : "_logoff"           , min : 0,  max : 0,   deprecated:false,    usage : "logoff"},
    stay            :   { fct : "_stay"             , min : 0,  max : 0,   deprecated:false,    usage : "stay" },
    wait            :   { fct : "_wait"             , min : 1,  max : 1,   deprecated:false,    usage : "wait(nombre)" },
    info            :   { fct : "_info"             , min : 0,  max : 0,   deprecated:false,    usage : "info" },
    lastKey         :   { fct : "_lastKey"          , min : 2,  max : 2,   deprecated:true,     usage : "lastKey(key,etiquette)" },
    reset           :   { fct : "_reset"            , min : 0,  max : 0,   deprecated:false,    usage : "reset" },
    attach          :   { fct : "_attach"           , min : 0,  max : 0,   deprecated:false,    usage : "attach"},
    unattach        :   { fct : "_unattach"         , min : 0,  max : 0,   deprecated:false,    usage : "unattach"},
    isAttach        :   { fct : "_isAttach"         , min : 1,  max : 1,   deprecated:false,    usage : "isAttach(etiquette)"},
    followAttached  :   { fct : "_followAttached"   , min : 0,  max : 0,   deprecated:false,    usage : "followAttached"},
    detach          :   { fct : "_detach"           , min : 0,  max : 0,   deprecated:false,    usage : "detach"},
    attachable      :   { fct : "_attachable"       , min : 0,  max : 0,   deprecated:false,    usage : "attachable"},
    unattachable    :   { fct : "_unattachable"     , min : 0,  max : 0,   deprecated:false,    usage : "unattachable"},
    postRegister    :   { fct : "_postRegister"     , min : 2,  max : 0,   deprecated:false,    usage : "postRegister(nomSprite,message) | postRegister(nomSprite,message,data[,data])"},
    compute         :   { fct : "_compute"          , min : 2,  max : 2,   deprecated:false,    usage : "compute(var,formula)"},
    getRegisterVar  :   { fct : "_getRegisterVar"   , min : 1,  max : 1,   deprecated:false,    usage : "getRegisterVar(var)"},
    ifEqualGoto     :   { fct : "_ifEqualGoto"      , min : 3,  max : 3,   deprecated:false,    usage : "ifEqualGoto(data,data,etiquette)"},
    ifInfGoto       :   { fct : "_ifInfGoto"        , min : 3,  max : 3,   deprecated:false,    usage : "ifInfGoto(data,data,etiquette)"},
    ifSupGoto       :   { fct : "_ifSupGoto"        , min : 3,  max : 3,   deprecated:false,    usage : "ifSupGoto(data,data,etiquette)"},
    ifEqualGosub    :   { fct : "_ifEqualGosub"     , min : 3,  max : 3,   deprecated:false,    usage : "ifEqualGosub(data,data,etiquette)"},
    ifInfGosub      :   { fct : "_ifInfGosub"       , min : 3,  max : 3,   deprecated:false,    usage : "ifInfGosub(data,data,etiquette)"},
    ifSupGosub      :   { fct : "_ifSupGosub"       , min : 3,  max : 3,   deprecated:false,    usage : "ifSupGosub(data,data,etiquette)"},
    create          :   { fct : "_create"           , min : 1,  max : 0,   deprecated:false,    usage : "create(element[,data])"},
    rotate          :   { fct : "_rotate"           , min : 1,  max : 1,   deprecated:false,    usage : "rotate(degre)"},
    setRotation     :   { fct : "_setRotation"      , min : 1,  max : 1,   deprecated:false,    usage : "setRotation(degre)"},
    setDxyOnAngle   :   { fct : "_setDxyOnAngle"    , min : 2,  max : 2,   deprecated:false,    usage : "_setDxyOnAngle(distance,degre)"},
    move            :   { fct : "_move"             , min : 0,  max : 0,   deprecated:false,    usage : "move"},
    setRandomVar    :   { fct : "_setRandomVar"     , min : 3,  max : 4,   deprecated:false,    usage : "setRandomVar($variable,min,max[,step])" },
    setDx           :   { fct : "_setDx"            , min : 1,  max : 1,   deprecated:false,    usage : "_setDx(distance)"},
    setDy           :   { fct : "_setDy"            , min : 1,  max : 1,   deprecated:false,    usage : "_setDy(distance)"},
    say             :   { fct : "_say"              , min : 1,  max : 1,   deprecated:false,    usage : "_say(data)"},
    launchScenario  :   { fct : "_launchScenario"   , min : 1,  max : 1,   deprecated:false,    usage : "_launchScenario(htmlpage)"},
    charMap         :   { fct : "_charMap"          , min : 2,  max : 2,   deprecated:false,    usage : "_charMap(imgId,string)"},
    print           :   { fct : "_print"            , min : 3,  max : 3,   deprecated:false,    usage : "_print(col,row,string)"},
    printCenter     :   { fct : "_printCenter"      , min : 2,  max : 2,   deprecated:false,    usage : "_printCenter(row,string)"},
    countNamed      :   { fct : "_countNamed"       , min : 2,  max : 2,   deprecated:false,    usage : "_countNamed($variable,nomSprite)"},
    enqueue         :   { fct : "_enqueue"          , min : 2,  max : 0,   deprecated:false,    usage : "enqueue(nomSprite,message) | enqueue(nomSprite,message[,data[,data]])"},
    dequeue         :   { fct : "_dequeue"          , min : 1,  max : 0,   deprecated:false,    usage : "dequeue(message[,$variable[,$variable]])"},
    followPath      :   { fct : "_followPath"       , min : 3,  max : 3,   deprecated:false,    usage : "followPath(pathName,position,vitesse)"},
    isColInvalid    :   { fct : "_isColInvalid"     , min : 2,  max : 2,   deprecated:false,    usage : "isColInvalid(colonne,etiquette)"},
    isRowInvalid    :   { fct : "_isRowInvalid"     , min : 2,  max : 2,   deprecated:false,    usage : "isRowInvalid(ligne,etiquette)"}
}

