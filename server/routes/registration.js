const { save } = require('../controllers/user');

module.exports = (router) => {
  router.post('/registration', save);
};
