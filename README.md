# REST APIs Homework Assignment
This assignment is made up of three parts. The can be completed in _any_ order. So move on if you're stuck and try to finish 
as many of the steps as possible.

_Note: we'll use the results of this homework assignment for a formal evaluation and as such you should write the code by 
yourself (no collaboration or external help is allowed). **Plagiarism is a violation of the Academy contract and is not in your
 best interest. Do not discuss the contents of the assignment with your fellow students.**_

## How to submit your results
Push your code to a GitHub repository.

**Send a link to your homework to teachers@codaisseur.com before Saturday 22:00**


# Setup
Create a repository and put all the files for this homework in there.
Initialize a Node.JS project in the repository directory so you can install and use packages.

## 1. Create an Express app with a single end-point. 

1. Create a new JS file named `messages-api.js`.

1. Create an Express app in that file. Make sure it listens on port `3000`. Make sure you add the required dependency.
1. It should have a single end-point that responds to `POST` requests to the `/messages` URI.
1. This end-point must take the JSON body of the request, and print the property named `text` to the console. Remember, to be able to parse the body of a request you need to add the middleware for it. Make sure you add the required dependency.
1. If the body does NOT contain a property named `text`, you should return a "Bad Request" HTTP status code to the client.
1. Make it so that there is a limit of 5 messages in your API. After receiving five messages, the sixth message should cause an "Internal Server Error". Make sure the correct HTTP status is returned.

## 2. Connect to PostgreSQL with `node-postgres`.

1. Create a new JS file named `sql-statements.js`.
1. Make sure you have a PostgreSQL server running, otherwise you won't be able to run the code you're about to write.
1. Connect to the database using an instance of `Pool` (part of the `pg` package).
1. The connection string for your local Postgres will point to `localhost` and that should be used as a default, but now youshould also make sure that the connection string can be configured with an environment variable.
  If the `process.env.DATABASE_URL` environment variable is set, your code should use that instead of the
   default `localhost` connection string.
1. In your code, using the `pool`, run the following SQL statement:
   ```sql
   CREATE TABLE IF NOT EXISTS person (id serial, first_name varchar(255), last_name varchar(255), eye_color varchar(255))
   ```
1. Next, after the previous query completes, insert several rows into the `person` table to represent the following people:
   - James Smith (brown eyes)
   - Frank Jones (brown eyes)
   - Rebecca Andrews (blue eyes)
   
   Make sure to use a parameterized query.
1. Next, after the previous query completes, run an `UPDATE` statement that will change every row with the `eye_color`
 value of `brown` to `blue`.
1. Next, after the previous query (or queries) complete, use the following statement in your program, but fix it first. Change it so that it uses parameterized queries instead of string concatenation.
   ```javascript
   const name = "James";
   pool.query('SELECT * FROM "person" WHERE first_name = ' + name)
   ```
1. Print the results of the previous query to the console.
1. If at any point one of the chained promises rejects, you should catch the error and print it to the log.

## 3. Use Sequelize to build a REST API.

1. Create a new JS file named `sequelize-rest.js`.
1. Install the dependency `sequelize@5.8.6`
1. In your code, initialize the database connection with Sequelize the way you've learned.
1. Using Sequelize, define a model called `Movie` and make sure it has the following properties (in addition to an ID):
   - `title` (text)
   - `yearOfRelease` (number)
   - `synopsis` (text)
1. Create an express app with routes that support the following RESTful actions on the "movies" resources.
   - _create_ a new movie resource
   - _read_ a single movie resource
   - _update_ a single movie resource
   - _delete_ a single movie resource
   - _read_ all movies (the entire collections resource)
   
   Remember that you've done this before. Don't re-invent the wheel.
1. Implement pagination on the "read all" collections resource end-point. Meaning, the user can pass `limit` and `offset` query parameters to limit the number of results.