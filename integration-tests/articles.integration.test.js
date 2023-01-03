import { expect } from 'chai'; // eslint-disable-line import/no-extraneous-dependencies
import request from 'supertest'; // eslint-disable-line import/no-extraneous-dependencies
import mongoose from 'mongoose';
import app from '../buildScripts/app';

const Article = mongoose.model('Article');
const agent = request.agent(app);

describe('Article CRUD Test', () => {
  it(`should allow an article to be created (status 201), return an
    automatic generated _id and return a default value por providers`, (done) => {
    const articlePost = {
      code: 'xx111',
      description: 'xxdescription',
      category: { name: 'General', description: 'desc gral' },
      stock: 15,
      price: { value: 500, sinceDate: new Date() },
    };

    agent.post('/api/articles')
      .send(articlePost)
      .expect(201)
      .end((err, results) => {
        if (err) {
          return done(err);
        }
        expect(results.body.providers).to.deep.equal([]);
        expect(results.body).to.have.property('_id');

        return done();
      });
  });

  afterEach((done) => {
    Article.deleteOne({ code: 'xx111' }).exec();
    done();
  });

  after((done) => {
    mongoose.connection.close();
    app.server.close(done());
  });
});
