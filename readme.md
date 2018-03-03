# IlLumenNote
#### Lumen-Angular Double MVC
This project was intended to represent a germinating application collaborated on by a frontend and backend team.

#### Dependencies/Frameworks used:
* Lumen
* Eloquent
* Angular.js
* Bootstrap

### Installation

An environment file (titled ".env" and placed at the root of the project directory) is required to provide configuration variables:

```
APP_ENV=local
APP_DEBUG=true
APP_KEY=SharpSpringSharpSpring

DB_CONNECTION=mysql
DB_HOST=XXXX
DB_PORT=3306
DB_DATABASE=XXXX
DB_USERNAME=XXXX
DB_PASSWORD=XXXX

JWT_SECRET=SharpSpringSharpSpring

CACHE_DRIVER=memcached
QUEUE_DRIVER=sync
```
Required commands:
```
composer install
php -S localhost:4321 -t public
```

Required database schema:
```
CREATE TABLE `users` (
  `id` bigint(64) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
);

CREATE TABLE `notes` (
  `note_id` bigint(64) NOT NULL AUTO_INCREMENT,
  `note_title` varchar(500) DEFAULT NULL,
  `note_body` text,
  `owner_id` bigint(64) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `active` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`note_id`)
)
```

Seed the database:
```
INSERT INTO 
  `users` 
(`id`,`name`,`email`,`password`,`updated_at`,`created_at`) 
  VALUES 
(1,'test','test@test.com','$2y$10$1f1c26ea42cffef3fe737OuZgsQkIFHYCmhrodPHpTxoYqmtSTpyG','2015-10-12 02:40:15','2015-10-12 02:40:15');

INSERT INTO 
  `notes` 
(`note_id`,`note_title`,`note_body`,`owner_id`,`updated_at`,`created_at`,`active`) 
  VALUES 
(1,'Daily Note','Here is a note from the day!',1,'2018-03-03 05:23:50','2018-03-02 01:23:47',1),
(2,'Additional Note','Wait! Here is another thing!',1,'2018-03-03 00:46:29','2018-03-02 01:23:47',1),
(3,'Further Note','Nevermind. Cancel that thing.',1,'2018-03-02 23:38:40','2018-03-02 01:23:47',1);
```

and this should be sufficient to start up the application!

Visit `http://localhost:4321` to assume the home page.

#### Frontend

Frontend Engineers would find themselves working out of the `/public` folder, which is designed to be served statically. This static serving is covered by the built-in server included with PHP.

Data for the application is fetched as JSON Data Views through the use of Client-side HTTP Services. The objects that are parsed out of the incoming JSON form the scope of the frontend application. Client-side Controllers bind the Data Views to HTML Views. The Controllers interact with the Model RESTfully over HTTP.

JWT is used to provide authentication and the `User` is contained as a claim of this token. The token interacts with a middleware in the backend.

#### Backend

Backend Engineers see Lumen Controllers manipulating Database Models to produce JSON Data Views. Eloquent was chosen to highlight a preferred choice of the Laravel community and to also simplify Query building. The models began simply, but listing the note author's name in the UI prompted a join between two tables. Sensitive database columns are also filtered.

Middleware was written within the Lumen framework by including a package (Lcobucci/JWT) with exposed methods for signing/verifying tokens. While the login page is not intercepted by authentication, virtually everything else must be authenticated. These routes are arranged into one, common route group.

There are various routes that serve the homepage redundantly. This is to allow a small domain of paths to be controlled by AngularJS. Within the single page application, AngularJS manipulates the URL without page refresh. If the page is refreshed, the server sees a URL created by AngularJS and not Lumen. Serving `index.html` without redirect allows Angular to resume and route the application seamlessly.

The Dashboard is a special route case where the Lumen View engine is invoked to provide basic includes. As well the result is further processed in Angular.js. This is done to demonstrate the possibility of both Frontend and Backend collaborating on a mutually understood interface at runtime without the use of AJAX.
