using Backend_API.Helpers.Filters;
using Backend_API.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend_API.Controllers;

[UseApiKey]
[Route("api/[controller]")]
[ApiController]
public class TvSeriesController : ControllerBase
{
    private readonly TvSeriesService _tvSeriesService;

    public TvSeriesController(TvSeriesService tvSeriesService)
    {
        _tvSeriesService = tvSeriesService;
    }

    [Route("GetTvSeriesDetails/{tvSeriesId}")]
    [HttpGet]
    public async Task<IActionResult> GetTvSeriesDetails(int tvSeriesId)
    {
        if (ModelState.IsValid)
        {
            var details = await _tvSeriesService.GetTvSeriesDetailsAsync(tvSeriesId);

            if (details != null)
                return Ok(details);
            else
                return NotFound();
        }
        return BadRequest("Something went wrong");
    }

    [Route("GetTvSeriesSeasonDetails/{tvSeriesId}/{season}")]
    [HttpGet]
    public async Task<IActionResult> GetTvSeriesSeasonDetails(int tvSeriesId, int season)
    {
        if (ModelState.IsValid)
        {
            var details = await _tvSeriesService.GetTvSeriesSeasonDetailsAsync(tvSeriesId, season);

            if (details != null)
                return Ok(details);
            else
                return NotFound();
        }
        return BadRequest("Something went wrong");
    }
    

    [Route("GetSimilarTvSeries/{tvSeriesId}/{page}")]
    [HttpGet]
    public async Task<IActionResult> GetSimilarTvSeries(int tvSeriesId, int page)
    {
        if (ModelState.IsValid)
        {
            var similartvSeries = await _tvSeriesService.GetSimilarTvSeriesAsync(page, tvSeriesId);

            if (similartvSeries != null)
                return Ok(similartvSeries);
            else
                return NotFound();
        }
        return BadRequest("Something went wrong");
    }

    [Route("GetTvSeriesOnTheAir/{page}")]
    [HttpGet]
    public async Task<IActionResult> GetTvSeriesOnTheAir(int page)
    {
        if (ModelState.IsValid)
        {
            var tvSeries = await _tvSeriesService.GetTvSeriesOnTheAirAsync(page);

            if (tvSeries != null)
                return Ok(tvSeries);
            else
                return NotFound();
        }
        return BadRequest("Something went wrong");
    }

    [Route("GetTopRatedTvSeries/{page}")]
    [HttpGet]
    public async Task<IActionResult> GetTopRatedTvSeries(int page)
    {
        if (ModelState.IsValid)
        {
            var tvSeries = await _tvSeriesService.GetTopRatedTvSeriesAsync(page);

            if (tvSeries != null)
                return Ok(tvSeries);
            else
                return NotFound();
        }
        return BadRequest("Something went wrong");
    }

    [Route("GetPopularTvSeries/{page}")]
    [HttpGet]
    public async Task<IActionResult> GetPopularTvSeries(int page)
    {
        if (ModelState.IsValid)
        {
            var tvSeries = await _tvSeriesService.GetPopularTvSeriesAsync(page);

            if (tvSeries != null)
                return Ok(tvSeries);
            else
                return NotFound();
        }
        return BadRequest("Something went wrong");
    }
    
}
