const { faker } = require('@faker-js/faker');

function generateUserData() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const timestamp = Date.now();

  return {
    name: `${firstName} ${lastName}`,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}.${timestamp}@example.com`,

    gender: faker.helpers.arrayElement(['male', 'female']),
    password: faker.internet.password({ length: 12, memorable: false, pattern: /[A-Za-z0-9@#$%]/ }),

    birthDate: {
      day: faker.date.birthdate({ min: 18, max: 80, mode: 'age' }).getDate().toString(),
      month: faker.date.month(),
      year: faker.date.birthdate({ min: 18, max: 80, mode: 'age' }).getFullYear().toString(),
    },

    firstName: firstName,
    lastName: lastName,
    company: faker.company.name(),

    address: faker.location.streetAddress(),
    address2: faker.location.secondaryAddress(),
    country: faker.helpers.arrayElement([
      'India',
      'United States',
      'Canada',
      'Australia',
      'Israel',
      'New Zealand',
      'Singapore',
    ]),
    state: faker.location.state(),
    city: faker.location.city(),
    zipcode: faker.location.zipCode(),
    mobileNumber: faker.phone.number('##########'),

    newsletter: faker.datatype.boolean(),
    specialOffers: faker.datatype.boolean(),
  };
}

module.exports = {
  generateUserData,
};
