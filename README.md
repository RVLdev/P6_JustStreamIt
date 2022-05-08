# P6_JustStreamIt
DESCRIPTION

Projet 4 du parcours OpenClassrooms "Developpeur d'appli Python" : 
réalisation du front-end d'une application (web) permettant d'afficher des films dont les informations sont fournies par une API.

L'interface de l'application propose à l'utilisateur de consulter l'affiche et les informations du films selon plusieurs catégories : meilleur film (selon classement Imdb), films les mieux notés, aventure(ordre : selon classement Imdb), animation (ordre : selon classement Imdb) et biographie (ordre : selon classement Imdb).

Le meilleur film est mis en avant au début de la page. Un bouton permet d'afficher les informations du film dans une fenêtre modale.

Puis, suivent 4 carrousels de 4 affiches. L'utilisateur peut faire défiler 7 films, un à un , à l'aide de flèches de défilement. Il peut accéder aux informations du film en cliquant sur l'affiche du film correspondant. Celles-ci s'affichent également dans une fenêtre modale.

Une croix permet, dans chaque fenêtre modale, de la refermer.


PREALABLES & INSTALLATIONS

Avertissement : Les scripts ont été créés et testés dans un environnement Windows, avec Python3.10.0, pip 22.0.3 Les commandes suivantes peuvent différer selon votre propre environnement.

Pour commencer, ouvrir un terminal de commande (Git Bash, par exemple).
Créer le répertoire de travail (commande : mkdir) qui accueillera les scripts Python et l'API dans sa version locale.
Puis créer un environnement virtuel à la racine du répertoire de travail (python -m venv env).

Installer la version locale de l'API : voir fichier readme de l'API joint à la mission et également accessible dans ce dépôt, au format .txt (readmeOCMovies-API.txt)

Initialiser Git dans le répertoire de travail (git init).

Charger, dans votre répertoire de travail, les fichiers déposés sur le présent dépôt GitHub
(lien:  https://github.com/RVLdev/P6_JustStreamIt.git) : 
* dossier font
* dossier pictures
* fichier JustStreamIt.js
* fichier JustStreamIt .css
* fichier JustStreamIt.html

Activer l'environnement virtuel (. env/Scripts/activate - sous Windows).
Dans votre terminal, démarrer le serveur de l'API (python manage.py runserver)

Pour afficher l'interface de l'application : ouvrir le fichier JustStreamIt.html dans un navigateur.

Pour quitter :
* fermer l'onglet de votre navigateur correspondant à l'application,
* suivez les instruction de l'API (CTRL-BREAK ou CTRL C), 
* quittez l'environnement virtuel (deactivate)
