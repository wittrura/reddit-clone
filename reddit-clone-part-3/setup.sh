dropdb reddit-clone --if-exists
dropdb reddit-clone-test --if-exists

createdb reddit-clone
createdb reddit-clone-test

knex migrate:latest --knexfile server/knexfile.js
knex migrate:latest --env test --knexfile server/knexfile.js

knex seed:run --knexfile server/knexfile.js
