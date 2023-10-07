// Register page
export const registerError = (errorMessage: string) => {
  // split to individual error messages
  const errorMessages = errorMessage.split(',').reverse();

  // Initialize a new errorInput object
  const newErrorInput = {
    name: '',
    lastName: '',
    email: '',
    location: '',
    password: '',
    passwordConfirm: '',
  };

  // Loop through the error messages and set the corresponding properties in newErrorInput
  for (const message of errorMessages) {
    if (message.toLocaleLowerCase().includes('last'))
      newErrorInput.lastName = message;
    else if (message.toLocaleLowerCase().includes('name'))
      newErrorInput.name = message;
    else if (message.toLocaleLowerCase().includes('email'))
      newErrorInput.email = message;
    else if (message.toLocaleLowerCase().includes('location'))
      newErrorInput.location = message;
    else if (message.toLocaleLowerCase().includes('passwordConfirm'))
      newErrorInput.passwordConfirm = message;
    else if (message.toLocaleLowerCase().includes('password'))
      newErrorInput.password = message;
  }

  // Merge the original errorInput with the newErrorInput
  return { ...newErrorInput };
};

// Login page
export const loginError = (errorMessage: string) => {
  // split to individual error messages
  const errorMessages = errorMessage.split(',').reverse();

  // Initialize a new errorInput object
  const newErrorInput = {
    email: '',
    password: '',
    invalidCredentials: '',
  };

  // Loop through the error messages and set the corresponding properties in newErrorInput
  for (const message of errorMessages) {
    if (message.toLocaleLowerCase().includes('email'))
      newErrorInput.email = message;
    else if (message.toLocaleLowerCase().includes('password'))
      newErrorInput.password = message;
    else if (message.toLocaleLowerCase().includes('credentials'))
      newErrorInput.invalidCredentials = message;
  }

  // Merge the original errorInput with the newErrorInput
  return { ...newErrorInput };
};

// AddJob page
export const addJobError = (errorMessage: string) => {
  const errorMessages = errorMessage.split(',').reverse();

  // Initialize a new errorInput object
  const newErrorInput = {
    company: '',
    jobLocation: '',
    jobStatus: '',
    jobType: '',
    position: '',
  };

  // Loop through the error messages and set the corresponding properties in newErrorInput
  for (const message of errorMessages) {
    if (message.toLocaleLowerCase().includes('company'))
      newErrorInput.company = message;
    else if (message.toLocaleLowerCase().includes('location'))
      newErrorInput.jobLocation = message;
    else if (message.toLocaleLowerCase().includes('position'))
      newErrorInput.position = message;
  }

  // Merge the original errorInput with the newErrorInput
  return { ...newErrorInput };
};
