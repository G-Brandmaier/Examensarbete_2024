using Backend_API.Helpers.Filters;
using Backend_API.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend_API.Controllers;

[UseApiKey]
[Route("api/[controller]")]
[ApiController]
public class MediaController : ControllerBase
{
    private readonly MediaService _mediaService;

    public MediaController(MediaService mediaService)
    {
        _mediaService = mediaService;
    }

    [Route("SearchAll/{searchValue}")]
    [HttpGet]
    public async Task<IActionResult> SearchAll(string searchValue)
    {
        if (ModelState.IsValid)
        {
            var results = await _mediaService.SearchAllAsync(searchValue);

            if (results != null)
                return Ok(results);
            else
                return NotFound("No results found");
        }
        return BadRequest("Something went wrong");
    }

    [Route("SearchType/{type}/{serachValue}")]
    [HttpGet]
    public async Task<IActionResult> SearchAll(string type, string searchValue)
    {
        if (ModelState.IsValid)
        {
            var results = await _mediaService.SearchTypeAsync(type, searchValue);

            if (results != null)
                return Ok(results);
            else
                return NotFound("No results found");
        }
        return BadRequest("Something went wrong");
    }

    [Route("GetMediaTeaser/{id}/{type}")]
    [HttpGet]
    public async Task<IActionResult> GetMediaTeaser(int id, string type)
    {
        if (ModelState.IsValid)
        {
            var result = await _mediaService.GetMediaTeaserAsync(id, type);

            if (result != null)
                return Ok(result);
            else
                return NotFound("No results found");
        }
        return BadRequest("Something went wrong");
    }

    [Route("GetActorDetails/{id}")]
    [HttpGet]
    public async Task<IActionResult> GetActorDetails(int id)
    {
        if (ModelState.IsValid)
        {
            var details = await _mediaService.GetActorDetailsAsync(id);

            if (details != null)
                return Ok(details);
            else
                return NotFound();
        }
        return BadRequest("Something went wrong");
    }
}
