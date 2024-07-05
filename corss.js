module.exports = (request, response, next) => {
  response.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, HEAD, POST, PUT, DELETE, PATCH, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Requested-With, Accept",
  });

  if (request.method === 'OPTIONS') {
    response.sendStatus(200);
  } else {
    next();
  }
};