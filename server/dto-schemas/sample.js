
const getSample = {
  title: 'get single document',
  description: 'Defines the structure for HTTP GET request body',
  type: 'object',
  properties: {
    userId: {
      type: 'string',
      description: 'userId',
      maxLength: 255,
    },
  },
  required: [ 'userId' ],
  errorMessage: {
    required: {
      userId: 'Parameter: userId is required.',
    },
    properties: {
      userId: 'Parameter: userId should be a valid string',
    },
  },
  additionalProperties: false,
};

module.exports = {
  getSample,
};
