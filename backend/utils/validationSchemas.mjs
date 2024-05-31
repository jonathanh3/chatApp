export const createUserValidationSchema = {
  username: {
    notEmpty: {
      errorMessage: 'Username cannot be empty',
    },
    isLength: {
      options: {
        min: 4,
        max: 32
      },
      errorMessage: 'Username must be min 4 characters and max 32'
    },
    isString: {
      errorMessage: 'Username must be string'
    },
  },
  password: {
    notEmpty: {
      errorMessage: 'Password cannot be empty',
    },
    isLength: {
      options: {
        min: 8,
        max: 32
      },
      errorMessage: 'Password must be min 8 characters and max 32'
    }
  }
};

export const createRoomValidationSchema = {
  name: {
    notEmpty: {
      errorMessage: 'Name cannot be empty',
    },
  }
};
