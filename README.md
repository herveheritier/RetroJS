_____________
# RetroJS
_____________

Pour une documentation détaillée, consulter le [wiki RetroJS](#https://github.com/herveheritier/RetroJS.wiki.git)

RetroJS est un moteur de jeu tournant sous navigateur.

Il est piloté par un scénario contenant des scripts que le développeur écrira dans un pseudoCode spécifique.

Ce pseudoCode est proche d'un langage pour le pilotage d'automate à états.

## Avant de commencer

### Framework tiers
  RetroJS utilise le framework [PixiJS v4](http://www.pixijs.com/)
  et le complément [pixi-display v1.1.1](https://www.npmjs.com/package/pixi-display)
  Il faut se procurer ses éléments en les téléchargeant sur leur site respectif afin de les intégrer dans votre projet RetroJS.

### Fonctionnement en mode serveur
  Pour fonctionner le moteur RetroJS doit être appelé en mode serveur. Si vous ne possédez pas de serveur local, vous devez d'abord en installer un. Ensuite créez votre projet RetroJS dans un sous-répertoire de votre site web local.
  
## Construire son projet RetroJS

### Structure minimale d'un projet.

      .                               racine d'un sous-répertoire de votre site web local
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

### Page html embarquant le moteur RetroJS et votre scénario
   
 Une page de base se trouve dans le répertoire samples/minimal du projet GitHub
