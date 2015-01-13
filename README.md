# Johnny eat good!
Videogame 3D didattico basato sul concetto di piramide alimentare, presentato come lavoro finale per il [Master in Multimedia Content Design](http://www.mmm.unifi.it) 2013/2014. File di progetto per Unity3D.

## Game play
Scopo del gioco è di arrivare a fine livello con le quattro barre di energia (carboidrati, verdure, proteine, grassi) proporzionate rispetto ad una ideale piramide alimentare. Occorre quindi prendere i cibi giusti durante il percorso, tenendo sempre presente che le prestazioni (barra rossa) sono legate ad un eccesso o difetto di alimenti ed influiscono sull'altezza massima del salto. Attenzione a mantenere un giusto apporto di verdure: una carenza di vitamine porterà ad un abbassamento della vista, la scena diventerà sempre più buia! Il tasto in alto a destra permette di fare 'attività fisica': diminuiranno le riserve di alimenti ma aumenterà il massimo livello di prestazioni. Esplora i livelli e le piattaforme in cerca di cibo, ricordandoti che piu si cammina più energie si consumano, durante la corsa l'energia si consuma più rapidamente!

## Control
Up, Down, Left, Right -> cammina  
Space -> salta  
Shift + Up, Down, Left, Right -> corri

## Credits
* Querci Luca - developer
* Foggiano Mauro - developer, 3D animator
* Luparelli Mirko - 2D/3D artist

## Script
Tutti gli script relativi agli oggetti di scena si trovano in Assets/script/

### valori_barre.js
Attraverso le variabili configurabili nell'inspector si cambiano le dimensioni e posizione della piramide alimentare. Sono presenti funzioni, richiamabili da altri script, per:
* aumentare o diminuire le varie barre di un tot
* settare ad un valore le barre alimenti ed il massimo della performance
* conoscere il valore istantaneo delle barre e performance  

Gestisce inoltre le relazioni fra le barre: una volta finiti i carboidrati vengono consumate più velocemente proteine e grassi, una ricarica eccessiva di carboidrati va ad aumentare la quantità di grassi.

### controlli.js
Si occupa di controllare lo stato del giocatore ed in base all'attività (camminata, corsa, salto) richiama ScaleOnTime() di valori_barre.js per aggiornare le barre degli alimenti. Quando GetJohnnyStatus() riporta uno stato di death esegue l'animazione finale, dopodichè ritorna al main menu.

### controllo_pir.js
A fine livello si occupa di spostare ed ingrandire la piramide e barra prestazioni, calcolare i punteggi.

### attivita_fisica.js
Si occupa dell'animazione dell'attività fisica, toglie energia dalle barre ed aumenta la max performance.

### script_luce.js
Collegato all'oggetto Directional light, legge il livello della barra verdure e regola l'intensità della luce.

### (food)_script.js
Sono gli script collegati ad ogni alimento, fanno il detect della collisione e richiamano SetFoodUp() di valori_barre.js per aumentare il valore della rispettiva energia, attivano l'audio dopodichè distruggono l'oggetto.

### show_hide_(food).js
Gestiscono le infobox degli alimenti, la prima volta che vengono presi.
