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
      return this.#record[email][preferences] || undefined;
    }
    return this.#record[email] || undefined;
  }
  updateOne(email, preferences) {
    return this.#record[email].preferences = preferences;
  }
  printAll() {
    console.log({ database: JSON.stringify(this.#record) });
  }
}

module.exports = CustomDB;
