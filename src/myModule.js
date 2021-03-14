//  Names export - has a name, Have as many as needed.
//  Default export - Has no name. You can only have one.

const message = 'Some message from myModule.js';

const name = 'Arisa';

const location = 'Vancouver';

const getGreeting = (name) => {
  return `Welcome to the course ${name}`
}

export { message, name, getGreeting, location as default }
