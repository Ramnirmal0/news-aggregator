/**
 * DBClient class simulates a simple in-memory database client.
 * It stores records in a private object and provides methods to
 * insert, find, and update records.
 */
class DBClient {
  #record; // Private field to store records

  /**
   * Constructs a new instance of DBClient.
   * Initializes the private record object.
   */
  constructor() {
    this.#record = {};
  }

  /**
   * Inserts a new record into the database.
   * @param {Object} data - The data to be inserted.
   * @param {string} data.name - The name of the user.
   * @param {string} data.email - The email of the user, used as a unique identifier.
   * @param {string} data.password - The password of the user.
   * @param {Object} data.preferences - The preferences of the user.
   * @returns {Object} - The inserted record.
   */
  insertOne(data) {
    return (this.#record[data.email] = {
      name: data.name,
      email: data.email,
      password: data.password,
      preferences: data.preferences,
    });
  }

  /**
   * Finds a record in the database by email.
   * Optionally retrieves only the preferences if the preference parameter is true.
   * @param {string} email - The email of the user to find.
   * @param {boolean} [preference=false] - Whether to retrieve only the preferences.
   * @returns {Object|undefined} - The found record or undefined if not found.
   */
  findOne(email, preference = false) {
    if (preference) {
      return this.#record[email]?.preferences || undefined;
    }
    return this.#record[email] || undefined;
  }

  /**
   * Updates the preferences of a record in the database.
   * @param {string} email - The email of the user to update.
   * @param {Object} preferences - The new preferences to be set.
   * @returns {Object} - The updated preferences.
   */
  updateOne(email, preferences) {
    return (this.#record[email].preferences = preferences);
  }
}

module.exports = DBClient;
