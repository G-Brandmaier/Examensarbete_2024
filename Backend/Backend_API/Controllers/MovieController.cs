using Backend_API.Helpers.Filters;
using Backend_API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend_API.Controllers;

[UseApiKey]
[Route("api/[controller]")]
[ApiController]
public class MovieController : ControllerBase
{
    private readonly MovieService _movieService;

    public MovieController(MovieService movieService)
    {
        _movieService = movieService;
    }

    [Route("GetMovieDetails/{movieId}")]
    [HttpGet]
    public async Task<IActionResult> GetMovieDetails(int movieId)
    {
        if (ModelState.IsValid)
        {
            var details = await _movieService.GetMovieDetailsAsync(movieId);

            if (details != null)
                return Ok(details);
            else
                return NotFound("No results found");
        }
        return BadRequest("Something went wrong");
    }

    [Route("GetSimilarMovies/{movieId}/{page}")]
    [HttpGet]
    public async Task<IActionResult> GetSimilarMovies(int movieId, int page)
    {
        if (ModelState.IsValid)
        {
            var similarMovies = await _movieService.GetSimilarMoviesAsync(page, movieId);

            if (similarMovies != null)
                return Ok(similarMovies);
            else 
                return NotFound("No results found");
        }
        return BadRequest("Something went wrong");
    }

    [Route("GetNowPlayingMovies/{page}")]
    [HttpGet]
    public async Task<IActionResult> GetNowPlayingMovies(int page)
    {
        if (ModelState.IsValid)
        {
            var movies = await _movieService.GetNowPlayingMoviesAsync(page);

            if (movies != null)
                return Ok(movies);
            else
                return NotFound("No results found");
        }
        return BadRequest("Something went wrong");
    }

    [Route("GetUpcomingMovies/{page}")]
    [HttpGet]
    public async Task<IActionResult> GetUpComingMovies(int page)
    {
        if (ModelState.IsValid)
        {
            var movies = await _movieService.GetUpComingMoviesAsync(page);

            if (movies != null)
                return Ok(movies);
            else
                return NotFound("No results found");
        }
        return BadRequest("Something went wrong");
    }

    [Route("GetPopularMovies/{page}")]
    [HttpGet]
    public async Task<IActionResult> GetPopularMovies(int page)
    {
        if (ModelState.IsValid)
        {
            var movies = await _movieService.GetPopularMoviesAsync(page);

            if (movies != null)
                return Ok(movies);
            else
                return NotFound("No results found");
        }
        return BadRequest("Something went wrong"); 
    }
}
