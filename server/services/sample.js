const getSample = async () => {
  const doc = {
    title: 'Harry porter',
    author: 'J.K. Rowling',
  };

  if (doc) {
    return { doc };
  }

  return { error: [ { name: 'error-name', messages: 'Something went wrong' } ] };
};

module.exports = {
  getSample,
};
