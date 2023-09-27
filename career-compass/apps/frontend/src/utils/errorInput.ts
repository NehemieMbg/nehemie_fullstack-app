interface ErrorInput {
  name: string;
  lastName: string;
  email: string;
  location: string;
  password: string;
  passwordConfirm: string;
}

export const errorInput = {
  name: '',
  lastName: '',
  email: '',
  location: '',
  password: '',
  passwordConfirm: '',
};

export const registerError = (errorMessage: string, errorInput: ErrorInput) => {
  // split to individual error messages
  const errorMessages = errorMessage.split(',').reverse();

  // Initialize a new errorInput object
  const newErrorInput: ErrorInput = {
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
  console.log({ ...errorInput, ...newErrorInput });
  return { ...errorInput, ...newErrorInput };
};
