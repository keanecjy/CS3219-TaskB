import database from '../models';

class MovieService {
  static async getAllMovies() {
    try {
      return await database.Movie.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async addMovie(newMovie) {
    try {
      return await database.Movie.create(newMovie);
    } catch (error) {
      throw error;
    }
  }

  static async updateMovie(id, updateMovie) {
    try {
      const movieToUpdate = await database.Movie.findOne({
        where: { id: Number(id) }
      });

      if (movieToUpdate) {
        await database.Movie.update(updateMovie, { where: { id: Number(id) } });

        return updateMovie;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getAMovie(id) {
    try {
      const theMovie = await database.Movie.findOne({
        where: { id: Number(id) }
      });

      return theMovie;
    } catch (error) {
      throw error;
    }
  }

  static async deleteMovie(id) {
    try {
      const movieToDelete = await database.Movie.findOne({ where: { id: Number(id) } });

      if (movieToDelete) {
        const deletedMovie = await database.Movie.destroy({
          where: { id: Number(id) }
        });
        return deletedMovie;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default MovieService;
