## Symfony back-end 

Following are the steps to setup this backend in your system:

**1. Clone project in your local system using below command**

https://github.com/shakoorfarhan/fullstack-development.git

**2. update this url under project/config/packages/doctrine.yaml dbal section with your own values**

'mysql://username:password@127.0.0.1:3306/databasename?serverVersion=5.7'

**3. Create database by using followingdoctrine command** 

bin/console doctrine:database:create

**4. Update your local schema by using this command and add a table**

bin/console doctrine:schema:update --dump-sql

**5. Now navigate to your project folder and run this command to start back-end server**

bin/console server:run

**6. Now copy the url server is running on to later add it in your front-end application where needed, the sample url is like this**

http://127.0.0.1:8000
 

