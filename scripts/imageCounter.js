//
// image counter
//
var counterImage = 0;
function imageIsLoaded(id) {
    out("imageIsLoaded for "+id);
    counterImage++;
}
//
var imageCounter = document.querySelectorAll('img[onload="imageIsLoaded();"]').length;
//

//
// sound counter
//
var counterSound = 0;
function soundIsLoaded() {
    out("soundIsLoaded for "+this.id);
    counterSound++;
}
//
var soundCounter = document.querySelectorAll('source[onload="soundIsLoaded();"]').length;
//

//
// launcher
//
function launchWhenReady(scenario,fct) {
    var launcher = setInterval(
        (function(scenario,fct) { return function() {
            if(counterImage>=imageCounter && counterSound>=soundCounter) {
                out("Resources loaded");
                clearInterval(launcher);
                fct(scenario);
            }
        }})(scenario,fct)
        ,1000
    );
}