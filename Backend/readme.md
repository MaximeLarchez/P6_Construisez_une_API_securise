Installation et mise en service du backend :

Backend :

    téléchargement du PROJET ici :

    $ git clone https://github.com/MaximeLarchez/P6_Construisez_une_API_securise.git

    Ensuite avec le terminal allez dans le dossier backend et entrez $ npm install

    Vous pouvez ensuite crée un fichier .env à la racine du répertoire et y mettre les valeurs correctes pour se connecter à une base de données mongodb:

    PORT = 3000 (le ffront fonctionne avec le backend sur le port 3000)

    DB_USERNAME = "Username de la base de données mongodb"

    DB_PASSWORD = "password de la base de données mongodb"

    DB_CLUSTER = "cluster de la base de données mongodb"

    JWT_KEY_TOKEN = "XXXXX"

Ou prendre le fichier exemple.env, mettre les bonnes valeurs et modifier le nom du fichier en .env 

Ensuite $ npm run start