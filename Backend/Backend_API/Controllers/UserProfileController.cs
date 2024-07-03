using Backend_API.Helpers.Filters;
using Backend_API.Models.Dtos;
using Backend_API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend_API.Controllers;

[UseApiKey]
[Authorize]
[Route("api/[controller]")]
[ApiController]
public class UserProfileController : ControllerBase
{
    private readonly UserProfileService _userProfileService;

    public UserProfileController(UserProfileService userProfileService)
    {
        _userProfileService = userProfileService;
    }

    [Route("GetUserProfile")]
    [HttpGet]
    public async Task<IActionResult> GetUserProfile()
    {
        if (ModelState.IsValid)
        {
            var email = HttpContext.User.Identity!.Name;

            if (email != null)
            {
                var profile = await _userProfileService.GetUserProfileAsync(email);
                if (profile != null)
                {
                    return Ok(profile);
                }
            }
            return BadRequest("Could not fetch profile");
        }
        return BadRequest("Something went wrong");
    }


    [Route("UpdateUserProfile")]
    [HttpPut]
    public async Task<IActionResult> UpdateUserProfile(UpdateUserProfileDto dto)
    {
        if (ModelState.IsValid)
        {
            var email = HttpContext.User.Identity!.Name;

            if (email != null)
            {
                var updatedProfile = await _userProfileService.UpdateUserProfileAsync(email, dto);
                if (updatedProfile != null)
                {
                    return Ok(updatedProfile);
                }
            }
            return BadRequest("Could not update");
        }
        return BadRequest("Something went wrong");
    }

    [Route("GetUserWatchList")]
    [HttpGet]
    public async Task<IActionResult> GetUserWatchList()
    {
        if (ModelState.IsValid)
        {
            var email = HttpContext.User.Identity!.Name;

            if (email != null)
            {
                var result = await _userProfileService.GetUserWatchListAsync(email);
                return Ok(result);
            }
            return BadRequest("Could not fetch watchlist");
        }
        return BadRequest("Something went wrong");
    }

    [Route("CheckAddedToUserWatchList/{mediaId}/{mediaType}")]
    [HttpGet]
    public async Task<IActionResult> CheckAddedToUserWatchList(int mediaId, string mediaType)
    {
        if (ModelState.IsValid)
        {
            var email = HttpContext.User.Identity!.Name;

            if (email != null)
            {
                var result = await _userProfileService.CheckAddedToUserWatchListAsync(email, mediaId, mediaType);
                if(result)
                    return Ok(result);
            }
            return BadRequest("Could not fetch watchlist");
        }
        return BadRequest("Something went wrong");
    }


    [Route("AddToUserWatchList")]
    [HttpPost]
    public async Task<IActionResult> AddToUserWatchList(WatchListItemDto dto)
    {
        if (ModelState.IsValid)
        {
            var email = HttpContext.User.Identity!.Name;

            if (email != null)
            {
                if (await _userProfileService.AddToUserWatchListAsync(dto, email))
                {
                    return Ok("Media added!");
                }
            }
            return BadRequest("Could not add to watchlist");
        }
        return BadRequest("Something went wrong");
    }

    [Route("RemoveFromUserWatchList/{mediaId}/{mediaType}")]
    [HttpDelete]
    public async Task<IActionResult> RemoveFromUserWatchList(int mediaId, string mediaType)
    {
        if (ModelState.IsValid)
        {
            var email = HttpContext.User.Identity!.Name;

            if (email != null)
            {
                if (await _userProfileService.RemoveFromUserWatchListAsync(mediaId, mediaType, email))
                {
                    return Ok("Media removed!");
                }
            }
            return BadRequest("Could not remove from watchlist!");
        }
        return BadRequest("Something went wrong");
    }
}
