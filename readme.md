# IlLumenNote
#### Lumen-Angular Double MVC
This project was intended to represent a germinating application collaborated on by a frontend and backend team.

#### Dependencies/Frameworks used:
* Lumen
* Eloquent
* Angular.js
* Bootstrap

### Installation
an environment file (titled ".env" and placed at the root of the project directory) is required to provide configuration variables:

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
required commands
```
composer install
php -S localhost:4321 -t public
```

required database schema
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

and this should be sufficient to start up the application!

Visit `http://localhost:4321` to assume the home page.

#### Frontend

Frontend Engineers would find themselves working out of the `/public` folder, which is designed to be served statically. This static serving is covered by the built-in server included with PHP.

Data for the application is fetched as JSON from Services. This JSON is essentially a Data View which is fed to a Controller which is manipulating the view DOM. So the Frontend MVC portion consists of Data Views and Client-side Controllers which interact with the Database Model (Backend) through Services.

JWT is used to provide authentication and the `User` is contained as a claim of this token. The token interacts with a middleware in the backend.

#### Backend

Backend Engineers see Lumen Controllers manipulating Database Models to produce JSON Data Views. Eloquent was chosen to highlight a preferred choice of the Laravel community and to also simplify Query building. The models began simply, but listing the note author's name in the UI prompted a join between two tables. Sensitive information is also filtered.

Middleware was written within the Lumen framework by including a package (Lcobucci/JWT) with exposed methods for signing/verifying tokens. The routes affected by this are included as a common route group.

Since Client-side routing is abstracted by Angular.js in HTML5 Mode, some routes in the backend redirect to login arbitrarily.

The Dashboard is a special route case where the Lumen View engine is invoked to provide basic includes. As well the result is further processed in Angular.js. This is done to demonstrate the possibility of both Frontend and Backend collaborating on a mutually understood view.
