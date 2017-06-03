// Sprite
Sprite = function() {
    //this.uid = ++Gbl.uid;
    this.uid = Gbl.getUid();
    this.rotation = 0;
    this.rx = 0;
    this.dx = 0;
    this.dy = 0;
    this.display = true;
    this.collider=[];
    this.colidable=false;
    this.previousColidable=false;
    this.name="";
    this.nickname="";
    this.log=false;
    this.lastMessage="";
    this.collisionRules=[];
    this.clickRule=null;
    this.clickable=false;
    this.script=[];
    this.etiqs=[];
    this.outLeft=null;
    this.outRight=null;
    this.outUp=null;
    this.outDown=null;
    this.cmd1=null;
    this.cmd2=null;
    this.cmd3=null;
    this.currentAnim = 0;
    this.thickCount = 0;
    this.thickPeriod = 0;
    this.displayMode = "";
    this.mailbox = [];
    this.queue = [];
    this.params = [];
    this.commentActive=false;
    this.callStack = [];
    this.deferTimeout = null;
    this.deferLabel = "";
    this.lastPosOnScript = 0;
    this.layer = LAYER_DECOR;
    this.dmapRef = -1;
    this.col=0;
    this.row=0;
    this.speedFactor=1;
    //
    this.vars = [];
    //
    this.receiveCol = 0;
    this.receiveRow = 0;
    //
    this.onReceive = [];
    //
    this.uidRegister = null;
    this.attached = null;
    this.attachable = true;
}

Sprite.prototype.resetViewX = function() {
    this.minX = 0;
    this.maxX = Gbl.canvasWidth;
}

Sprite.prototype.resetViewY = function() {
    this.minY = 0;
    this.maxY = Gbl.canvasHeight;
}

Sprite.prototype.resetView = function() {
    this.resetViewX();
    this.resetViewY();
}

Sprite.prototype.fixLayer = function() {
    switch(this.layer) {
        case LAYER_DECOR:
            this.pixiSprite.displayGroup = Gbl.decorLayer;
            Gbl.decorContainer.addChild(this.pixiSprite);
            break;
        case LAYER_MATERIAL:
            this.pixiSprite.displayGroup = Gbl.materialLayer;
            Gbl.materialContainer.addChild(this.pixiSprite);
            break;
        case LAYER_MOBILE:
            this.pixiSprite.displayGroup = Gbl.mobileLayer;
            Gbl.mobileContainer.addChild(this.pixiSprite);
            break;
    }
}

Sprite.prototype.loadTextureBad = function(id,w,h,n) {
    // nom unique de la texture
    var textureName = id+"_"+w+"_"+h+"_"+n;
    // si la texture n'existe pas
    if(!Gbl.textures[textureName]) {
        // si la baseTexture n'existe pas on la charge
        if(!Gbl.baseTextures[id]) Gbl.baseTextures[id] = PIXI.BaseTexture.from($QS(id));
        // création de la texture à partir de la baseTexture
        Gbl.textures[textureName] = new PIXI.Texture(Gbl.baseTextures[id]);
        this.srcDx = (n%w)*Gbl.textures[textureName].width/w;
        this.srcDy = (Math.floor(n/w))*Gbl.textures[textureName].height/h;
        this.setSize(Gbl.textures[textureName].width/w,Gbl.textures[textureName].height/h);
        Gbl.textures[textureName].frame = new PIXI.Rectangle(this.srcDx,this.srcDy,this.width,this.height);
        return Gbl.textures[textureName];     
    }
    this.srcDx = (n%w)*Gbl.textures[textureName].width/w;
    this.srcDy = (Math.floor(n/w))*Gbl.textures[textureName].height/h;
    this.setSize(Gbl.textures[textureName].width/w,Gbl.textures[textureName].height/h);
    return Gbl.textures[textureName];
}

Sprite.prototype.loadTexture = function(id) {
    if(!Gbl.baseTextures[id]) Gbl.baseTextures[id] = PIXI.BaseTexture.from($QS(id));
    return Gbl.baseTextures[id];
}

Sprite.prototype.setImage = function(id) {
    this.displayMode="image";
    this.texture = PIXI.Texture.from($QS(id));
    this.pixiSprite = new PIXI.Sprite(this.texture);
    this.pixiSprite.anchor.x=0.5;
    this.pixiSprite.anchor.y=0.5;
    this.pixiSprite.x = this.x;
    this.pixiSprite.y = this.y;
    this.fixLayer();
    this.srcDx = 0;
    this.srcDy = 0;
    this.setSize(this.texture.width,this.texture.height);
}

Sprite.prototype.setCanvas = function(id,w,h,n) {
    this.displayMode="image";
//
    this.texture = new PIXI.Texture(this.loadTexture(id));

    this.srcDx = (n%w)*this.texture.width/w;
    this.srcDy = (Math.floor(n/w))*this.texture.height/h;
    this.setSize(this.texture.width/w,this.texture.height/h);

    this.texture.frame = new PIXI.Rectangle(this.srcDx,this.srcDy,this.width,this.height);
    if(this.pixiSprite) this.pixiSprite.setTexture(this.texture);
    else this.pixiSprite = new PIXI.Sprite(this.texture);
//
//    this.pixiSprite = new PIXI.Sprite(this.loadTextureBad(id,w,h,n));
    this.pixiSprite.anchor.x=0.5;
    this.pixiSprite.anchor.y=0.5;
    this.pixiSprite.x = this.x;
    this.pixiSprite.y = this.y;
    this.fixLayer();
}

Sprite.prototype.setCanvas2 = function(id,x,y,w,h) {
    this.displayMode="image";
//
    this.texture = new PIXI.Texture(this.loadTexture(id));

    this.srcDx = x;
    this.srcDy = y;
    this.setSize(w,h);

    this.texture.frame = new PIXI.Rectangle(this.srcDx,this.srcDy,this.width,this.height);
    if(this.pixiSprite) this.pixiSprite.setTexture(this.texture);
    else this.pixiSprite = new PIXI.Sprite(this.texture);
//
//    this.pixiSprite = new PIXI.Sprite(this.loadTextureBad(id,w,h,n));
    this.pixiSprite.anchor.x=0.5;
    this.pixiSprite.anchor.y=0.5;
    this.pixiSprite.x = this.x;
    this.pixiSprite.y = this.y;
    this.fixLayer();
}

Sprite.prototype.setAnim = function(id,nx,ny,tp) {
    
    this.displayMode="animation";

    this.srcDx = 0;
    this.srcDy = 0;
    this.animCols = parseInt(nx);
    this.animRows = parseInt(ny);
    this.thickPeriod = tp;

    var image = $QS(id);
    this.setSize(image.width/nx,image.height/ny);


    this.textures = [];
    for(var t=0;t<(nx*ny);t++) {
        var c = (t%nx) * this.width;
        var r = Math.floor(t/nx) * this.height;
        this.textures[t] = PIXI.Texture.from($QS(id));
        this.textures[t].frame = new PIXI.Rectangle(c,r,this.width,this.height);
    }

    if(this.pixiSprite) this.pixiSprite.destroy();
    this.pixiSprite = new PIXI.Sprite(this.textures[0]);
    this.pixiSprite.anchor.x=0.5;
    this.pixiSprite.anchor.y=0.5;
    this.pixiSprite.x = this.x;
    this.pixiSprite.y = this.y;
    this.fixLayer();
}

Sprite.prototype.doAnim = function(begin,end) {
    this.beginAnim = parseInt(begin);
    this.endAnim = parseInt(end);
}

Sprite.prototype.animate = function() {
    this.thickCount = ( this.thickCount + 1 ) % this.thickPeriod;
    if(this.thickCount!=0) return;
    if(this.currentAnim<this.beginAnim || this.currentAnim>=this.endAnim) this.currentAnim = this.beginAnim;
    else this.currentAnim++;
    var c = this.currentAnim % this.animCols;
    var r = Math.floor(this.currentAnim / this.animCols);
    this.srcDx = c * this.width;
    this.srcDy = r * this.height;

    this.pixiSprite.texture = this.textures[this.currentAnim];
    
}

Sprite.prototype.setSize = function(w,h) {
    this.width = w;
    this.height = h;
    this.imageWidth = w;
    this.imageHeight = h;
    this.halfWidth = Math.floor(this.width/2);
    this.halfHeight = Math.floor(this.height/2);
    this.resetScale();
    this.resetView();
}

Sprite.prototype.resetScale = function() {
    this.scaleRefX = this.width / this.imageWidth;
    this.scaleRefY = this.height / this.imageHeight;
}

Sprite.prototype.setScaleX = function(sx) {
    this.scaleRefX = sx;
    this.width = this.scaleRefX * this.imageWidth;
    this.halfWidth = Math.floor(this.width/2);
    this.pixiSprite.scale = new PIXI.Point(this.scaleRefX,this.scaleRefY);
}

Sprite.prototype.setScaleY = function(sy) {
    this.scaleRefY = sy;
    this.height = this.scaleRefY * this.imageHeight;
    this.halfHeight = Math.floor(this.height/2);
    this.pixiSprite.scale = new PIXI.Point(this.scaleRefX,this.scaleRefY);
}

Sprite.prototype.setScale = function(sx,sy) {
    this.setScaleX(sx);
    this.setScaleY(sy);
}

Sprite.prototype.setX = function(x) {
    this.x=x;
    this.col=this.x2col(this.x);
    this.pixiSprite.x = x;
}

Sprite.prototype.setY = function(y) {
    this.y=y;
    this.row=this.y2row(this.y);
    this.pixiSprite.y = y;
}

Sprite.prototype.setPosition = function(x,y) {
    this.ix = x;
    this.iy = y;
    this.setX(this.ix);
    this.setY(this.iy);
}

Sprite.prototype.setSpeed = function(dx,dy) {
    this.dx=dx;
    this.dy=dy;
}

Sprite.prototype.setRotation = function(angle) {
    this.rotation=angle % 360;
    this.pixiSprite.rotation = Gbl.TAU*this.rotation/360;
}

Sprite.prototype.rotate = function(rx) {
    this.rotation=(this.rotation+rx) % 360;
    var rad = Gbl.TAU*parseFloat(this.rotation)/360;
    this.pixiSprite.rotation = rad;
}

Sprite.prototype.rotate2 = function(rx) {
    this.rx = rx;
}

Sprite.prototype.rotateWithTimer = function(time) {
    this.rotation=(this.rotation+360/(time/Gbl.thick)) % 360;
    var rad = Gbl.TAU*parseFloat(this.rotation)/360;
    this.pixiSprite.rotation = rad;
}


Sprite.prototype.outRightTest = function() {
    return(this.x>this.maxX);
}

Sprite.prototype.outLeftTest = function() {
    return(this.x<this.minX);    
}

Sprite.prototype.outUpTest = function() {
    return(this.y<this.minY);
    
}

Sprite.prototype.outDownTest = function() {
    return((this.y-this.halfHeight)>=this.maxY);
    
}

Sprite.prototype.outTest = function() {
        return (
            this.y<this.minY || 
            this.y>this.maxY ||
            this.x<this.minX || 
            this.x>this.maxX
            )
}

Sprite.prototype.moveNext = function() {
    this.setX(this.x+this.dx);
    this.setY(this.y+this.dy);
    if(this.outTest()) this.setX(this.ix), this.setY(this.iy);
}

Sprite.prototype.draw = function() {
    if(!this.display) { 
        if(this.pixiSprite) this.pixiSprite.visible=false; 
        return; 
    }
    if(this.pixiSprite) this.pixiSprite.visible=true; 
    if(this.rx!=0) this.rotate(this.rx);
    if(this.displayMode=="animation") this.animate();
}

Sprite.prototype.clickDetection = function() {
    this.pixiSprite.on('pointertap',(
        function(that){
            return function(){
                Gbl.lastClicked = that.uid;
            };
        })(this)
    );
}


Sprite.prototype.setPath = function(path) {
    this.path = path;
    this.posOnPath = 0;
    this.pathCurrent = 0;
    this.pathRing = true;
}

Sprite.prototype.moveAlongPath = function() {
    this.setX(this.path[this.pathCurrent][0] + this.posOnPath * (this.path[this.pathCurrent+1][0]-this.path[this.pathCurrent][0]));
    this.setY(this.path[this.pathCurrent][1] + this.posOnPath * (this.path[this.pathCurrent+1][1]-this.path[this.pathCurrent][1]));
    this.posOnPath += 0.01;
    if(this.posOnPath>1) {
        this.pathCurrent+=1;
        if(this.pathCurrent==this.path.length-1) this.pathCurrent=0;
        this.posOnPath=0;
    }
}

Sprite.prototype.moveAlongPathWithTimer = function() {
    if(this.posOnPath==0) {
        this.posOnPathIncrement = 1/(this.path[this.pathCurrent][2]/Gbl.thick);
    }
    this.setX(this.path[this.pathCurrent][0] + this.posOnPath * (this.path[this.pathCurrent+1][0]-this.path[this.pathCurrent][0]));
    this.setY(this.path[this.pathCurrent][1] + this.posOnPath * (this.path[this.pathCurrent+1][1]-this.path[this.pathCurrent][1]));
    this.posOnPath += this.posOnPathIncrement;
    if(this.posOnPath>1) {
        this.pathCurrent+=1;
        if(this.pathCurrent==this.path.length-1) this.pathCurrent=0;
        this.posOnPath=0;
    }
}

Sprite.prototype.moveBezier = function() {
    this.setX( 
        this.path[this.pathCurrent][0]*Math.pow(1-this.posOnPath,3) +
        3 * this.path[this.pathCurrent+1][0]*this.posOnPath*Math.pow(1-this.posOnPath,2) +
        3 * this.path[this.pathCurrent+2][0]*Math.pow(this.posOnPath,2)*(1-this.posOnPath) +
        this.path[this.pathCurrent+3][0]*Math.pow(this.posOnPath,3));
    this.setY( 
        this.path[this.pathCurrent][1]*Math.pow(1-this.posOnPath,3) +
        3 * this.path[this.pathCurrent+1][1]*this.posOnPath*Math.pow(1-this.posOnPath,2) +
        3 * this.path[this.pathCurrent+2][1]*Math.pow(this.posOnPath,2)*(1-this.posOnPath) +
        this.path[this.pathCurrent+3][1]*Math.pow(this.posOnPath,3));
    this.posOnPath += 0.01;
    if(this.posOnPath>1) {
        this.pathCurrent+=1;
        if(this.pathCurrent==this.path.length-3) this.pathCurrent=0;
        this.posOnPath=0;
    }
}

Sprite.prototype.bestWay = function(x0,y0,x9,y9) {
    // recopie dmap
    var amap = [];
    for(var i in dmap) amap[i]=dmap[i];
    // tableau de robots
    var robots = [];
    // création du premier robot
    robots.push({ x0:x0, y0:y0, x9:x9, y9:y9, x:x0, y:y0, chemin:[] });
    // tant qu'il y a des robots
    var redo = true;
    while(robots.length>0 && redo) {
        var r = robots.shift();
        // marque la position dans la amap
        amap[r.y*Gbl.mapWidth+r.x]="robot";
        // regarde en haut
        if(r.y>0) {
            // calcul coordonnées explorée
            var xn = r.x;
            var yn = r.y-1;
            if(xn==r.x9 && yn==r.y9) {
                redo=false;
                r.chemin.push("u");
                robots.push(r);
            }
            else { 
                var ce = yn*Gbl.mapWidth+xn;
                // déplacement possible ?
                var ok = amap[ce] ? false : true;
                // nouveau robot
                if(ok) {
                    amap[ce]="robot";
                    var nr = { x0:r.x0, y0:r.y0, x9:r.x9, y9:r.y9, x:xn, y:yn, chemin:[] };
                    for(var e in r.chemin) nr.chemin[e]=r.chemin[e];
                    nr.chemin.push("u");
                    robots.push(nr);
                }
            }
        }
        // regarde en bas
        if(redo && r.y<(Gbl.mapHeight-1)) {
            // calcul coordonnées explorée
            var xn = r.x;
            var yn = r.y+1;
            if(xn==r.x9 && yn==r.y9) {
                redo=false;
                r.chemin.push("d");
                robots.push(r);
            }
            else { 
                var ce = yn*Gbl.mapWidth+xn;
                // déplacement possible ?
                var ok = amap[ce] ? false : true;
                // nouveau robot
                if(ok) {
                    amap[ce]="robot";
                    var nr = { x0:r.x0, y0:r.y0, x9:r.x9, y9:r.y9, x:xn, y:yn, chemin:[] };
                    for(var e in r.chemin) nr.chemin[e]=r.chemin[e];
                    nr.chemin.push("d");
                    robots.push(nr);
                }
            }
        }
        // regarde à gauche
        if(redo && r.x>0) {
            // calcul coordonnées explorée
            var xn = r.x-1;
            var yn = r.y;
            if(xn==r.x9 && yn==r.y9) {
                redo=false;
                r.chemin.push("l");
                robots.push(r);
            }
            else { 
                var ce = yn*Gbl.mapWidth+xn;
                // déplacement possible ?
                var ok = amap[ce] ? false : true;
                // nouveau robot
                if(ok) {
                    amap[ce]="robot";
                    var nr = { x0:r.x0, y0:r.y0, x9:r.x9, y9:r.y9, x:xn, y:yn, chemin:[] };
                    for(var e in r.chemin) nr.chemin[e]=r.chemin[e];
                    nr.chemin.push("l");
                    robots.push(nr);
                }
            }    
        }
        // regarde à droite
        if(redo && r.x<(Gbl.mapWidth-1)) {
            // calcul coordonnées explorée
            var xn = r.x+1;
            var yn = r.y;
            if(xn==r.x9 && yn==r.y9) {
                redo=false;
                r.chemin.push("r");
                robots.push(r);
            }
            else { 
                var ce = yn*Gbl.mapWidth+xn;
                // déplacement possible ?
                var ok = amap[ce] ? false : true;
                // nouveau robot
                if(ok) {
                    amap[ce]="robot";
                    var nr = { x0:r.x0, y0:r.y0, x9:r.x9, y9:r.y9, x:xn, y:yn, chemin:[] };
                    for(var e in r.chemin) nr.chemin[e]=r.chemin[e];
                    nr.chemin.push("r");
                    robots.push(nr);
                }            
            }
        }
    }
    if(robots.length>0) {
        var bw = robots.pop().chemin[0];
        return bw=="u" ? 0 : bw=="d" ? 1 : bw=="l" ? 2 : bw=="r" ? 3 : -1;
    }
    return -1;     
}

Sprite.prototype.x2col = function(x) {
    return Math.floor((x-Gbl.halfSize)/Gbl.spriteSize);
}

Sprite.prototype.y2row = function(y) {
    return Math.floor((y-Gbl.halfSize)/Gbl.spriteSize);
}

Sprite.prototype.moveLeft = function() {
    this.setX(this.x-Gbl.unit*this.speedFactor);
}

Sprite.prototype.moveRight = function() {
    this.setX(this.x+Gbl.unit*this.speedFactor);
}

Sprite.prototype.moveUp = function() {
    this.setY(this.y-Gbl.unit*this.speedFactor);
}

Sprite.prototype.moveDown = function() {
    this.setY(this.y+Gbl.unit*this.speedFactor);
}

Sprite.prototype._logon = function() {
    this.log=true;
    return true;
}

Sprite.prototype._logoff = function() {
    this.log=false;
    return true;
}

Sprite.prototype._image = function() {
    this.setImage(this.getParam(0));
    return true;
}

Sprite.prototype._animation = function() {
    this.setAnim(
        this.getParam(0),
        this.getParam(1),
        this.getParam(2),
        this.getParam(3)
    ); 
    return true;
}

Sprite.prototype._anime = function() {
    this.doAnim(this.getParam(0),this.getParam(1));
    return true;
}

Sprite.prototype._isAnimeGoto = function() {
    var b = parseInt(this.getParam(0));
    var e = parseInt(this.getParam(1));
    if(b<=e && this.currentAnim>=b && this.currentAnim<=e || b>e && this.currentAnim>=e && this.currentAnim<=b) {
        this.label = this.getParam(2);
        this.gotoOnScript=true;
    }
    return true;
}

Sprite.prototype._map = function() {
    if(this.params.length==4) {
        this.setCanvas(
            this.getParam(0),
            Math.floor(this.getParam(1)),Math.floor(this.getParam(2)),
            Math.floor(this.getParam(3))
        );
    }
    else if(this.params.length==5) {
        this.setCanvas2(
            this.getParam(0),
            Math.floor(this.getParam(1)),Math.floor(this.getParam(2)),
            Math.floor(this.getParam(3)),Math.floor(this.getParam(4))
        );
    }
    return true;
}

Sprite.prototype._dmapIn = function() {
    if(this.dmapRef>-1) dmap[this.dmapRef]=null;
    this.dmapRef = this.row*Gbl.mapWidth+this.col;
    dmap[this.dmapRef]=this.name;
    return true;
}

Sprite.prototype._dmapOut = function() {
    if(this.dmapRef>-1) dmap[this.dmapRef]=null;
    return true;
}

Sprite.prototype._seeUp = function() {
    for(var rr=this.row-1;rr>=0;rr--) {
        var d = rr*Gbl.mapWidth+this.col;
        if(dmap[d]) {
            if(dmap[d]==this.getParam(0)) {
                this.label = this.getParam(1);
                this.gotoOnScript=true;  
            }
            break;
        }
    }
    return true;
}

Sprite.prototype._seeDown = function() {
    for(var rr=this.row+1;rr<Gbl.mapHeight;rr++) {
        var d = rr*Gbl.mapWidth+this.col;
        if(dmap[d]) {
            if(dmap[d]==this.getParam(0)) {
                this.label = this.getParam(1);
                this.gotoOnScript=true;  
            }
            break;
        }
    }
    return true;
}

Sprite.prototype._seeLeft = function() {
    for(var cc=this.col-1;cc>=0;cc--) {
        var d = this.row*Gbl.mapWidth+cc;
        if(dmap[d]) {
            if(dmap[d]==this.getParam(0)) {
                this.label = this.getParam(1);
                this.gotoOnScript=true;  
            }
            break;
        }
    }    
    return true;
}

Sprite.prototype._seeRight = function() {
    for(var cc=this.col+1;cc<Gbl.mapWidth;cc++) {
        var d = this.row*Gbl.mapWidth+cc;
        if(dmap[d]) {
            if(dmap[d]==this.getParam(0)) {
                this.label = this.getParam(1);
                this.gotoOnScript=true;  
            }
            break;
        }
    }
    return true;
}

Sprite.prototype._name = function() {
    this.name=this.getParam(0);
    if(!Gbl.namedSprites[this.name]) Gbl.namedSprites[this.name]=[];
    Gbl.namedSprites[this.name][this.uid]=this;
    //Gbl.namedSprites[this.name].push(this);
    return true;
}

Sprite.prototype._hide = function() {
    this.display=false;
    this.previousColidable=this.colidable;
    this.colidable=false;
    return true;
}

Sprite.prototype._show = function() {
    this.display=true;
    this.colidable=this.previousColidable;
    return true;
}

Sprite.prototype._colidable = function() {
    this.colidable=true;
    this.previousColidable=this.colidable;
    return true;
}

Sprite.prototype._uncolidable = function() {
    this.colidable=false;
    this.previousColidable=this.colidable;
    return true;
}

Sprite.prototype._decor = function() {
    this.layer = LAYER_DECOR;
    return true;
}

Sprite.prototype._material = function() {
    this.layer = LAYER_MATERIAL;
    return true;
}

Sprite.prototype._mobile = function() {
    this.layer = LAYER_MOBILE;
    return true;
}

Sprite.prototype._x = function() {
    this.setX(parseFloat(this.getParam(0)));
    return false;
}

Sprite.prototype._y = function() {
    this.setY(parseFloat(this.getParam(0)));
    return false;
}

Sprite.prototype._col = function() {
    this.setX(parseInt(this.getParam(0))*Gbl.spriteSize+Gbl.halfSize);
    // return true depuis le 13/05/2017 (avant retournait false)
    return true;
}

Sprite.prototype._row = function() {
    this.setY(parseInt(this.getParam(0))*Gbl.spriteSize+Gbl.halfSize);
    // return true depuis le 13/05/2017 (avant retournait false)
    return true;
}

Sprite.prototype._right = function() {
    if(!this.waitOnScript) this.waitOnScript=true, this.wait=this.getParam(0); 
    this.moveRight();
    if(this.outRight!=null) if(this.outRightTest()) {
        this.label=this.outRight;
        this.gotoOnScript=true; 
        return true;
    }
    return false;
}

Sprite.prototype._left = function() {
    if(!this.waitOnScript) this.waitOnScript=true, this.wait=this.getParam(0); 
    this.moveLeft();
    if(this.outLeft!=null) if(this.outLeftTest()) {
        this.label=this.outLeft;
        this.gotoOnScript=true; 
        return true;
    }
    return false;
}

Sprite.prototype._down = function() {
    if(!this.waitOnScript) this.waitOnScript=true, this.wait=this.getParam(0);
    this.moveDown();
    if(this.outDown!=null) if(this.outDownTest()) {
        this.label=this.outDown;
        this.gotoOnScript=true; 
        return true;
    }
    return false;
}

Sprite.prototype._up = function() {
    if(!this.waitOnScript) this.waitOnScript=true, this.wait=this.getParam(0);
    this.moveUp();
    if(this.outUp!=null) if(this.outUpTest()) {
        this.label=this.outUp;
        this.gotoOnScript=true; 
        return true;
    }
    return false;
}

Sprite.prototype._goUp = function() {
    if(!this.waitOnScript) {
        var r1=this.row-1;
        var yd=(this.y-r1*Gbl.spriteSize+Gbl.halfSize)%(Gbl.spriteSize+1);
        this.waitOnScript=true, this.wait=yd;
    }
    this.moveUp();
    if(this.outUp!=null) if(this.outUpTest()) {
        this.label=this.outUp;
        this.gotoOnScript=true; 
        return true;
    }
    return false;
}

Sprite.prototype._goDown = function() {
    if(!this.waitOnScript) {
        var r1=this.row+1;
        var yd=(r1*Gbl.spriteSize+Gbl.halfSize-this.y)%(Gbl.spriteSize+1);
        this.waitOnScript=true, this.wait=yd;
    }
    this.moveDown();
    if(this.outDown!=null) if(this.outDownTest()) {
        this.label=this.outDown;
        this.gotoOnScript=true; 
        return true;
    }
    return false;
}

Sprite.prototype._goLeft = function() {
    if(!this.waitOnScript) {
        var c1=this.col-1;
        var xd=(this.x-c1*Gbl.spriteSize+Gbl.halfSize)%(Gbl.spriteSize+1);
        this.waitOnScript=true, this.wait=xd;
    }
    this.moveLeft();
    if(this.outLeft!=null) if(this.outLeftTest()) {
        this.label=this.outLeft;
        this.gotoOnScript=true; 
        return true;
    }
    return false;
}

Sprite.prototype._goRight = function() {
    if(!this.waitOnScript) {
        var c1=this.col+1;
        var xd=(c1*Gbl.spriteSize+Gbl.halfSize-this.x)%(Gbl.spriteSize+1);
        this.waitOnScript=true, this.wait=xd;
    }
    this.moveRight();
    if(this.outRight!=null) if(this.outRightTest()) {
        this.label=this.outRight;
        this.gotoOnScript=true; 
        redo=true;
    }
    return false;
}

Sprite.prototype._goto = function() {
    this.label = this.getParam(Math.floor(Math.random()*this.params.length));
    this.gotoOnScript=true;  
    return true;
}

Sprite.prototype._gosub = function() {
    this.callStack.push(this.posOnScript);
    this.label = this.getParam(Math.floor(Math.random()*this.params.length));
    this.gotoOnScript=true;  
    return true;
}

Sprite.prototype._drainStack = function() {
    this.callStack=[];
    return true;
}

Sprite.prototype._defer = function() {
    if(this.deferTimeout!=null) clearTimeout(this.deferTimeout);
    this.deferTimeout = setTimeout(
        function(that,label) {
            return function() {
                that.deferLabel = label;
            }
        }(this,this.getParam(Math.floor(Math.random()*(this.params.length-1))+1)),
        parseInt(this.getParam(0))
    );
    return true;
}

Sprite.prototype._undefer = function() {
    if(this.deferTimeout!=null) clearTimeout(this.deferTimeout);
    return true;
}

Sprite.prototype._return = function() {
    if(this.callStack.length>0) {
        this.posOnScript=this.callStack.pop();
    }
    return true;
}

Sprite.prototype._noReturn = function() {
    if(this.callStack.length>0) {
        this.callStack.pop();
    }
    return true;
}

Sprite.prototype._out = function() {
    this.outLeft=this.getParam(0);
    this.outRight=this.getParam(0);
    this.outUp=this.getParam(0);
    this.outDown=this.getParam(0);
    return true;
}

Sprite.prototype._outLeft = function() {
    this.outLeft=this.getParam(0);
    return true;
}

Sprite.prototype._outRight = function() {
    this.outRight=this.getParam(0);
    return true;
}

Sprite.prototype._outUp = function() {
    this.outUp=this.getParam(0);
    return true;
}

Sprite.prototype._outDown = function() {
    this.outDown=this.getParam(0);
    return true;
}

Sprite.prototype._sx = function() {
    this.setScaleX(parseFloat(this.getParam(0)));
    return true;
}

Sprite.prototype._sy = function() {
    this.setScaleY(parseFloat(this.getParam(0)));
    return true;
}

Sprite.prototype._replace = function() {
    this.x = this.col*Gbl.spriteSize+Gbl.halfSize
    this.y = this.row*Gbl.spriteSize+Gbl.halfSize;
    return true;
}

Sprite.prototype._is = function() {
    if(Gbl.namedSprites[this.getParam(0)]) {
        for(var i in Gbl.namedSprites[this.getParam(0)]) {
            if(this.col+parseInt(this.getParam(1))==Gbl.namedSprites[this.getParam(0)][i].col &&
                this.row+parseInt(this.getParam(2))==Gbl.namedSprites[this.getParam(0)][i].row) {
                this.uidRegister = Gbl.namedSprites[this.getParam(0)][i].uid;
                this.label = this.getParam(Math.floor(Math.random()*(this.params.length-3)+3));
                this.gotoOnScript=true;  
                break;
            }
        }
    }
    return true;
}

Sprite.prototype._isHere = function() {
    if(Gbl.namedSprites[this.getParam(0)]) {
        for(var i in Gbl.namedSprites[this.getParam(0)]) {
            if(parseInt(this.getParam(1))==Gbl.namedSprites[this.getParam(0)][i].col &&
                parseInt(this.getParam(2))==Gbl.namedSprites[this.getParam(0)][i].row) {
                this.uidRegister = Gbl.namedSprites[this.getParam(0)][i].uid;
                this.label = this.getParam(Math.floor(Math.random()*(this.params.length-3)+3));
                this.gotoOnScript=true;  
                break;
            }
        }
    }
    return true;
}

Sprite.prototype._isUp = function() {
    if(Gbl.namedSprites[this.getParam(0)]) {
        for(var i in Gbl.namedSprites[this.getParam(0)]) {
            if(this.uid!=Gbl.namedSprites[this.getParam(0)][i].uid) {
                if(this.col==Gbl.namedSprites[this.getParam(0)][i].col &&
                    this.row-1==Gbl.namedSprites[this.getParam(0)][i].row) {
                    this.label = this.getParam(Math.floor(Math.random()*(this.params.length-1)+1));
                    this.gotoOnScript=true;  
                    break;
                }
            }
        }
    }
    return true;
}

Sprite.prototype._isDown = function() {
    if(Gbl.namedSprites[this.getParam(0)]) {
        for(var i in Gbl.namedSprites[this.getParam(0)]) {
            if(this.uid!=Gbl.namedSprites[this.getParam(0)][i].uid) {
                if(this.col==Gbl.namedSprites[this.getParam(0)][i].col &&
                    this.row+1==Gbl.namedSprites[this.getParam(0)][i].row) {
                    this.label = this.getParam(Math.floor(Math.random()*(this.params.length-1)+1));
                    this.gotoOnScript=true;  
                    break;
                }
            }
        }
    }
    return true;
}

Sprite.prototype._isRight = function() {
    if(Gbl.namedSprites[this.getParam(0)]) {
        for(var i in Gbl.namedSprites[this.getParam(0)]) {
            if(this.uid!=Gbl.namedSprites[this.getParam(0)][i].uid) {
                if(this.col+1==Gbl.namedSprites[this.getParam(0)][i].col &&
                    this.row==Gbl.namedSprites[this.getParam(0)][i].row) {
                    this.label = this.getParam(Math.floor(Math.random()*(this.params.length-1)+1));
                    this.gotoOnScript=true;  
                    break;
                }
            }
        }
    }
    return true;
}

Sprite.prototype._isLeft = function() {
    if(Gbl.namedSprites[this.getParam(0)]) {
        for(var i in Gbl.namedSprites[this.getParam(0)]) {
            if(this.uid!=Gbl.namedSprites[this.getParam(0)][i].uid) {
                if(this.col-1==Gbl.namedSprites[this.getParam(0)][i].col &&
                    this.row==Gbl.namedSprites[this.getParam(0)][i].row) {
                    this.label = this.getParam(Math.floor(Math.random()*(this.params.length-1)+1));
                    this.gotoOnScript=true;  
                    break;
                }
            }
        }
    }
    return true;
}

Sprite.prototype._enqueue = function() {
    var data = [];
    if(this.params.length>2) {
        for(var i=2;i<this.params.length;i++) {
            data.push(this.getParam(i));
        }
    }
    for(var i in sprites) {
        if(sprites[i].name==this.getParam(0)) {
            if(!sprites[i].queue[this.getParam(1)]) sprites[i].queue[this.getParam(1)]=[];
            sprites[i].queue[this.getParam(1)].push(data);
        }
    }
    return true;
}

Sprite.prototype._dequeue = function() {
    if(this.queue[this.getParam(0)]) {
        if(this.queue[this.getParam(0)].length>0) {
            var data = this.queue[this.getParam(0)].shift();
            if(this.params.length>0) {
                for(var i=1;i<this.params.length;i++) {
                    this.vars[this.params[i]]=data.shift();
                }
            }
        }
    }
    return true;
}

Sprite.prototype._post = function() {
    var data = [];
    if(this.params.length>2) {
        for(var i=2;i<this.params.length;i++) {
            data.push(this.getParam(i));
        }
    }
    for(var i in sprites) {
        if(sprites[i].name==this.getParam(0)) sprites[i].mailbox[this.getParam(1)]=data;
    }
    return true;
}

Sprite.prototype._postRegister = function() {
    if(sprites[this.uidRegister]) {
        var data = [];
        if(this.params.length>2) {
            for(var i=2;i<this.params.length;i++) {
                data.push(this.getParam(i));
            }
        }
        sprites[this.uidRegister].mailbox[this.getParam(1)]=data
    }
    return true;
}

Sprite.prototype._receiveGoto = function() {
    if(this.mailbox[this.getParam(0)]?true:false) {
        this.mailbox[this.getParam(0)]=false;
        this.label=this.getParam(1);
        this.gotoOnScript=true;
    }
    return true;
}

Sprite.prototype._onReceiveGoto = function() {
    this.onReceive[this.getParam(0)]=this.getParam(1);
    return true;
}

Sprite.prototype._receive = function() {
    if(this.mailbox[this.getParam(0)]?true:false) {
        if(this.params.length>0) {
            for(var i=1;i<this.params.length;i++) {
                this.vars[this.params[i]]=this.mailbox[this.getParam(0)].shift();
            }
        }
        this.mailbox[this.getParam(0)]=false;
    }
    return true;
}

Sprite.prototype._unreceive = function() {
    this.onReceive = [];
    return true;
}

Sprite.prototype._drainMailbox = function() {
    this.mailbox=[];
    return true;
}

Sprite.prototype._onColidGoto = function() {
    this.collisionRules[this.getParam(0)]={action:"goto",params:this.params};
    return true;
}

Sprite.prototype._onColidPost = function() {
    this.collisionRules[this.getParam(0)]={action:"post",params:this.params};
    return true;
}

Sprite.prototype._uncolid = function() {
    if(this.params && this.params.length>0) {
        this.collisionRules[this.getParam(0)]="";
    }
    else {
        this.collisionRules=[];
    }
    return true;
}

Sprite.prototype._lastKey = function() {
    if(Gbl.keyPressed[this.getParam(0)]) {
        this.label = this.getParam(1);
        this.gotoOnScript=true;  
    }
    return true;
}

Sprite.prototype._key = function() {
    if(Gbl.keyPressed[this.getParam(0)]) {
        Gbl.keyCode=null;
        Gbl.keyPressed[this.getParam(0)]=false; // <<==== spécial interface écran
        this.label = this.getParam(1);
        this.gotoOnScript=true;  
    }
    return true;
}

Sprite.prototype._keyGosub = function() {
    if(Gbl.keyPressed[this.getParam(0)]) {
        Gbl.keyCode=null;
        this.callStack.push(this.posOnScript);
        this.label = this.getParam(1);
        this.gotoOnScript=true;  
    }
    return true;
}

Sprite.prototype._keyEnter = function() {
    if(Gbl.keyEnter[this.getParam(0)]) {
        Gbl.keyEnter[this.getParam(0)]=false;
        this.callStack.push(this.posOnScript);
        this.label = this.getParam(1);
        this.gotoOnScript=true;  
    }
    return true;
}

Sprite.prototype._keyExit = function() {
    if(Gbl.keyExit[this.getParam(0)]) {
        Gbl.keyExit[this.getParam(0)]=false;
        this.callStack.push(this.posOnScript);
        this.label = this.getParam(1);
        this.gotoOnScript=true;
    }
    return true;
}

Sprite.prototype._isColidGoto = function() {
    if(Gbl.namedSprites[this.getParam(0)]) {
        for(var s in Gbl.namedSprites[this.getParam(0)]) {
            var dx=this.x-Gbl.namedSprites[this.getParam(0)][s].x;
            var dy=this.y-Gbl.namedSprites[this.getParam(0)][s].y;
            // detection collision basée sur toute la surface des sprites
            if(Math.abs(dx)<(Gbl.namedSprites[this.getParam(0)][s].halfWidth+this.halfWidth) && Math.abs(dy)<(Gbl.namedSprites[this.getParam(0)][s].halfHeight+this.halfHeight)) {
                this.uidRegister=Gbl.namedSprites[this.getParam(0)][s].uid;
                this.label = this.getParam(Math.floor(Math.random()*(this.params.length-1))+1);
                this.gotoOnScript=true;
                break;
            }
        }
    }
    return true;
}

Sprite.prototype._isColidPost = function() {
    if(Gbl.namedSprites[this.getParam(0)]) {
        for(var s in Gbl.namedSprites[this.getParam(0)]) {
            var dx=this.x-Gbl.namedSprites[this.getParam(0)][s].x;
            var dy=this.y-Gbl.namedSprites[this.getParam(0)][s].y;
            // detection collision basée sur toute la surface des sprites
            if(Math.abs(dx)<(Gbl.namedSprites[this.getParam(0)][s].halfWidth+this.halfWidth) && Math.abs(dy)<(Gbl.namedSprites[this.getParam(0)][s].halfHeight+this.halfHeight)) {
                for(var i in Gbl.namedSprites[this.getParam(0)]) {
                    if(Gbl.namedSprites[this.getParam(0)][i].name==this.getParam(0)) Gbl.namedSprites[this.getParam(0)][i].mailbox[this.getParam(1)]=[];
                }
                break;
            }
        }
    }
    return true;
}

Sprite.prototype._nickname = function() {
    this.nickname=this.getParam(0);
    return true;
}

Sprite.prototype._kill = function() {
    this.end=true;
    return false;
}

Sprite.prototype._nop = function() {
    return false;
}

Sprite.prototype._stay = function() {
    this.posOnScript--;
    return false;
}

Sprite.prototype._wait = function() {
    if(!this.waitOnScript) {
        this.waitOnScript=true, this.wait=this.getParam(0);
    }
    return false;
}

Sprite.prototype._bestWay = function() {
    var bw=-1;
    if(Gbl.namedSprites[this.getParam(0)]) {
        for(var s in Gbl.namedSprites[this.getParam(0)]) {
            bw = this.bestWay(
                this.col,this.row,
                this.receiveCol,this.receiveRow
            );
            break;
        }
    }
    if(bw>-1) {
        this.label = this.getParam(bw+1);
        this.gotoOnScript=true;
    }
    return true;
}

Sprite.prototype._bestWayTo = function() {
    var bw = this.bestWay(this.col,this.row,this.getParam(0),this.getParam(1));
    if(bw>-1) {
        this.label = this.getParam(bw+2);
        this.gotoOnScript=true;  
    }
    return true;
}

Sprite.prototype._isPlace = function() {
    if(this.col==this.getParam(0) && this.row==this.getParam(1)) {
        this.label = this.getParam(2);
        this.gotoOnScript=true;  
    }
    return true;
}

Sprite.prototype._isCol = function() {
    if(this.col==this.getParam(0)) {
        this.label = this.getParam(1);
        this.gotoOnScript=true;  
    }
    return true;
}

Sprite.prototype._isRow = function() {
    if(this.row==this.getParam(0)) {
        this.label = this.getParam(1);
        this.gotoOnScript=true;  
    }
    return true;
}

Sprite.prototype._onCount = function() {
    var c = 0;
    if(Gbl.namedSprites[this.getParam(0)]) {
        for(var i in Gbl.namedSprites[this.getParam(0)]) {
            if(this.uid!=Gbl.namedSprites[this.getParam(0)][i].uid) {
                if(this.col==Gbl.namedSprites[this.getParam(0)][i].col && this.row-1==Gbl.namedSprites[this.getParam(0)][i].row) c++;
                if(this.col==Gbl.namedSprites[this.getParam(0)][i].col && this.row+1==Gbl.namedSprites[this.getParam(0)][i].row) c++;
                if(this.col-1==Gbl.namedSprites[this.getParam(0)][i].col && this.row==Gbl.namedSprites[this.getParam(0)][i].row) c++;
                if(this.col+1==Gbl.namedSprites[this.getParam(0)][i].col && this.row==Gbl.namedSprites[this.getParam(0)][i].row) c++;
            }
        }
    }
    this.label = this.getParam(c+1);
    if(this.log) out("### "+c+" ### "+this.label);
    this.gotoOnScript=true;  
    return true;
}

Sprite.prototype._info = function() {
    $QS("#info").innerHTML = this.label;
    out(this.label);
    return true;
}

Sprite.prototype._speed = function() {
    this.speedFactor=this.getParam(0);
    return true;
}

Sprite.prototype._playSound = function() {
    $QS(this.getParam(0)).loop=false;
    $QS(this.getParam(0)).play();
    return true;
}

Sprite.prototype._loopSound = function() {
    $QS(this.getParam(0)).loop=true;
    $QS(this.getParam(0)).play();
    return true;
}

Sprite.prototype._pauseSound = function() {
    $QS(this.getParam(0)).pause();
    return true;
}

Sprite.prototype._stopSound = function() {
    $QS(this.getParam(0)).pause();
    $QS(this.getParam(0)).currentTime=0;
    return true;
}

Sprite.prototype._collisionRadius = function() {
    this.halfWidth = parseInt(this.getParam(0));
    if(this.params.length>1) this.halfHeight = parseInt(this.getParam(1));
    else  this.halfHeight = parseInt(this.getParam(0));
    return true;
}

Sprite.prototype._setVar = function() {
    var v = this.getParam(1);
    if(isNaN(v)) this.vars[this.params[0]]=v;
    else this.vars[this.params[0]]=parseFloat(v);
    return true;
}

Sprite.prototype._setRandomVar = function() {
    var step = this.params.length==4 ? parseFloat(this.getParam(3)) : 1;
    var plage = (parseFloat(this.getParam(2))-parseFloat(this.getParam(1))) / step;
    this.vars[this.params[0]] = Math.floor(Math.random()*(plage+1))*step+parseFloat(this.getParam(1));
    return true;
}

Sprite.prototype._getRegisterVar = function() {
    if(sprites[this.uidRegister]) {
        if(sprites[this.uidRegister].vars.hasOwnProperty(this.params[0])) {
            this.vars[this.params[0]]=sprites[this.uidRegister].vars[this.params[0]];
        }
    }
    return true;
}

Sprite.prototype._reset = function() {
    this._drainStack();
    this._drainMailbox();
    this._undefer();
    this._uncolid();
    this._uncolidable();
    this._unreceive();
    this.attached=null;
    return true;
}

Sprite.prototype._attach = function() {
    if(sprites[this.uidRegister]) {
        if(sprites[this.uidRegister].attachable) {
            this.attached = this.uidRegister;
            this.attachedRelativeX = this.x - sprites[this.uidRegister].x;
            this.attachedRelativeY = this.y - sprites[this.uidRegister].y;
        }
    }
    return true;
}

Sprite.prototype._unattach = function() {
    this.attached = null;
    return true;
}

Sprite.prototype._isAttach = function() {
    if(this.attached!=null) {
        this.label = this.getParam(0);
        this.gotoOnScript=true;  
    }
    return true;
}

Sprite.prototype._detach = function() {
    for(var i in sprites) {
        if(sprites[i].attached==this.uid) sprites[i].attached=null;
    }
    return true;
}

Sprite.prototype._attachable = function() {
    this.attachable = true;
    return true;
}

Sprite.prototype._unattachable = function() {
    this.attachable = false;
    return true;
}

Sprite.prototype._followAttached = function() {
    if(sprites[this.attached]) {
        this.setX(sprites[this.attached].x + this.attachedRelativeX);
        this.setY(sprites[this.attached].y + this.attachedRelativeY);
        if(this.outRight!=null) if(this.outRightTest()) {
            this.label=this.outRight;
            this.gotoOnScript=true; 
            return true;
        }
        if(this.outLeft!=null) if(this.outLeftTest()) {
            this.label=this.outLeft;
            this.gotoOnScript=true; 
            return true;
        }
        if(this.outUp!=null) if(this.outUpTest()) {
            this.label=this.outUp;
            this.gotoOnScript=true; 
            return true;
        }
        if(this.outDown!=null) if(this.outDownTest()) {
            this.label=this.outDown;
            this.gotoOnScript=true; 
            return true;
        }
    }
    return true;
}

Sprite.prototype._compute = function() {
    var formula = this.params[1];
    var formulaVars = formula.match(/(\$[A-Za-z0-9]*)/g);
    formula = formula.replace("@maxcol",Gbl.mapWitdh-1);
    formula = formula.replace("@maxrow",Gbl.mapHeight-1);
    formula = formula.replace("@col",this.col);
    formula = formula.replace("@row",this.row);
    formula = formula.replace("@x",this.x);
    formula = formula.replace("@y",this.y);
    formula = formula.replace("@rotation",this.rotation);
    formula = formula.replace("@TAU",Gbl.TAU);
    for(var i in formulaVars) {
        formula = formula.replace(formulaVars[i],this.vars[formulaVars[i]]);
    }
    this.vars[this.params[0]] = eval(formula);
    return true;
}

Sprite.prototype._ifEqualGoto = function() {
    if(parseFloat(this.getParam(0))==parseFloat(this.getParam(1))) {
        this.label=this.getParam(2);
        this.gotoOnScript=true;
    }
    return true;
}

Sprite.prototype._ifEqualGosub = function() {
    if(parseFloat(this.getParam(0))==parseFloat(this.getParam(1))) {
        this.callStack.push(this.posOnScript);
        this.label=this.getParam(2);
        this.gotoOnScript=true;
    }
    return true;
}

Sprite.prototype._ifInfGoto = function() {
    if(parseFloat(this.getParam(0))<parseFloat(this.getParam(1))) {
        this.label=this.getParam(2);
        this.gotoOnScript=true;
    }
    return true;
}

Sprite.prototype._ifInfGosub = function() {
    if(parseFloat(this.getParam(0))<parseFloat(this.getParam(1))) {
        this.callStack.push(this.posOnScript);
        this.label=this.getParam(2);
        this.gotoOnScript=true;
    }
    return true;
}

Sprite.prototype._ifSupGoto = function() {
    if(parseFloat(this.getParam(0))>parseFloat(this.getParam(1))) {
        this.label=this.getParam(2);
        this.gotoOnScript=true;
    }
    return true;
}
    

Sprite.prototype._ifSupGosub = function() {
    if(parseFloat(this.getParam(0))>parseFloat(this.getParam(1))) {
        this.callStack.push(this.posOnScript);
        this.label=this.getParam(2);
        this.gotoOnScript=true;
    }
    return true;
}

Sprite.prototype._create = function() {
    var s = new Sprite();
    s.setScript(scriptDecode(scripts["_"+this.getParam(0)].content.join(" ")));
    sprites[s.uid]=s;
    if(this.params.length>1) {
        var data = [];
        for(var i=1;i<this.params.length;i++) {
            data.push(this.getParam(i));
        }
        sprites[s.uid].mailbox["create"]=data
    }
    return true;
}

Sprite.prototype._rotate = function() {
    this.rotate2(parseFloat(this.getParam(0)));
    return true;
}

Sprite.prototype._setRotation = function() {
    this.setRotation(parseFloat(this.getParam(0)));
    return true;
}

Sprite.prototype._setDx = function() {
    this.dx = parseFloat(this.getParam(0));
    return true;
}

Sprite.prototype._setDy = function() {
    this.dy = parseFloat(this.getParam(0));
    return true;
}

Sprite.prototype._setDxyOnAngle = function() {
    this.dx = - parseFloat(this.getParam(0)) * Math.sin(Gbl.TAU*(360-parseFloat(this.getParam(1)))/360);
    this.dy = - parseFloat(this.getParam(0)) * Math.cos(Gbl.TAU*(360-parseFloat(this.getParam(1)))/360);
    return true;
}

Sprite.prototype._move = function() {
    this.setX(this.x + this.dx);
    this.setY(this.y + this.dy);
    if(this.outLeft!=null) if(this.outLeftTest()) {
        this.label=this.outLeft;
        this.gotoOnScript=true; 
        return true;
    }
    if(this.outRight!=null) if(this.outRightTest()) {
        this.label=this.outRight;
        this.gotoOnScript=true; 
        return true;
    }
    if(this.outUp!=null) if(this.outUpTest()) {
        this.label=this.outUp;
        this.gotoOnScript=true; 
        return true;
    }
    if(this.outDown!=null) if(this.outDownTest()) {
        this.label=this.outDown;
        this.gotoOnScript=true; 
        return true;
    }
    return false;
}

Sprite.prototype._say = function() {
    $QS("#info").innerHTML = this.getParam(0);
    return true;
}

Sprite.prototype._launchScenario = function() {
    window.open (this.getParam(0),'_self',false);
}

Sprite.prototype._countNamed = function() {
    var c = 0;
    if(Gbl.namedSprites[this.getParam(1)]) c = Gbl.namedSprites[this.getParam(1)].reduce((a,v)=>v?a+1:a,0);
    this.vars[this.params[0]]=c;
    return true;
}

Sprite.prototype._followPath = function() {
    if(!this.curvePath) {
        this.curvePath = Smooth(Gbl.pathes[this.getParam(0)], {
        	method: Smooth.METHOD_CUBIC, 
        	clip: Smooth.CLIP_PERIODIC, 
	        cubicTension: Smooth.CUBIC_TENSION_CATMULL_ROM
        });
        this.prevPosPath = this.curvePath(this.getParam(1));
    }
    this.vars[this.params[1]]+=parseFloat(this.getParam(2));
    this.curPosPath = this.curvePath(this.vars[this.params[1]]);
    this.dx = this.curPosPath[0]-this.prevPosPath[0];
    this.dy = this.curPosPath[1]-this.prevPosPath[1];
    this.setRotation(Math.atan2(this.dy,this.dx) * 180 / Math.PI - 90);
    this.prevPosPath = this.curPosPath;
    return false;
}

Sprite.prototype._isColInvalid = function() {
    if(this.getParam(0)<0 || this.getParam(0)>=Gbl.mapWidth) {
        this.label = this.getParam(1);
        this.gotoOnScript = true;
    }
    return true;
}

Sprite.prototype._isRowInvalid = function() {
    if(this.getParam(0)<0 || this.getParam(0)>=Gbl.mapHeight) {
        this.label = this.getParam(1);
        this.gotoOnScript = true;
    }
    return true;
}

Sprite.prototype._clickable = function() {
    if(this.pixiSprite) {
        this.pixiSprite.interactive = true;
        this.clickable = true;
        this.clickDetection();
    }
    return true;
}

Sprite.prototype._unclickable = function() {
    if(this.pixiSprite) {
        this.pixiSprite.interactive = false;
        this.clickable = false;
    }
    return true;
}

Sprite.prototype._onClick = function() {
    if(this.pixiSprite) {
        if(this.pixiSprite.interactive==true) {
            this.clickRule = {action:"goto",params:this.params};
        }
    }
    return true;
}

Sprite.prototype.setScript = function(script) {
    this.etiqs = script.etiqs;
    this.script = script.instructions;
    this.posOnScript = 0;
    this.waitOnScript = false;
    this.gotoOnScript = false;
}

Sprite.prototype.getParam = function(p) {
    switch(this.params[p].substr(0,1)) {
        case "$":
            return this.vars[this.params[p]];
        case "@":
            switch(this.params[p]) {
                case "@maxcol": return Gbl.mapWidth-1;
                case "@maxrow": return Gbl.mapHeight-1;
                case "@col": return this.col;
                case "@row": return this.row;
                case "@x": return this.x;
                case "@y": return this.y;
                case "@dx": return this.dx;
                case "@dy": return this.dy;
                case "@rotation": return this.rotation;
                default : return "";
            }
        default:
            return this.params[p];
    }
//    return this.params[p].substr(0,1)=="$" ? this.vars[this.params[p]] : this.params[p];
}

Sprite.prototype.playScript = function(command) {

    // absence de script, pas la peine d'aller plus loin

    if(!this.script) return;

    // boucle de traitement

    do {

        // par défaut la boucle devra s'arrêter

        var redo=false;

        // par défaut on doit traiter la commande

        var computeNext = true;

        // pour mémoriser la commande pour l'afficher dans la log

        var lastCommand = "";

        // commande fournie par l'appelant

        if(command!="") {
            if(this.log) out(">>>>>> "+JSON.stringify(command));
            if(command.action) {
                switch(command.action) {
                    case "goto":
                        this.label = command.params[Math.floor(Math.random()*(command.params.length-1))+1];
                        this.gotoOnScript=true;
                        break;
                    case "post":
                        for(var i in sprites) {
                            if(sprites[i].name==command.params[0]) sprites[i].mailbox[command.params[1]]=[];
                        }
                        break;
                }
            }
            command="";
        }

        else {
            for(var i in this.onReceive) {
                if(this.mailbox[i]?true:false) {
                    // this.mailbox[i]=false;
                    this.label=this.onReceive[i];
                    this.gotoOnScript=true;
                    break;
                }
            }
        }

        // traitement du click

        if(!this.gotoOnScript && this.clickable && Gbl.lastClicked==this.uid && this.clickRule!=null) {
            this.label = this.clickRule.params[Math.floor(Math.random()*(this.clickRule.params.length-1))];
            this.gotoOnScript=true;
            Gbl.lastClicked=-1;
        }

        // si on est à la recherche d'une étiquette

        //else 
        if(this.gotoOnScript) {
            this.gotoOnScript=false;
            this.posOnScript=this.etiqs[this.label];
        }

        // fin de script atteinte, pas la peine d'aller plus loin

        if(this.posOnScript>=this.script.length) return;

        // si on n'est pas en attente de la fin d'un commande alors
        // on déplie l'instruction du script

        if(!this.waitOnScript) {
            lastCommand=this.script[this.posOnScript];
            this.cmd = lastCommand.cmd;
            this.etiq = lastCommand.etiq; 
            this.params = lastCommand.params;
        }

        // on traite l'instruction

        //if(this.cmd!=":") redo = this["_"+this.cmd]();
        if(this.cmd!=":") redo = this[Gbl.verbs[this.cmd].fct]();
        else redo=true; // <== ajout récent !!! vérifier si pas d'effets de bords

        if(this.log && lastCommand.text!=undefined) {
            var message=lastCommand.text;
            if(this.gotoOnScript==true) message+=" ==> "+this.label;
            if(message!=this.lastMessage) {
                out(message)
            }
            this.lastMessage = message;
        }

        if(this.waitOnScript) this.wait-=Gbl.unit*this.speedFactor;
        if(this.waitOnScript && this.wait<=0) this.waitOnScript=false;
        if(!this.waitOnScript) {

            // defer
            if(this.deferLabel!="") {
                this.callStack.push(this.posOnScript-1);
                this.label = this.deferLabel;
                this.gotoOnScript=true;  
                this.deferLabel="";
                redo=true;
            }
            else {
                this.posOnScript+=1;
            }

            //

        }
    } while(redo);
}

