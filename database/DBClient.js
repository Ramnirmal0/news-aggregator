class DBClient {
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
  findOne(email, preference) {
    if (preference) {
      return this.#record[email].preferences || undefined;
    }
    return this.#record[email] || undefined;
  }
  updateOne(email, preferences) {
    return this.#record[email].preferences = preferences;
  }
}

module.exports = DBClient;
