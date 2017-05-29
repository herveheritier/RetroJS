_____________
# RetroJS
_____________

Pour une documentation détaillée, consulter le [wiki RetroJS](https://github.com/herveheritier/RetroJS/wiki)

RetroJS est un moteur de jeu tournant dans une page web sous navigateur.

Il est piloté par un scénario contenant des scripts que le développeur écrira dans un pseudoCode spécifique. Chaque script sera utilisé pour piloter un ou plusieurs sprites et chaque sprite sera piloté par un seul script.

Ce pseudoCode est proche d'un langage pour le pilotage d'automates.

## Avant de commencer

### Framework tiers
  RetroJS utilise les frameworks
  - [PixiJS v4](https://github.com/pixijs/pixi.js)
  - [pixi-display v1.1.1](https://github.com/pixijs/pixi-display)
  - [Smooth.js v0.1.5](https://github.com/osuushi/Smooth.js)  
 
  Il faut se procurer ses éléments en les téléchargeant sur leur site respectif afin de les intégrer dans votre projet RetroJS.

### Fonctionnement en mode serveur
  Pour fonctionner le moteur RetroJS doit être appelé en mode serveur. Si vous ne possédez pas de serveur local, vous devez d'abord en installer un (comme par exemple [Caddy](https://github.com/mholt/caddy)). Ensuite créez votre projet RetroJS dans un sous-répertoire de votre site web local.
  
## Construire son projet RetroJS

### Structure minimale d'un projet.

      .                               racine du sous-répertoire de votre projet RetroJS dans votre site web local
      |
      +--- index.html                 la page html embarquant le moteur RetroJS et votre scénario
      |
      +--- scripts                    <répertoire>
      |    |
      |    +--- easy.js               scripts du moteur RetroJS
      |    +--- global.js             ...
      |    +--- imageCounter.js       ...
      |    +--- loadScenario.js       ...
      |    +--- main.js               ...
      |    +--- sprite.js             ...
      |    +--- pixi.min.js           framework PixiJS
      |    +--- pixi.display.js       complément au framework PixiJS
      |    +--- smooth.js             framework Smooth.js 
      |
      +--- resources                  <répertoire>
      |    |
      |    +--- scenario.txt          votre scénario RetroJS à développer en pseudoCode
      |    +--- *.png                 les ressources images
      |    +--- *.mp4                 les ressources sonores
      |
      +--- styles                     <répertoire>
           |
           +--- base.css              la feuille de style de base de la page html

### Page html embarquant le moteur RetroJS et un scénario minimal
   
 Vous pouvez créer votre projet en partant de sa version minimale présente dans le répertoire [samples/minimal](https://github.com/herveheritier/RetroJS/tree/master/samples/minimal).
 
 Vous pouvez aussi voir le résultat sur le site de l'auteur : [RetroJS Minimal Scenario](http://heritier.herve.free.fr/RetroJS/samples/minimal/)
