import sha1 from 'sha1';
import DBClient from '../utils/db';

const Bull = require('bull');

class UsersController {
  static async postNew(request, response) {
    const userQueue = new Bull('userQueue');
    const { email } = request.body;

    if (!email) {
      return response.status(400).send({ error: 'Missing email' });
    }

    const { password } = request.body;
    if (!password) {
      return response.status(400).send({ error: 'Missing password' });
    }

    const emailExists = await DBClient.db.collection('users').findOne({ email });
    if (emailExists) {
      return response.status(400).send({ error: 'Already exist' });
    }

    const userPassword = sha1(password);
    const result = await DBClient.db.collection('users').insertOne({ email, password: userPassword });

    userQueue.add({
      userId: result.insertedId,
    });

    return response.status(201).send({ id: result.insertedId, email });
  }
}

export default UsersController;
