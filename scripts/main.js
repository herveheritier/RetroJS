// generate scenario
LoadScenario(function(scenario){

//***********************************************************/
//LAUNCH SCRIPT ONLY WHEN ALL IMAGES ARE LOADED
launchWhenReady(scenario,function(scenario) {
//LAUNCH SCRIPT ONLY WHEN ALL IMAGES ARE LOADED
//***********************************************************/

// set globals parameters with current scenario
Gbl.setParameters(scenario);

// create application
var app = new PIXI.Application(Gbl.canvasWidth,Gbl.canvasHeight);
$QS("#canvasContainer").appendChild(app.view);

// create display list
app.stage.displayList = new PIXI.DisplayList();

// create layers
Gbl.decorLayer = new PIXI.DisplayGroup(0,false);
Gbl.materialLayer = new PIXI.DisplayGroup(1,false);
Gbl.mobileLayer = new PIXI.DisplayGroup(2,false);

// create containers
Gbl.decorContainer = new PIXI.Container();
Gbl.materialContainer = new PIXI.Container();
Gbl.mobileContainer = new PIXI.Container();

// add containers to stage
app.stage.addChild(Gbl.decorContainer);
app.stage.addChild(Gbl.materialContainer);
app.stage.addChild(Gbl.mobileContainer);

var collisions = function(o) {
    for(var i=0;i<o.length;i++) if(o[i]) o[i].collider = []; //-1;
    for(var i=0;i<o.length-1;i++) {
        if(o[i]) if(o[i].colidable) {
            for(var j=i+1;j<o.length;j++) {
                if(o[j]) if(o[j].colidable) {
                    var dx=o[i].x-o[j].x;
                    var dy=o[i].y-o[j].y;
                    
                    // detection collision basée sur toute la surface des sprites
                    if(Math.abs(dx)<(o[j].halfWidth+o[i].halfWidth) && Math.abs(dy)<(o[j].halfHeight+o[i].halfHeight)) {
                        o[i].collider.push(o[j].name);
                        o[j].collider.push(o[i].name);
                    }
                    /*
                    // detection collision basée sur le rayon intérieur des sprites égals à leur largeur
                    if(Math.sqrt(dx*dx+dy*dy)<(o[j].halfWidth+o[i].halfWidth)) {
                        o[i].collider.push(o[j].name);
                        o[j].collider.push(o[i].name);
                    }*/
                }
            }
        }
    }
}

// shuffle an array content
var shuffle = function(a)
{
   var j = 0;
   var valI = '';
   var valJ = valI;
   var l = a.length - 1;
   while(l > -1)
   {
		j = Math.floor(Math.random() * l);
		valI = a[l];
		valJ = a[j];
		a[l] = valJ;
		a[j] = valI;
		l = l - 1;
	}
	return a;
 }

for(var i in scenario.elements) {
    var s = new Sprite();
    s.setScript(scenario.elements[i].script);
    sprites[s.uid]=s;
}

requestAnimationFrame(loop);

function loop(){
    if(scenario.showFps) Gbl.oneFrame();
    if(scenario.activeOnColid) {
        collisions(sprites);
        for(var i in sprites) {
            var c = "";
            if(sprites[i].collider.length>0) {
                shuffle(sprites[i].collider);
                for(var sc in sprites[i].collider) {
                    c = sprites[i].collisionRules[sprites[i].collider[sc]];
                    if(c) break;
                } 
            }
            if(c && c!="") {
                sprites[i].setX(sprites[i].xPrev);
                sprites[i].setY(sprites[i].yPrev);
                sprites[i].playScript(c);
            }
            else {
                sprites[i].xPrev=sprites[i].x;
                sprites[i].yPrev=sprites[i].y;
                sprites[i].playScript("");
            }
        }
    }
    else {
        for(var i in sprites) {
            sprites[i].xPrev=sprites[i].x;
            sprites[i].yPrev=sprites[i].y;
            sprites[i].playScript("");
        }
    }

    for(var i in sprites) {
        if(sprites[i].end===true) {
            if(sprites[i].name!="") delete Gbl.namedSprites[sprites[i].name][sprites[i].uid];
            if(sprites[i].pixiSprite) sprites[i].pixiSprite.destroy(false,true,false);
            Gbl.releaseUid(sprites[i].uid);
            delete sprites[i];
        }
    }

    app.render();
    for(var i in sprites) { sprites[i].draw(); }
    requestAnimationFrame(loop);
}

if(scenario.showFps) {
    setInterval(function(){
        $QS("#info").innerHTML=Gbl.getFPS()+"fps";
    },5000);
}

//***********************************************************/
//LAUNCH SCRIPT ONLY WHEN ALL IMAGES ARE LOADED
});
//LAUNCH SCRIPT ONLY WHEN ALL IMAGES ARE LOADED
//***********************************************************/

});