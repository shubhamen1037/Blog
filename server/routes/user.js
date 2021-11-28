const {save, update, deleteUserById, getUserById, getAllUsers} = require('../controllers/user');

module.exports = (router) => {
  router.post('/registration', save);
  router.post('/user/:publicId', update);
  router.get('/user/:publicId', getUserById);
  router.get('/user', getAllUsers);
  router.post('/user/delete/:publicId', deleteUserById);
};
