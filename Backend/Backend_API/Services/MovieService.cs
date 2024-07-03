using Backend_API.Models.Dtos.TMDB.Movie;
using Backend_API.Services.ApiTMDB;
using Newtonsoft.Json;

namespace Backend_API.Services;

public class MovieService
{
    private readonly MovieApiService _movieAPIService;
    private readonly ReviewService _reviewService;
    private readonly ILogger<MovieService> _logger;

    public MovieService(MovieApiService movieAPIService, ReviewService reviewService, ILogger<MovieService> logger)
    {
        _movieAPIService = movieAPIService;
        _reviewService = reviewService;
        _logger = logger;
    }

    public async Task<MovieDetailsDto> GetMovieDetailsAsync(int movieId)
    {
        try
        {
            var json = await _movieAPIService.GetMovieDetailsAsync(movieId);
            if (json != null)
            {
                var movieDetails = JsonConvert.DeserializeObject<MovieDetailsDto>(json);
                string directorName = movieDetails.Credits.Crew.Where(x => x.Job == "Director").FirstOrDefault()?.Name;
                var ratingEntity = await _reviewService.GetRatingAsync(movieId, movieDetails.MediaType);
                if (ratingEntity != null)
                    movieDetails.Rating = ratingEntity.Average;
                if (directorName != null)
                    movieDetails.Director = directorName;
                return movieDetails;
            }
            return null;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            _logger.LogError(ex, $"An error occurred while getting movie details for id:{movieId}");
            return null;
        }
    }

    public async Task<MovieTeasersDto> GetSimilarMoviesAsync(int page, int movieId)
    {
        try
        {
            var json = await _movieAPIService.GetSimilarMoviesAsync(page, movieId);
            if (json != null)
            {
                return JsonConvert.DeserializeObject<MovieTeasersDto>(json);
            }
            return null;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            _logger.LogError(ex, $"An error occurred while getting similar movies for id:{movieId} and page:{page}");
            return null;
        }
    }

    
    public async Task<MovieTeasersDto> GetNowPlayingMoviesAsync(int page)
    {
        try
        {
            var json = await _movieAPIService.GetNowPlayingMoviesAsync(page);
            if (json != null)
            {
                return JsonConvert.DeserializeObject<MovieTeasersDto>(json);
            }
            return null;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            _logger.LogError(ex, $"An error occurred while getting now plaing movies, page:{page}");
            return null;
        }
    }

    public async Task<MovieTeasersDto> GetUpComingMoviesAsync(int page)
    {
        try
        {
            var json = await _movieAPIService.GetUpComingMoviesAsync(page);
            if (json != null)
            {
                return JsonConvert.DeserializeObject<MovieTeasersDto>(json);
            }
            return null;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            _logger.LogError(ex, $"An error occurred while getting upcoming movies, page:{page}");
            return null;
        }
    }
    
    public async Task<MovieTeasersDto> GetPopularMoviesAsync(int page)
    {
        try
        {
            var json = await _movieAPIService.GetPopularMoviesAsync(page);
            if (json != null)
            {
                return JsonConvert.DeserializeObject<MovieTeasersDto>(json);
            }
            return null;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            _logger.LogError(ex, $"An error occurred while getting popular movies, page:{page}");
            return null;
        }
    }
}
