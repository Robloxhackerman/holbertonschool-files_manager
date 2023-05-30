import sha1 from 'sha1';
import DBClient from '../utils/db';
import {RedisClient} from "redis";

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

  static async getMe(request, response) {
    const token = request.header('X-Token') || null;
    if (!token) return response.status(401).send({ error: 'Unauthorized' });

    const redisToken = await RedisClient.get(`auth_${token}`);
    if (!redisToken) return response.status(401).send({ error: 'Unauthorized' });

    const user = await DBClient.db.collection('users').findOne({ _id: ObjectId(redisToken) });
    if (!user) return response.status(401).send({ error: 'Unauthorized' });
    delete user.password;

    return response.status(200).send({ id: user._id, email: user.email });
  }
}

export default UsersController;
