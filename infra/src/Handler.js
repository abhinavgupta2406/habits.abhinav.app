module.exports.health = async (event) => ({
  statusCode: 200,
  body: JSON.stringify({ message: 'Running' }),
});
