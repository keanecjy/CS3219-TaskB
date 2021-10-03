import MovieService from '../services/MovieService';
import Util from '../utils/Util';

const util = new Util();

class MovieController {
  static async getAllMovies(req, res) {
    try {
      const allMovies = await MovieService.getAllMovies();
      if (allMovies.length > 0) {
        util.setSuccess(200, 'Movies retrieved', allMovies);
      } else {
        util.setSuccess(200, 'No movie found');
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async addMovie(req, res) {
    if (!req.body.title || !req.body.price || !req.body.description) {
      util.setError(400, 'Please provide complete details');
      return util.send(res);
    }
    const newMovie = req.body;
    try {
      const createdMovie = await MovieService.addMovie(newMovie);
      util.setSuccess(201, 'Movie Added!', createdMovie);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async updatedMovie(req, res) {
    const alteredMovie = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }
    try {
      const updateMovie = await MovieService.updateMovie(id, alteredMovie);
      if (!updateMovie) {
        util.setError(404, `Cannot find movie with the id: ${id}`);
      } else {
        util.setSuccess(200, 'Movie updated', updateMovie);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getAMovie(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }

    try {
      const theMovie = await MovieService.getAMovie(id);

      if (!theMovie) {
        util.setError(404, `Cannot find movie with the id ${id}`);
      } else {
        util.setSuccess(200, 'Found Movie', theMovie);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async deleteMovie(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please provide a numeric value');
      return util.send(res);
    }

    try {
      const movieToDelete = await MovieService.deleteMovie(id);

      if (movieToDelete) {
        util.setSuccess(200, 'Movie deleted');
      } else {
        util.setError(404, `Movie with the id ${id} cannot be found`);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

export default MovieController;
