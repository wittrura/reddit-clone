
exports.up = function(knex, Promise) {
  return knex.schema.createTable('comments', table => {
    table.increments()
    table.text("content")
    table.integer("post_id").index().references("id").inTable("posts").onDelete("cascade")
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comments')
}
