// Safety net for anything that slips past a controller's own try/catch
// (e.g. a synchronous throw in middleware) — controllers handle their own
// expected error cases directly and don't rely on this for normal flow.
const notFound = (req, res, next) => {
  res.status(404).json({ status: false, message: `Route not found: ${req.originalUrl}` });
};

const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({ status: false, message: 'Internal server error' });
};

module.exports = { notFound, errorHandler };
