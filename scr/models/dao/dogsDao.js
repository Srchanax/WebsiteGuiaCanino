class DogsDAO {
  static async findDog(client, dog) {
    try {
      const result = await client
        .db('Guia-Canino')
        .collection('dogs')
        .find({ nome: dog })
        .project({ _id: 0 });
      return await result.toArray();
    } catch (err) {
      console.log(err);
    }
  }

  /*
  static async insertContact(client, contact) {
    try {
      const result = await client
        .db('people')
        .collection('contacts')
        .insertOne(contact);
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  static async updateContact(client, email, doc) {
    try {
      const filter = { email: email };
      const newValues = {$set: {
        name: doc.name, phone: doc.phone, address: 
        {street: doc.address.street, comp: doc.address.comp, zipcode: doc.address.zipcode}}}
      const result = await client
        .db('people')
        .collection('contacts')
        .updateOne(filter, newValues);
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  static async deleteContactByEmail(client, email) {
    try {
      const result = await client
        .db('people')
        .collection('contacts')
        .deleteOne({email: email});
      return result;
    } catch (err) {
      console.log(err);
    }
  }
*/
  static async listDogs(client) {
    try {
      const query = {};
      const options = {
        sort: { nome: 1 },
        projection: { _id: 0}
      };
      const results = await client
        .db('Guia-Canino')
        .collection('dogs')
        .find(query, options);
      return await results.toArray();
    } catch (err) {
      console.log(err);
    } finally {
      await client.close()
    }
  }

}

module.exports = DogsDAO;