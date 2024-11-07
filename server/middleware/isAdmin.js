const logger = require('../utils/logger');

function isAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    logger.info(`Admin access granted for user ID: ${req.user._id}`);
    next();
  } else {
    logger.warn(`Admin access denied for user ID: ${req.user._id}`);
    res.status(403).json({ message: 'Access denied. Admins only.' });
  }
}

module.exports = isAdmin;
