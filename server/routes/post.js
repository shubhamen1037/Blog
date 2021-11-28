const { save, remove, getPostById, getList } = require('../controllers/post');

module.exports = (router) => {
  router.post('/post', save);
  router.get('/post/:publicId', getPostById);
  router.get('/posts', getList);
  router.delete('/post/:publicId', remove);
};
