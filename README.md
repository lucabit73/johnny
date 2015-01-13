# Johnny eat good!
Videogame 3D didattico basato sul concetto di piramide alimentare, presentato come lavoro finale per il [Master in Multimedia Content Design](http://www.mmm.unifi.it)

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

### controlli.js
Si occupa di controllare lo stato del giocatore ed in base all'attività (camminata, corsa, salto) richiama una funzione di valori_barre per aggiornare le barre degli alimenti
