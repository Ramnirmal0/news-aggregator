class CustomDB {
  #record;
  constructor() {
    this.#record = {};
  }
  insertOne(data) {
    return (this.#record[data.email] = {
      name: data.name,
      email: data.email,
      password: data.password,
      preferences: data.preferences,
    });
  }
  findOne(email, preferences) {
    if (preferences) {
      return this.#record[email][preferences];
    }
    return this.#record[email];
  }
  updateOne(email, preferences) {
    return (this.#record(email)[preferences] = preferences);
  }
  printAll() {
    console.log({ database: this.#record });
  }
}

module.exports = CustomDB;
