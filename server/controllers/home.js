const posts = (req, res) => {
    res.getRequest({ status: 'ok', massage: "You are authenticated person"});
};
  
module.exports = { posts };