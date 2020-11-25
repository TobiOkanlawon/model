export default class User {
  constructor(details) {
    let { firstName, lastName } = details;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  get name() {
    return `${this.firstName} ${this.lastName}`;
  }
}
