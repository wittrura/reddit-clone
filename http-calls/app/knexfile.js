module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'angular-http-drill',
    }
  },

  test: {
    client: 'pg',
    connection: {
      database: 'angular-http-drill-test',
    }
  }

};
