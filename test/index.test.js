import chai from 'chai';
import chatHttp from 'chai-http';
import 'chai/register-should';
import app from '../src/app';

chai.use(chatHttp);
const { expect } = chai;

describe('Testing the movie endpoints:', () => {
  it('It should create a movie', (done) => {
    const movie = {
      title: 'First Awesome movie',
      price: '$9.99',
      description: 'This is the awesome movie',
    };
    chai
      .request(app)
      .post('/api/movies')
      .set('Accept', 'application/json')
      .send(movie)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data).to.include({
          id: 1,
          title: movie.title,
          price: movie.price,
          description: movie.description,
        });
        done();
      });
  });

  it('It should not create a movie with incomplete parameters', (done) => {
    const movie = {
      price: '$9.99',
      description: 'This is the awesome movie',
    };
    chai
      .request(app)
      .post('/api/movies')
      .set('Accept', 'application/json')
      .send(movie)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('It should get all movies', (done) => {
    chai
      .request(app)
      .get('/api/movies')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        res.body.data[0].should.have.property('id');
        res.body.data[0].should.have.property('title');
        res.body.data[0].should.have.property('price');
        res.body.data[0].should.have.property('description');
        done();
      });
  });

  it('It should get a particular movie', (done) => {
    const validMovieId = 1;
    chai
      .request(app)
      .get(`/api/movies/${validMovieId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('title');
        res.body.data.should.have.property('price');
        res.body.data.should.have.property('description');
        done();
      });
  });

  it('It should not get a particular movie with invalid id', (done) => {
    const invalidMovieId = 8888;
    chai
      .request(app)
      .get(`/api/movies/${invalidMovieId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have
          .property('message')
          .eql(`Cannot find movie with the id ${invalidMovieId}`);
        done();
      });
  });

  it('It should not get a particular movie with non-numeric id', (done) => {
    const invalidMovieId = 'aaa';
    chai
      .request(app)
      .get(`/api/movies/${invalidMovieId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have
          .property('message')
          .eql('Please input a valid numeric value');
        done();
      });
  });

  it('It should update a movie', (done) => {
    const movieId = 1;
    const updatedMovie = {
      id: movieId,
      title: 'Updated Awesome movie',
      price: '$10.99',
      description: 'We have updated the price',
    };
    chai
      .request(app)
      .put(`/api/movies/${movieId}`)
      .set('Accept', 'application/json')
      .send(updatedMovie)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data.id).equal(updatedMovie.id);
        expect(res.body.data.title).equal(updatedMovie.title);
        expect(res.body.data.price).equal(updatedMovie.price);
        expect(res.body.data.description).equal(updatedMovie.description);
        done();
      });
  });

  it('It should not update a movie with invalid id', (done) => {
    const movieId = '9999';
    const updatedMovie = {
      id: movieId,
      title: 'Updated Awesome movie again',
      price: '$11.99',
      description: 'We have updated the price',
    };
    chai
      .request(app)
      .put(`/api/movies/${movieId}`)
      .set('Accept', 'application/json')
      .send(updatedMovie)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have
          .property('message')
          .eql(`Cannot find movie with the id: ${movieId}`);
        done();
      });
  });

  it('It should not update a movie with non-numeric id value', (done) => {
    const movieId = 'ggg';
    const updatedMovie = {
      id: movieId,
      title: 'Updated Awesome movie again',
      price: '$11.99',
      description: 'We have updated the price',
    };
    chai
      .request(app)
      .put(`/api/movies/${movieId}`)
      .set('Accept', 'application/json')
      .send(updatedMovie)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have
          .property('message')
          .eql('Please input a valid numeric value');
        done();
      });
  });

  it('It should delete a movie', (done) => {
    const movieId = 1;
    chai
      .request(app)
      .delete(`/api/movies/${movieId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data).to.include({});
        done();
      });
  });

  it('It should not delete a movie with invalid id', (done) => {
    const movieId = 777;
    chai
      .request(app)
      .delete(`/api/movies/${movieId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have
          .property('message')
          .eql(`Movie with the id ${movieId} cannot be found`);
        done();
      });
  });

  it('It should not delete a movie with non-numeric id', (done) => {
    const movieId = 'bbb';
    chai
      .request(app)
      .delete(`/api/movies/${movieId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have
          .property('message')
          .eql('Please provide a numeric value');
        done();
      });
  });
});
