_____________
# RetroJS
_____________

## TODO :
documenter : 

reset, getRegisterVar, ifEqualGoto, ifInfGoto, ifSupGoto, create, rotate, setRotation, setDxyOnAngle, move ( / _rend la main_), ifEqualGosub, ifInfGosub, ifSupGosub, followPath ( / _rend la main_), dequeue, enqueue, countNamed, printCenter, print, charMap, launchScenario, say, setDy, setDx, setRandomVar, 

________________
## Table des matières
________________
<!-- TOC -->

- [RetroJS](#retrojs)
    - [TODO :](#todo-)
    - [Table des matières](#table-des-matières)
    - [Présentation de RetroJS](#présentation-de-retrojs)
        - [**RetroJS c'est quoi ?**](#retrojs-cest-quoi-)
        - [**Le moteur RetroJS**](#le-moteur-retrojs)
        - [**Le pseudoCode**](#le-pseudocode)
        - [**Le scenario**](#le-scenario)
        - [**Les balises de paragraphe**](#les-balises-de-paragraphe)
        - [**Rendu**](#rendu)
    - [Le paragraphe #scenario](#le-paragraphe-scenario)
        - [Les verbes du paragraphe `#scenario`](#les-verbes-du-paragraphe-scenario)
            - [**name** - nomme le scénario](#name---nomme-le-scénario)
            - [**background** - fond de la zone de jeu](#background---fond-de-la-zone-de-jeu)
            - [**screenWidth** - largeur de la zone de jeu](#screenwidth---largeur-de-la-zone-de-jeu)
            - [**screenHeight** - hauteur de la zone de jeu](#screenheight---hauteur-de-la-zone-de-jeu)
            - [**mapWidth** - largeur de la map de jeu](#mapwidth---largeur-de-la-map-de-jeu)
            - [**mapHeight** - hauteur de la zone de jeu](#mapheight---hauteur-de-la-zone-de-jeu)
            - [**mapOrigin** -](#maporigin--)
            - [**spriteSize** - dimension d'un sprite](#spritesize---dimension-dun-sprite)
            - [**thick** - ?????](#thick---)
            - [**unit** - ?????](#unit---)
            - [**showFps** - ?????](#showfps---)
            - [**unactiveOnColid** - ?????](#unactiveoncolid---)
    - [Les paragraphes `#script`](#les-paragraphes-script)
        - [Les caractéristiques des instructions](#les-caractéristiques-des-instructions)
        - [Structuration du code](#structuration-du-code)
        - [Les verbes d'opération sur les variables](#les-verbes-dopération-sur-les-variables)
            - [**setVar** - affectation](#setvar---affectation)
            - [**compute** - calcul](#compute---calcul)
        - [Les verbes de gestion des collisions](#les-verbes-de-gestion-des-collisions)
            - [**colidable** - participe aux collisions](#colidable---participe-aux-collisions)
            - [**uncolidable** - ne participe pas aux collisions](#uncolidable---ne-participe-pas-aux-collisions)
            - [**onColidGoto** - débranchement sur collision](#oncolidgoto---débranchement-sur-collision)
            - [**onColidPost** - envoi de message sur collision](#oncolidpost---envoi-de-message-sur-collision)
            - [**isColidGoto** - débranchement sur collision](#iscolidgoto---débranchement-sur-collision)
            - [**isColidPost** - envoi de message sur collision](#iscolidpost---envoi-de-message-sur-collision)
            - [**collisionRadius** - rayon de collision](#collisionradius---rayon-de-collision)
            - [**uncolid** - fin de collision](#uncolid---fin-de-collision)
        - [Les verbes de détection de la position](#les-verbes-de-détection-de-la-position)
            - [**isColInvalid** - controle la validité d'une colonne](#iscolinvalid---controle-la-validité-dune-colonne)
            - [**isRowInvalid** - controle la validité d'une ligne](#isrowinvalid---controle-la-validité-dune-ligne)
            - [**out** - sortie de la zone d'affichage](#out---sortie-de-la-zone-daffichage)
            - [**outRight** - sortie par la droite de la zone d'affichage](#outright---sortie-par-la-droite-de-la-zone-daffichage)
            - [**outLeft** - sortie par la gauche de la zone d'affichage](#outleft---sortie-par-la-gauche-de-la-zone-daffichage)
            - [**outUp** - sortie par le haut de la zone d'affichage](#outup---sortie-par-le-haut-de-la-zone-daffichage)
            - [**outDown** - sortie par le bas de la zone d'affichage](#outdown---sortie-par-le-bas-de-la-zone-daffichage)
            - [**isPlace** - teste de position](#isplace---teste-de-position)
            - [**isCol** - teste de position colonne](#iscol---teste-de-position-colonne)
            - [**isRow** - teste de position ligne](#isrow---teste-de-position-ligne)
            - [**onCount** - test de présence](#oncount---test-de-présence)
        - [Les verbes de gestion des entrées / sorties](#les-verbes-de-gestion-des-entrées--sorties)
            - [**key** - débranchement si touche pressée](#key---débranchement-si-touche-pressée)
            - [**lastKey** - débrachement si dernière touche pressée](#lastkey---débrachement-si-dernière-touche-pressée)
            - [**keyGosub** - routine déclenchée si touche pressée](#keygosub---routine-déclenchée-si-touche-pressée)
            - [**keyEnter** - routine déclenchée si touche enfoncée](#keyenter---routine-déclenchée-si-touche-enfoncée)
            - [**keyExit** - routine déclenché si touche relachée](#keyexit---routine-déclenché-si-touche-relachée)
        - [Les verbes de gestion des image, animation et affichage](#les-verbes-de-gestion-des-image-animation-et-affichage)
            - [**decor** - sprite comme élément du décor](#decor---sprite-comme-élément-du-décor)
            - [**material** - sprite comme élément intermédiaire](#material---sprite-comme-élément-intermédiaire)
            - [**mobile** - sprite comme élément principal](#mobile---sprite-comme-élément-principal)
            - [**image** - chargement d'une image simple](#image---chargement-dune-image-simple)
            - [**map** - chargement d'un image depuis une spriteMap](#map---chargement-dun-image-depuis-une-spritemap)
            - [**animation** - chargement d'une animation](#animation---chargement-dune-animation)
            - [**anime** - lance un animation](#anime---lance-un-animation)
            - [**isAnimeGoto** - test l'image d'une animation](#isanimegoto---test-limage-dune-animation)
            - [**hide** - cache le sprite](#hide---cache-le-sprite)
            - [**show** - montre le sprite](#show---montre-le-sprite)
            - [**sx** - échelle horizontale](#sx---échelle-horizontale)
            - [**sy** - échelle verticale](#sy---échelle-verticale)
        - [Les verbes de gestion de la position du sprite](#les-verbes-de-gestion-de-la-position-du-sprite)
            - [**x** - position horizontale au pixel près](#x---position-horizontale-au-pixel-près)
            - [**y** - position verticale au pixel près](#y---position-verticale-au-pixel-près)
            - [**col** - position colonne](#col---position-colonne)
            - [**row** - position ligne](#row---position-ligne)
            - [**replace** - repositionne](#replace---repositionne)
        - [D-Map](#d-map)
            - [**dmapIn** - mémorisation dans la D-Map](#dmapin---mémorisation-dans-la-d-map)
            - [**dmapOut** - effacement dans la D-Map](#dmapout---effacement-dans-la-d-map)
            - [**seeUp** - recherche en haut dans la D-Map](#seeup---recherche-en-haut-dans-la-d-map)
            - [**seeDown** - recherche en bas dans la D-Map](#seedown---recherche-en-bas-dans-la-d-map)
            - [**seeLeft** - recherche à gauche dans la D-Map](#seeleft---recherche-à-gauche-dans-la-d-map)
            - [**seeRight** - recherche à droite dans la D-Map](#seeright---recherche-à-droite-dans-la-d-map)
            - [**bestWay** - recherche le meilleur chemin dans la D-Map](#bestway---recherche-le-meilleur-chemin-dans-la-d-map)
            - [**bestWayTo** - recherche le meilleur chemin dans la D-Map](#bestwayto---recherche-le-meilleur-chemin-dans-la-d-map)
        - [Les verbes de gestion du déplacement du sprite](#les-verbes-de-gestion-du-déplacement-du-sprite)
            - [**up** - déplacement vers le haut en unités pondérées](#up---déplacement-vers-le-haut-en-unités-pondérées)
            - [**down** - déplacement vers le bas en unités pondérées](#down---déplacement-vers-le-bas-en-unités-pondérées)
            - [**left** - déplacement vers la gauche en unités pondérées](#left---déplacement-vers-la-gauche-en-unités-pondérées)
            - [**right** - déplacement vers la droite en unités pondérées](#right---déplacement-vers-la-droite-en-unités-pondérées)
            - [**goUp** - déplacement d'une ligne vers le haut](#goup---déplacement-dune-ligne-vers-le-haut)
            - [**goDown** - déplacement d'une ligne vers le bas](#godown---déplacement-dune-ligne-vers-le-bas)
            - [**goLeft** - déplacement d'une colonne vers la gauche](#goleft---déplacement-dune-colonne-vers-la-gauche)
            - [**goRight** - déplacement d'une colonne vers la droite](#goright---déplacement-dune-colonne-vers-la-droite)
            - [**speed** - facteur de vitesse](#speed---facteur-de-vitesse)
        - [Les verbes de test, de débranchements et de séquencement](#les-verbes-de-test-de-débranchements-et-de-séquencement)
            - [**stay** - mise en attente](#stay---mise-en-attente)
            - [**goto** - débranchement inconditionnel](#goto---débranchement-inconditionnel)
            - [**gosub** - appel d'une routine](#gosub---appel-dune-routine)
            - [**return** - retour en fin de routine](#return---retour-en-fin-de-routine)
            - [**noReturn** - retour en fin de routine](#noreturn---retour-en-fin-de-routine)
            - [**drainStack** - nettoyage de la pile d'appel des routines](#drainstack---nettoyage-de-la-pile-dappel-des-routines)
            - [**defer** - appel d'une routine après un laps de temps](#defer---appel-dune-routine-après-un-laps-de-temps)
            - [**undefer** - annule l'appel différé](#undefer---annule-lappel-différé)
            - [**is** - vérifie la présence d'un sprite en position relative](#is---vérifie-la-présence-dun-sprite-en-position-relative)
            - [**isHere** - vérifie la présence d'un sprite en position absolue](#ishere---vérifie-la-présence-dun-sprite-en-position-absolue)
            - [**isup** - vérifie la présence d'un sprite au dessus](#isup---vérifie-la-présence-dun-sprite-au-dessus)
            - [**isdown** - vérifie la présence d'un sprite au dessous](#isdown---vérifie-la-présence-dun-sprite-au-dessous)
            - [**isright** - vérifie la présence d'un sprite à droite](#isright---vérifie-la-présence-dun-sprite-à-droite)
            - [**isleft** - vérifie la présence d'un sprite à gauche](#isleft---vérifie-la-présence-dun-sprite-à-gauche)
        - [Les verbes de gestion de la communication entre sprites](#les-verbes-de-gestion-de-la-communication-entre-sprites)
            - [**post** - émission d'un message avec ou sans données](#post---émission-dun-message-avec-ou-sans-données)
            - [**postRegister** - émission d'un message vers le sprite mémorisé dans le registre](#postregister---émission-dun-message-vers-le-sprite-mémorisé-dans-le-registre)
            - [**receiveGoto** - débranchement si message reçu](#receivegoto---débranchement-si-message-reçu)
            - [**onReceiveGoto** - débranchement à la réception d'un message](#onreceivegoto---débranchement-à-la-réception-dun-message)
            - [**receive** - réception d'un message avec données](#receive---réception-dun-message-avec-données)
            - [**drainMailbox** - purge des messages en attente](#drainmailbox---purge-des-messages-en-attente)
            - [**unreceive** - annule onReceiveGoto](#unreceive---annule-onreceivegoto)
        - [Les verbes de gestion de l'attachement](#les-verbes-de-gestion-de-lattachement)
            - [**attach** - attache au sprite mémorisé dans le registre](#attach---attache-au-sprite-mémorisé-dans-le-registre)
            - [**unattach** - détache d'un sprite](#unattach---détache-dun-sprite)
            - [**isAttach** - test l'attache](#isattach---test-lattache)
            - [**followAttached** - suit les mouvements du sprite attaché](#followattached---suit-les-mouvements-du-sprite-attaché)
            - [**detach** - détache les sprites pouvant être attaché](#detach---détache-les-sprites-pouvant-être-attaché)
            - [**attachable** - rend le sprite attachable](#attachable---rend-le-sprite-attachable)
            - [**unattachable** - rend le sprite non attachable](#unattachable---rend-le-sprite-non-attachable)
        - [Les verbes de gestion des sprites](#les-verbes-de-gestion-des-sprites)
            - [**name** - donne un nom de famille au sprite](#name---donne-un-nom-de-famille-au-sprite)
            - [**kill** - suppression du sprite](#kill---suppression-du-sprite)
            - [**nop** - ne rien faire](#nop---ne-rien-faire)
        - [Les verbes d'émission de sons](#les-verbes-démission-de-sons)
            - [**playSound** - joue une séquence sonore](#playsound---joue-une-séquence-sonore)
            - [**loopSound** - joue en boucle une séquence sonore](#loopsound---joue-en-boucle-une-séquence-sonore)
            - [**pauseSound** - met sur pause une séquence sonore](#pausesound---met-sur-pause-une-séquence-sonore)
            - [**stopSound** - arrête la lecture d'une séquence sonore](#stopsound---arrête-la-lecture-dune-séquence-sonore)
        - [Les verbes d'aide au développement](#les-verbes-daide-au-développement)
            - [**nickname** - affecte un surnom](#nickname---affecte-un-surnom)
            - [**logon** - active les messages dans la console](#logon---active-les-messages-dans-la-console)
            - [**logoff** - désactive les messages dans la console](#logoff---désactive-les-messages-dans-la-console)
            - [**wait** - mise en attente limitée](#wait---mise-en-attente-limitée)
            - [**info** - affichage étiquette dans la console](#info---affichage-étiquette-dans-la-console)

<!-- /TOC -->
________________
## Présentation de RetroJS
________________
### **RetroJS c'est quoi ?**
  
  Avant de répondre à cette simple(!) question, commençons déjà par dire ce que n'est pas RetroJS. 

  - RetroJS n'est pas un framework
  
    Il ne peut pas être intégré dans un environnement logiciel pour réaliser des tâches spécialisées.

  - RetroJS n'est pas un langage

    Il ne peut être utilisé pour développer un logiciel.

  C'est quoi alors ?

  - **RetroJS** est un **moteur de jeu**

    C'est un moteur un peu particulier. Son coeur est très léger (~100ko non minify). Il a été développé en javascript pour fonctionner dans les navigateurs supportant le HTML5. Le moteur a pour seule fonction d'interpréter un jeu d'instructions spécifiques que l'on nomme "RetroJS pseudoCode". 

### **Le moteur RetroJS**

  Le moteur joue un rôle de chef d'orchestre où chaque membre de l'orchestre est un sprite.

  Chaque sprite possède un script qui est une suite d'instruction en pseudoCode.

  Le moteur fonctionne par cycles. Chaque cycle va réaliser un ensemble d'opérations puis quand le cycle s'achèvera, le moteur va démarrer un nouveau cycle qui va réaliser le même ensemble d'opérations que le cycle précédent.

  Un cycle se décompose en une série d'opérations réalisées dans un ordre précis :
  - calcul des collisions
  - exécution des instructions courantes du script de chaque sprite
  - suppression des sprites morts
  - rafraichissement de l'affichage

  La tâche la plus complexe est l'exécution de chaque script de chaque sprite.
  
  Dans un cycle et pour chaque sprite, les instructions de son script sont exécutées à partir de celle qui suit la dernière instruction a avoir été exécutée durant le cycle précédent et jusqu'à la prochaine instruction qui rendra la main au moteur pour traiter le script du sprite suivant.

  Le développeur devra savoir différencier les instructions capable de rendre la même au moteur, parce qu'en l'absence de celle-ci à l'intérieur d'une boucle fonctionnelle, la main ne sera jamais rendue au moteur !

### **Le pseudoCode**

  Le pseudoCode est un ensemble de verbes servant à composer les scripts. C'est une grammaire simple où chaque verbe est une instruction avec ou sans paramètres. Chaque instruction est indépendante. A l'exécution, une instruction réalisera des opérations plus ou moins complexes qui modifieront l'état du sprite associé au script dans laquelle elle se trouve. Les paramètres d'une instruction quand celle-ci en possède, sont des valeurs, des variables ou des étiquettes. 

### **Le scenario**

  Le scénario est un fichier texte contenant le pseudoCode. C'est la matière première à fournir au moteur RetroJS. On peut l'assimiler à une application ou un niveau d'un jeu. Il rassemble l'ensemble des déclarations et des scripts. Il est organisé en paragraphes. Chaque paragraphe est identifié par une balise commençant par le caractère `#`.

### **Les balises de paragraphe**

  Les balises sont ici présentées succintement, un chapitre plus détaillé étant réservé plus loin pour chacune d'elle.
  
  - `#scenario`

    Déclaration communes à tout le scénario.

    Ce paragraphe est obligatoire.

    *Les verbes réservés : name, background, screenWidth, screenHeight, mapWidth, mapHeight, mapOrigin, spriteSize, thick, unit, showFps, unactiveOnColid*

  - `#resources` 

    Déclaration des ressources externes permettant de faire correspondre chaque ressource déclarée à un nom d'usage pour en faciliter l'utilisation dans les scripts.

    Ce paragraphe est optionnel et un seul peut-être présent.

    *Les verbes réservés : audio, img*

  - `#map`

    Déclaration de la map représentant le terrain ou l'aire de jeu dans laquelle se déroule le scénario.

    Ce paragraphe est optionnel et un seul peut-être présent.

    *Pas de verbes mais un formalisme spécifique pour décrire une zone rectangulaire décrivant la surface de jeu où chaque emplacement est soit une case vide, soit un sprite.*

  - `#pathes`

    Déclaration de chemin pour le déplacement de sprites. Permet d'intégrer dans le scénario des trajets que l'on pourra faire parcourir par des sprites. Facilite la scénarisation des déplacements d'un ou plusieurs sprites, comme par exemple les vaisseaux aliens dans un shoot'em up spatiale comme le jeu Galaga de Namco.

    Ce paragraphe est optionnel et un seul peut-être présent.

  - `#generateFromMap`

    Déclaration nécessaire pour que le moteur génère la map. 

    *Un verbe réservé : path*

     Ce paragraphe est optionnel et un seul peut-être présent. Si il est présent, le paragraphe `#map` doit aussi être présent.
      
  - `#script(nom)`

    Ce paragraphe sert à la déclaration d'un script. Il est identifié par son paramètre nom dont la valeur est libre et unique (deux scripts ne doivent pas avoir le même nom).

    Il contient une série d'instructions qui vont piloter le fonctionnement de chaque sprite auquel il est associé dans un paragraphe `#element`.

    Il peut y avoir plusieurs paragraphes `#script`.

    *Plus de 120 verbes réservés.*

  - `#element(caractere|nom)`

    Ce paragraphe sert à la déclaration d'un élément, il est soit associé à un caractère utilisé dans la map, soit nommé. Ce paramètre est libre et unique (deux éléments ne doivent avoir la même valeur de paramètre).

    Dans ce paragraphe on trouvera toujours une instruction `script(nom)` permettant de mettre en place une association entre un script et les sprites que cet élément va permettre de générer.

    Il peut y avoir plusieurs paragraphes `#element`.

     *Les verbes réservés : setVar, script*

  - `#generateElement(nom[,nombre[,positions]])`

    Ce paragraphe qui doit rester vide, sert à la génération de sprites. La génération fait appel à la déclaration faite dans le paragraphe `#element(nom)` correspondant. Il permet de faire générer autant de sprites que précisé par le paramètre `nombre` (optionnel). Et si une liste de `positions` est fournie en paramètre, chaque sprite créé se verra attribuer l'une des positions fournies.

    Il peut y avoir plusieurs paragraphes `#generateElement`.

  - `#generateFromMap`

    Ce paragraphe qui doit rester vide, sert à la génération de sprites à partir de la map.

    Il ne doit y avoir qu'un seul paragraphe `#generateFromMap` et celui-ci n'est autorisé que si le paragraphe `#map` existe.

### **Rendu**

Le rendu utilise les capacités 2D de la balise canvas HTML5 et la librairie WebGL Pixi.js

Le source du moteur est construit pour faciliter une migration vers d'autres librairies ou d'autres techniques de rendu. On pourrait par exemple envisager d'utiliser le rendu css sans avoir à faire une réécriture complète du moteur...

________________
## Le paragraphe #scenario
________________
### Les verbes du paragraphe `#scenario`
________________

#### **name** - nomme le scénario

- `name(nom)`  

  Nomme le scénario.

#### **background** - fond de la zone de jeu

- `background(#nom)`

  ?????

#### **screenWidth** - largeur de la zone de jeu

- `screenWidth(largeur)`

  Donne la largeur de la zone de jeu. La dimension réelle sera cette largeur multiplié par la dimension donnée par le verbe `spriteSize`.

#### **screenHeight** - hauteur de la zone de jeu

- `screenHeight(hauteur)`

  Donne la hauteur de la zone de jeu. La dimension réelle sera cette hauteur multipliée par la dimension donnée par le verbe `spriteSize`.

#### **mapWidth** - largeur de la map de jeu

- `mapWidth(largeur)`

  Donne la largeur de la map de jeu. Cette dimension est exprimée en nombre de sprites.

#### **mapHeight** - hauteur de la zone de jeu

- `mapHeight(hauteur)`

  Donne la hauteur de la map de jeu. Cette dimension est exprimée en nombre de sprites.

#### **mapOrigin** -

?????

#### **spriteSize** - dimension d'un sprite

- `spriteSize(dimension)`

  Donne la dimension du coté en pixel d'une unité.

#### **thick** - ?????
#### **unit** - ?????
#### **showFps** - ?????
#### **unactiveOnColid** - ?????

________________
## Les paragraphes `#script`
________________
### Les caractéristiques des instructions
________________
Chaque instruction possède une ou plusieurs caractéristiques qui vont déterminer leur effet sur le moteur. Ces caractéristiques seront précisées pour chaque instruction. Il est important de les connaître pour maîtriser l'écriture des scripts.

- effet immédiat

  les instructions à effet immédiat produisent leur effet dès quelles sont rencontrées

  *La plupart des instructions sont à effet immédiat*

- effet prolongé

  les instructions à effet prolongée commencent à produire un effet quand elles sont rencontrées et cet effet continue à se produire tant qu'aucune instruction identique ne vienne interrompre ou remplacer son effet.

- effet différé unique

  les instructions à effet différé unique ne produisent pas d'effet immédiat ; leur effet se produira plus tard et seulement quand une condition particulière surviendra. Cet effet ne sera produit qu'une seule et unique fois. L'effet peut être interrompu avant qu'il ne se produise si une instruction spécifique dédiée est rencontrée.

- effet différé permanent

  les instructions à effet différé permanent ne produisent pas d'effet immédiat ; leur effet se produira plus tard et à chaque fois qu'une condition particulière surviendra. L'effet peut être interrompu si une instruction spécifique dédiée est rencontrée.

  *Verbes d'instructions à effet différé permanent : onColidGoto, onColidPost, out, outRight, outLeft, outUp, outDown, onReceiveGoto*

- directive

  les instructions directives servent à préciser les conditions d'exécution de certaines instructions. La liste des instructions concernées sera précisée pour chaque directive.

  *Verbes d'instructions directives : decor, material, mobile*

- rend la main

  Les verbes d'instructions rendant la main au moteur sont les seuls qui éviteront qu'un script boucle et bloque le moteur.

  Quand le script de chaque sprite est exécuté lors d'un cycle du moteur, toutes les instructions sont déroulées à partir de celle suivant la dernière exécutée lors du précédent cycle et soit jusqu'à rencontrer la fin du script ou soit juste après l'exécution d'une instruction qui rend la main au moteur.

  *Verbes d'instructions rendant la main au moteur : x, y, right, left, up, down, goRight, goLeft, goUp, goDown, kill, nop, stay, wait, move, followPath*

_______________
### Structuration du code
_______________
- `:etiquette`

  Permet d'identifier un emplacement dans le code, elle peut
être utilisé pour faire un débranchement.
 
- `*[*]`

  Balise de début de commentaire. La balise est tout ce qui le
suit jusqu'à la fin de la ligne sera ignoré.

- `$variable`

  Les termes utilisés comme paramètres d'instruction peuvent être 
des variables. Les variables sont préfixées par `$`.

- `instruction`  
ou  
`instruction(terme[,terme])`

  Une instruction sans paramètres est composé d'un seul verbe. Si elle contient des paramètres, ils seront fournis après le verbe, entre parenthèses, dans un ordre donné et séparés par une virgule . Le nombre de paramètres dépend de chaque instruction. Chaque paramètre peut-être une valeur, une étiquette (qui n'est pas ici précédée de `:`) ou une variable.

_______________
### Les verbes d'opération sur les variables
_______________

#### **setVar** - affectation

- `setVar($variable,@motClef)`  
ou  
`setVar($variable,entier)`

  La première forme permet d'affecter à une variable une donnée propre au sprite.

  Les `@motClef`s possibles sont :  
    - `@col` : position colonne du sprite
    - `@row` : position ligne du sprite
    - `@x` : position horizontale au pixel du sprite
    - `@y` : position verticale au pixel du sprite
    - `@dx` : vitesse horizontale au pixel du sprite
    - `@dy` : vitesse verticale au pixel du sprite
    - `@maxcol` : numéro de colonne maxi de la map
    - `@maxrow` : numéro de ligne maxi de la map
    - `@rotation` : orientation du sprite

  La seconde forme permet d'affecter une valeur entière à la variable.

#### **compute** - calcul

- `compute($variable,formula)`

  Calcul la valeur de la formule après avoir remplacé les éventuels
`@motClef`s présents dans celle-ci.

  La formule est transformée en valeur par le moteur en utilisant l'instruction javascript eval. Cette particularité permet d'utiliser les capacités du langage javascript, mais c'est aussi un risque ; son utilisation doit être faites en connaissance de cause, ce peut-être un moyen pratique de hack du moteur mais aussi une faille de sécurité à ne pas négliger ! 

______________
### Les verbes de gestion des collisions
______________

#### **colidable** - participe aux collisions
#### **uncolidable** - ne participe pas aux collisions

#### **onColidGoto** - débranchement sur collision

- `onColidGoto(nomSprite,etiquette[,etiquette])`  
_effet différé permanent_  

  Détection de collision avec un autre sprite nommé *nomSprite*. Quand la collision se produira alors il y aura un débranchement vers l'étiquette ou si plusieurs étiquettes sont données alors vers une des étiquettes tirée au sort (tirage au sort à chaque détection). Tout nouvel appel aux instructions `onColidGoto` ou `onColidPost` vers `nomSprite` viendra en remplacer l'effet. L'appel d'une instruction `uncolid` ou `uncolid(nomSprite)` annulera son effet.

#### **onColidPost** - envoi de message sur collision

- `onColidPost(nomSprite,message)`  
_effet différé permanent_  

  Détection de collision avec un autre sprite nommé *nomSprite*. Quand la collision se produira alors il y aura émission du `message` à tous les sprites nommés `nom`. Un autre appel à `onCollidPst` avec le même `nomSprite` est nécessaire pour modifier le message à émettre. Tout nouvel appel aux instructions `onColidGoto` ou `onColidPost` viendra en remplacer l'effet. L'appel d'une instruction `uncolid` ou `uncolid(nomSprite)` annulera sont effet.

#### **isColidGoto** - débranchement sur collision

- `isColidGoto(nomSprite,etiquette[,etiquette])`  
_effet immédiat_

  Détection de collision avec un autre sprite nommé *nomSprite*. Si la collision est encours alors il y a un débranchement vers l'étiquette ou si plusieurs étiquettes sont données alors vers une des étiquettes tirée au sort (tirage au sort à chaque détection).

  Quand un sprite est détecté, il est mémorisé dans le registre.

#### **isColidPost** - envoi de message sur collision

- `isColidPost(nomSprite,message)`  
_effet immédiat_

  Détection de collision avec un autre sprite nommé *nomSprite*. Si la collision est en cours alors il y a émission du `message` à tous les sprites nommés `nom`.

#### **collisionRadius** - rayon de collision

- `collisionRadius(rayon)`  
_effet prolongé_

  Lors de la détection de collision, la position des sprites est comparée. Cette comparaison se fait par mesure de la distance séparant le centre des sprites. Si cette distance est inférieure à la somme des rayons de 2 sprites alors la collision est confirmée. `collisionRadius` permet de forcer pour le sprite le `rayon` utilisé par ce calcul.

  Attention, cette propriété est automatiquement recalculée après appel des instructions `sx`, `sy`, `animation()`, `map()` et `image()`. Un nouvel appel de `collisionRadius(rayon)` devra être effectué si le `rayon` souhaité est différent de la moitié du sprite.

#### **uncolid** - fin de collision

- `uncolid`  
  ou  
  `uncolid(nomSprite)`  
  _effet immédiat_

  Met fin à la détection de collision, avec tous les sprites pour la 1ère forme, seulement avec les sprites nommés pour la 2nde forme.

____________
### Les verbes de détection de la position
____________

#### **isColInvalid** - controle la validité d'une colonne

- `isColInvalid(colonne,etiquette)`
  _effet immédiat_

  Si la valeur de colonne fournie est hors des limites débranchement à l'étiquette.

#### **isRowInvalid** - controle la validité d'une ligne

- `isRowInvalid(ligne,etiquette)`
  _effet immédiat_

  Si la valeur de ligne fournie est hors des limites débranchement à l'étiquette.
  
#### **out** - sortie de la zone d'affichage

- `out(etiquette)`  
  _effet différé permanent_

  Quand le sprite sortira de la zone d'affichage alors il y aura un débranchement à l'étiquette. Déclenché seulement par `up`, `down`, `left`, `right`, `goUp`, `goDown`, `goLeft`, `goRight` et `move`.

#### **outRight** - sortie par la droite de la zone d'affichage

- `outRight(etiquette)`  
  _effet différé permanent_

  Quand le sprite sortira de la zone d'affichage par la droite alors il y aura un débranchement à l'étiquette. Déclenché seulement par `right`, `goRight` et `move`.

#### **outLeft** - sortie par la gauche de la zone d'affichage

- `outLeft(etiquette)`  
_effet différé permanent_

  Quand le sprite sortira de la zone d'affichage par la gauche alors il y aura un débranchement à l'étiquette. Déclenché seulement par `left`, `goLeft` et `move`.

#### **outUp** - sortie par le haut de la zone d'affichage

- `outUp(etiquette)`  
_effet différé permanent_

  Quand le sprite sortira de la zone d'affichage par le haut alors il y aura un débranchement à l'étiquette. Déclenché seulement par `up`, `goUp` et `move`.

#### **outDown** - sortie par le bas de la zone d'affichage

- `outDown(etiquette)`  
_effet différé permanent_

  Quand le sprite sortira de la zone d'affichage par le bas alors il y aura un débranchement à l'étiquette. Déclenché seulement par `down`, `goDown` et `move`.

#### **isPlace** - teste de position

- `isPlace(colonne,ligne,etiquette)`  
_effet immédiat_

  Débranchement à l'étiquette si le sprite est à la position indiquée.

#### **isCol** - teste de position colonne

- `isCol(colonne,etiquette)`  
_effet immédiat_

  Débranchement à l'étiquette si le sprite est dans la colonne indiquée.

#### **isRow** - teste de position ligne

- `isRow(colonne,etiquette)`  
_effet immédiat_

  Débranchement à l'étiquette si le sprite est dans la ligne indiquée.

#### **onCount** - test de présence

- `onCount(nomSprite,etiq0,etiq1,etiq2,etiq3,etiq4)`  
_effet immédiat_

  Compte la présence des sprites nommés `nomSprite` autour du sprite. Débranchment à l'étiquette correspondant au nombre compté ; si aucun `nomSprite` autour, alors débranchement à l'étiquette `etiq0`, si un seul, débranchement à `etiq1`, ...

______________
### Les verbes de gestion des entrées / sorties
______________

#### **key** - débranchement si touche pressée

- `key(keyCode,etiquette)`
_effet immédiat_

  Débranchement à l'étiquette si la touche *keyCode* est enfoncée au moment de l'appel de la fonction. 

#### **lastKey** - débrachement si dernière touche pressée

- `lastKey(keyCode,etiquette)`
_effet immédiat_

  Débranchement à l'étiquette si la touche *keyCode* est la dernière touche
pressée. 

#### **keyGosub** - routine déclenchée si touche pressée

- `keyGosub(keyCode,etiquette)`
_effet immédiat_

  Appel d'une routine si la touche *keyCode* est enfoncée au moment de l'appel de la fonction. 

#### **keyEnter** - routine déclenchée si touche enfoncée

- `keyEnter(keyCode,etiquette)`
_effet immédiat_

  Appel d'une routine si la touche *keyCode* est enfoncée au moment de l'appel de la fonction. 

#### **keyExit** - routine déclenché si touche relachée 

- `keyExit(keyCode,etiquette)`
_effet immédiat_

  Appel d'une routine si la touche *keyCode* est relachée au moment de l'appel de la fonction. 

________________
### Les verbes de gestion des image, animation et affichage
_____________________

#### **decor** - sprite comme élément du décor

- `decor`  
_directive (concerne `image`, `map`, `animation`)_

  L'image du sprite sera affichée en fond d'écran. Cette instruction est une directive à appeler avant les instructions `image`, `map` et `animation` pour qu'elle soit prise en compte.

#### **material** - sprite comme élément intermédiaire

- `material`  
_directive (concerne `image`, `map`, `animation`)_

  L'image du sprite sera affichée au-dessus du fond d'écran, mais en-dessous des sprites mobiles. Cette instruction est une directive à appeler avant les instructions `image`, `map` et `animation` pour qu'elle soit prise en compte.

#### **mobile** - sprite comme élément principal

- `mobile`  
_directive (concerne `image`, `map`, `animation`)_

  L'image du sprite sera affichée au dessus du fond d'écran et des sprites intermédiaires. Cette instruction est une directive à appeler avant les instructions `image`, `map` et `animation` pour qu'elle soit prise en compte.

#### **image** - chargement d'une image simple

- `image(imageId)`  
_effet immédiat_

  L'image du sprite est chargée à partir d'une image déclarée dans la page html par un tag `<img>`.
 
  Pour que le moteur retrouve le tag, il faut lui fournir un `imageId` qui respecte la terminologie des sélecteurs CSS. Par exemple si le tag est `<img id="lapin">` alors la fonction sera écrite `image(#lapin)`.

#### **map** - chargement d'un image depuis une spriteMap

- `map(imageId,colonnes,lignes,numero)`  
_effet immédiat_

  L'image du sprite est chargée à partir d'une portion d'une image spriteMap déclarée dans la page html par un tag `<img>`.
 
  Le nombre et la répartition des images dans la spriteMap est précisé par les nombres de `colonnes` et de `lignes`.
 
  L'image du sprite est celle portant l'indice `numero`.
 
  Pour que le moteur retrouve le tag, il faut lui fournir un `imageId` qui respecte la terminologie des sélecteurs CSS. Par exemple si le tag est `<img id="lapin">` et que l'image est la 7ème dans un spriteMap composé de 5 colonnes et 2 lignes alors la fonction sera écrite `map(#lapin,5,2,6)`. 

#### **animation** - chargement d'une animation

- `animation(imageId,colonnes,lignes,periode)`  
_effet immédiat_

  L'animation du sprite est chargé à partir d'une image spriteMap déclarée dans la page html par un tag `<img>`.

  Le nombre et la répartition des images dans la spriteMap est précisé par les nombres de `colonnes` et de `lignes`.

  La période est le nombre de cycles pendant lequel on affichera chacune des images de l'animation avant de passer à la suivante.

  Pour que le moteur retrouve le tag, il faut lui fournir un `imageId` qui respecte la terminologie des sélecteurs CSS. Par exemple si le tag est `<img id="lapin">` et que  'animation est décomposée en 5 colonnes et 2 lignes, et que chaque image sera affichée pendant 4 cycles alors la fonction sera écrite `animation(#lapin,5,2,4)`.

  _L'appel de cette instruction ne déclenche pas l'animation, pour cela il faut utiliser l'instruction `anime`._

#### **anime** - lance un animation

- `anime(debut,fin)`  
_effet prolongé_

  Lance une animation cyclique entre les images d'indice `debut` et `fin`.

  _L'animation doit préalablement être chargée, pour cela il faut utiliser l'instruction `animation`._

#### **isAnimeGoto** - test l'image d'une animation
#### **hide** - cache le sprite

- `hide`  
_effet immédiat_

  Le sprite n'est plus affichée.

#### **show** - montre le sprite

- `show`  
_effet immédiat_

  Le sprite est affiché.

#### **sx** - échelle horizontale

- `sx(zoom)`  
_effet immédiat_

  Modifie l'échelle horizontale pour l'affichage du sprite.

#### **sy** - échelle verticale

- `sy(zoom)`  
_effet immédiat_

  Modifie l'échelle verticale pour l'affichage du sprite.

_____________
### Les verbes de gestion de la position du sprite
_____________

#### **x** - position horizontale au pixel près

- `x(x)`  
_effet immédiat_ / _rend la main_

#### **y** - position verticale au pixel près

- `y(y)`  
_effet immédiat_ / _rend la main_

#### **col** - position colonne

- `col(colonne)`  
_effet immédiat_

#### **row** - position ligne

- `row(ligne)`  
_effet immédiat_

#### **replace** - repositionne

- `replace`  
_effet immédiat_

  Force le recalcul de la position du sprite pour qu'il soit centré exactement sur la colonne et la ligne où il est localisé. À utiliser pour ajuster le placement, par exemple quand une instruction de déplacement a été interrompue par un événement.

______________
### D-Map
La D-Map est une représentation des éléments de la carte que l'on aura souhaité mémoriser pour faire une recherche de chemin ou un contrôle de visibilité. Les éléments mémorisé dans la D-Map sont des sprites ; on ne mémorisera pas les sprites qui ne doivent pas intervenir dans la recherche de chemin ou le contrôle de visibilité, sinon le résultat obtenu ne sera pas conforme.
______________

#### **dmapIn** - mémorisation dans la D-Map

- `dmapIn`  
_effet immédiat_

  Le nom du sprite est mémorisé à son emplacement actuel (colonne,ligne) dans la D-Map.

#### **dmapOut** - effacement dans la D-Map

- `dmapOut`  
_effet immédiat_

  Le nom du sprite est retiré de la D-Map.

#### **seeUp** - recherche en haut dans la D-Map

- `seeUp(nomSprite,etiquette)`  
_effet immédiat_

  Recherche dans la D-Map du premier emplacement non vide situé au-dessus du sprite (dans la même colonne). Si le nom trouvé est `nomSprite` alors débranchement à l'étiquette.

#### **seeDown** - recherche en bas dans la D-Map

- `seeDown(nomSprite,etiquette)`  
_effet immédiat_

  Recherche dans la D-Map du premier emplacement non vide situé en-dessus du sprite (dans la même colonne). Si le nom trouvé est `nomSprite` alors débranchement à l'étiquette.

#### **seeLeft** - recherche à gauche dans la D-Map

- `seeLeft(nomSprite,etiquette)`  
_effet immédiat_

  Recherche dans la D-Map du premier emplacement non vide situé à gauche du sprite (sur la même ligne). Si le nom trouvé est `nomSprite` alors débranchement à l'étiquette.

#### **seeRight** - recherche à droite dans la D-Map

- `seeRight(nomSprite,etiquette)`  
_effet immédiat_

  Recherche dans la D-Map du premier emplacement non vide situé à droite du sprite (sur la même ligne). Si le nom trouvé est `nomSprite` alors débranchement à l'étiquette.

#### **bestWay** - recherche le meilleur chemin dans la D-Map

- `bestWay(nomSprite,etiqUp,etiqDown,etiqLeft,etiqRight)`  
_effet immédiat_

  Recherche dans la D-Map le meilleur chemin pour rejoindre le sprite nommé `nomSprite` et débranchement à l'étiquette correspondant à la direction proposée. Si aucun chemin n'est trouvé alors il n'y a pas de débranchement et on passe à l'instruction suivante.

#### **bestWayTo** - recherche le meilleur chemin dans la D-Map

- `bestWayTo(colonne,ligne,etiqUp,etiqDown,etiqLeft,etiqRight)`  
_effet immédiat_

  Recherche dans la D-Map le meilleur chemin pour rejoindre l'emplacement (colonne,ligne) et débranchement à l'étiquette correspondant à la direction proposée. Si aucun chemin n'est trouvé alors il n'y a pas de débranchement et on passe à l'instruction suivante.

______________
### Les verbes de gestion du déplacement du sprite
_____________

#### **up** - déplacement vers le haut en unités pondérées

- `up(y)`
_effet immédiat_ / _rend la main_

  Le déplacement se fait progressivement sur la base d'une unité multipliée par le facteur de vitesse. Il faut plusieurs frames pour que le déplacement soit complètement réalisé. C'est seulement quand le déplacement est terminé que l'on passe à l'instruction suivante. 

  _Peut-être interrompu par une instruction a effet différé._

#### **down** - déplacement vers le bas en unités pondérées

- `down(y)`  
_effet immédiat_ / _rend la main_

  Même principe que pour `up`.

#### **left** - déplacement vers la gauche en unités pondérées

- `left(x)`  
_effet immédiat_ / _rend la main_

  Même principe que pour `up`.

#### **right** - déplacement vers la droite en unités pondérées

- `right(x)`  
_effet immédiat_ / _rend la main_

  Même principe que pour `up`.

#### **goUp** - déplacement d'une ligne vers le haut

- `goUp`  
_effet immédiat_ / _rend la main_

  Le déplacement se fait progressivement sur la base d'une unité multipliée par le facteur de vitesse. Il faut plusieurs frames pour que le déplacement soit complètement réalisé. C'est seulement quand le déplacement est terminé que l'on passe à l'instruction suivante.

  _Peut-être interrompu par une instruction a effet différé._

#### **goDown** - déplacement d'une ligne vers le bas

- `goDown`  
_effet immédiat_ / _rend la main_

  Même principe que pour `goUp`.

#### **goLeft** - déplacement d'une colonne vers la gauche

- `goLeft`  
_effet immédiat_ / _rend la main_

  Même principe que pour `goUp`.

#### **goRight** - déplacement d'une colonne vers la droite

- `goRight`  
_effet immédiat_ / _rend la main_

  Même principe que pour `goUp`.

#### **speed** - facteur de vitesse

- `speed(vitesse)`
_effet immédiat_

  Modifie la vitesse de déplacement du sprite mais aussi l'écoulement du temps pour l'instruction `wait`. La `vitesse` doit être positive. Elle est initialement à 1. Une valeur supérieure correspond à une accélération. Une valeur nférieure à une décélération.

  _On conseille d'utiliser les puissances de 2 pour la_
  _vitesse choisie (puissances positives ou négatives)_

______________
### Les verbes de test, de débranchements et de séquencement
_____________

#### **stay** - mise en attente
- `stay`  
_effet immédiat_ / _rend la main_

  Cette instruction est rejouée indéfiniment. Permet de mettre le script en pause jusqu'à ce qu'une détection d'événement provoque un débranchement vers un étiquette.

#### **goto** - débranchement inconditionnel

- `goto(etiquette[,etiquette])`  
_effet immédiat_

  Débranchement à l'étiquette. Si plusieurs étiquettes, alors débranchement à une des étiquettes tirée au sort.

#### **gosub** - appel d'une routine

- `gosub(etiquette[,etiquette])`  
_effet immédiat_

  Mémorisation de l'emplacement de l'instruction dans la pile d'appel, puis débranchement à l'étiquette. Si plusieurs étiquettes, alors débranchement à une des étiquettes tirée au sort.

#### **return** - retour en fin de routine

- `return`  
_effet immédiat_

  Si la pile d'appel n'est pas vide alors retour à l'instruction suivant le dernier mémorisé dans la pile d'appel ; cet emplacement est retiré de la pile. Sans effet si la pile est vide.

#### **noReturn** - retour en fin de routine

- `noReturn`  
_effet immédiat_

  Vide la pile d'appel de la toute dernière adresse de retour. À utiliser avec précaution.

#### **drainStack** - nettoyage de la pile d'appel des routines

- `drainStack`  
_effet immédiat_

  Vide la pile d'appel de toutes les adresses de retour qui se sont accumulées lors de l'utilisation de l'instruction `gosub` sans rencontrer d'instruction `return`. A utiliser avec précaution, seulement quand on a la certitude de ne pas avoir à traiter les instructions `return` correspondantes.

#### **defer** - appel d'une routine après un laps de temps

- `defer(delay,etiquette[,etiquette])`  
_effet différé unique_

  Après que le `delay` exprimé en ms soit écoulé alors mémorisation de l'emplacement de l'instruction courante dans la pile d'appel, puis débranchement à l'étiquette. Si plusieurs étiquettes, alors débranchement à une des étiquettes tirée au sort.

  Cette instruction n'ayant pas d'effet immédiat, d'autres instructions peuvent avoir été excécutées après elle, avant que le débranchement ne soit déclenché.

  Après déclenchement du débranchement, la première instruction `return` rencontrée provoquera le retour à la dernière instruction exécutée avant déclenchement du débranchement et cette dernière instruction sera ré-exécutée.

  Une seule instruction `defer` peut-être prise en compte simultanéement. Si une nouvelle instruction `defer` est recontrée avant la fin du délai alors elle annule la précédente.

#### **undefer** - annule l'appel différé

- `undefer`  
_effet immédiat_

  Annule l'appel de routine de la dernière instruction `defer` qui est en attente de déclenchement.

#### **is** - vérifie la présence d'un sprite en position relative

- `is(nomSprite,colonneRelative,ligneRelative,etiquette[,etiquette])`  
_effet immédiat_

  Si un sprite nommé `nomSprite` est présent à la position relative par rapport au sprite alors débranchement à l'étiquette. Si plusieurs étiquettes, alors débranchement à une des étiquettes tirée au sort.

  Quand un sprite est détecté, il est mémorisé dans le registre.

#### **isHere** - vérifie la présence d'un sprite en position absolue

- `isHere(nomSprite,colonne,ligne,etiquette[,etiquette])`  
_effet immédiat_

  Si un sprite nommé `nomSprite` est présent à l'emplacement `colonne`,`ligne` alors débranchement à l'étiquette. Si plusieurs étiquettes, alors débranchement à une des étiquettes tirée au sort.

  Quand un sprite est détecté, il est mémorisé dans le registre.

#### **isup** - vérifie la présence d'un sprite au dessus

- `isUp(nomSprite,etiquette[,etiquette])`  
_effet immédiat_

  Si un sprite nommé `nomSprite` est présent au dessus du sprite alors débranchement à l'étiquette. Si plusieurs étiquettes, alors débranchement à une des étiquettes tirée au sort.

#### **isdown** - vérifie la présence d'un sprite au dessous

- `isDown(nomSprite,etiquette[,etiquette])`  
_effet immédiat_

  Si un sprite nommé `nomSprite` est présent au dessous du sprite alors débranchement à l'étiquette. Si plusieurs étiquettes, alors débranchement à une des étiquettes tirée au sort.

#### **isright** - vérifie la présence d'un sprite à droite

- `isRight(nomSprite,etiquette[,etiquette])`  
_effet immédiat_

  Si un sprite nommé `nomSprite` est présent à droite du sprite alors débranchement à l'étiquette. Si plusieurs étiquettes, alors débranchement à une des étiquettes tirée au sort.

#### **isleft** - vérifie la présence d'un sprite à gauche

- `isLeft(nomSprite,etiquette[,etiquette])`  
_effet immédiat_

  Si un sprite nommé `nomSprite` est présent à gauche du sprite alors débranchement à l'étiquette. Si plusieurs étiquettes, alors débranchement à une des étiquettes tirée au sort.

______________
### Les verbes de gestion de la communication entre sprites
_____________

#### **post** - émission d'un message avec ou sans données

- `post(nomSprite,message)`  
ou
`post(nomSprite,message,data[,data]])`  
_effet immédiat_

  Le `message` est envoyé à tous les sprites nommés `nomSprite`. Des données peuvent être envoyées avec le message. Il n'y a pas de limitation aux nombres de données émises.

#### **postRegister** - émission d'un message vers le sprite mémorisé dans le registre
#### **receiveGoto** - débranchement si message reçu

- `receiveGoto(message,etiquette)`  
_effet immédiat_

  Si le `message` a été envoyé au sprite alors il y a débranchement à l'étiquette au moment où l'instruction `receive` est rencontrée.

#### **onReceiveGoto** - débranchement à la réception d'un message

- `onReceiveGoto(message,etiquette)`  
_effet différé permanent_

  Dès que le `message` est envoyé au sprite alors il y a débranchement à l'étiquette. 
  
  Attention, l'étiquette doit impérativement être suivi du verbe `receive` ou du verbe `unreceive` sinon une boucle infinie de débranchement vers l'étiquette va se produire entrainant le blocage du script.

#### **receive** - réception d'un message avec données

- `receive(message,$variable[,$variable])`  
_effet immédiat_

  Si le message a été envoyé au sprite alors il y a récupération des données reçues dans les variables. Le nombre de variables n'est pas limité mais il ne doit pas être supérieur au nombre de données reçues.

#### **drainMailbox** - purge des messages en attente

- `drainMailbox`  
_effet immédiat_

  Tous les messages reçus par le sprite qui n'ont pas été traités par une instruction `receive` ou `receiveGoto` sont détruits. Il ne pourront plus être traités.

#### **unreceive** - annule onReceiveGoto

- `unreceive`

  Met fin à l'effet de tous les verbes onReceiveGoto. Pour les réactiver, il faut les réexécuter.
 

______________
### Les verbes de gestion de l'attachement
______________
#### **attach** - attache au sprite mémorisé dans le registre
 Seulement si le sprite du registre est attachable
#### **unattach** - détache d'un sprite
#### **isAttach** - test l'attache
#### **followAttached** - suit les mouvements du sprite attaché
#### **detach** - détache les sprites pouvant être attaché
#### **attachable** - rend le sprite attachable
  Par défaut, les sprites sont attachables
#### **unattachable** - rend le sprite non attachable
______________
### Les verbes de gestion des sprites
_____________

#### **name** - donne un nom de famille au sprite

- `name(nomSprite)`  
_effet immédiat_

  Attribut un nom de famille au sprite. Permet de faire des associations de détection d'événement en utilisant les instructions dédiées.

#### **kill** - suppression du sprite

- `kill`  
_effet immédiat_ / _rend la main_

  Le sprite est définitivement supprimé.

#### **nop** - ne rien faire

- `nop`  
_effet immédiat_ / _rend la main_

  Cette instruction ne fait rien mais consomme un cycle.

_____________
### Les verbes d'émission de sons
______________

#### **playSound** - joue une séquence sonore

- `playSound(audioId)`  
_effet immédiat_

  Joue la séquence sonore déclarée dans la page html par un tag `<audio>`.

  Pour que le moteur retrouve le tag, il faut lui fournir un `audioId` qui respecte la terminologie des sélecteurs CSS. Par exemple si le tag est `<audio id="vent">` alors l'instruction sera écrite `playSound(#vent)`.

#### **loopSound** - joue en boucle une séquence sonore

- `loopSound(audioId)`  
_effet immédiat_

  Joue en boucle la séquence sonore déclarée dans la page html par un tag `<audio>`.

#### **pauseSound** - met sur pause une séquence sonore

- `pauseSound(audioId)`  
_effet immédiat_

  Met sur pause la lecture de la séquence sonore déclarée dans la page html par un tag `<audio>`. Pour reprendre la lecture, il faut utiliser l'instruction `playSound(audioId)`.

#### **stopSound** - arrête la lecture d'une séquence sonore

- `stopSound(audioId)`  
_effet immédiat_

  Arrête la lecture de la séquence sonore déclarée dans la page html par un tag `<audio>`. La prochaine instruction `playSound(audioId)` reprendra la lecture au début
  de la séquence.

_____________
### Les verbes d'aide au développement
_____________

#### **nickname** - affecte un surnom

- `nickname(surnom)`  
_effet immédiat_

  Affecte un surnom au sprite. Peut-être utile pour pauser une condition dans un debogueur.

#### **logon** - active les messages dans la console

- `logon`  
_effet permanent_

  Active l'émission de messages de débogage dans la console. Chaque instruction exécutée du script est affichée dans la console du navigateur.

#### **logoff** - désactive les messages dans la console

- `logoff`  
_effet immédiat_

  Met fin à l'émission de message de débogage dans la console.

#### **wait** - mise en attente limitée
- `wait(nombre)`  
_effet immédiat_ / _rend la main_

  Mise en attente du script pendant le nombre de cycles indiqués.

#### **info** - affichage étiquette dans la console

- `info`  
_effet immédiat_

  Emission dans la console de la dernière étiquette rencontrée dans le script.