const AdminMiddleware = (request, response, next) => {
  const isAdmin = request.user.isAdmin;
  if (!isAdmin) {
    response.status(401).json({ success: false, error: "You are not admin" });
  }
  next();
};

module.exports = AdminMiddleware;
