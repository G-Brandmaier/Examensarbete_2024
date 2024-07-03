using Backend_API.Helpers.Filters;
using Backend_API.Models.Dtos;
using Backend_API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend_API.Controllers;

[UseApiKey]
[Route("api/[controller]")]
[ApiController]
public class ReviewController : ControllerBase
{
    private readonly ReviewService _reviewService;

    public ReviewController(ReviewService reviewService)
    {
        _reviewService = reviewService;
    }

    [Route("GetReviewsByIdAndType/{mediaId}/{type}")]
    [HttpGet]
    public async Task<IActionResult> GetReviewsByIdAndType(int mediaId, string type)
    {
        if (ModelState.IsValid)
        {
            var results = await _reviewService.GetReviewsByIdAndTypeAsync(mediaId, type);
            if (results.Count > 0)
            {
                return Ok(results);
            }
            return NotFound();
        }
        return BadRequest("Invalid data");
    }

    [Route("GetLatestReviewByIdAndType/{mediaId}/{type}")]
    [HttpGet]
    public async Task<IActionResult> GetLatestReviewByIdAndType(int mediaId, string type)
    {
        if (ModelState.IsValid)
        {
            var result = await _reviewService.GetLatestReviewByIdAndTypeAsync(mediaId, type);
            if (result != null)
            {
                return Ok(result);
            }
            return NotFound();
        }
        return BadRequest("Invalid data");
    }

    [Authorize]
    [Route("GetLatestUserReviews/{amount}")]
    [HttpGet]
    public async Task<IActionResult> GetLatestUserReviews(int amount)
    {
        if (ModelState.IsValid)
        {
            var email = HttpContext.User.Identity!.Name;

            if (email != null)
            {
                var result = await _reviewService.GetLatestUserReviewsAsync(email, amount);
                if (result != null)
                {
                    return Ok(result);
                }
                return NotFound();
            }
        }
        return BadRequest("Invalid data");
    }

    [Authorize]
    [Route("GetUserReviewByIdAndType/{mediaId}/{type}")]
    [HttpGet]
    public async Task<IActionResult> GetUserReviewByIdAndType(int mediaId, string type)
    {
        if (ModelState.IsValid)
        {
            var email = HttpContext.User.Identity!.Name;

            if (email != null)
            {
                var result = await _reviewService.GetUserReviewByIdAndTypeAsync(email, mediaId, type);
                if (result != null)
                    return Ok(result);
                else
                    return NotFound("No reviews found");
            }
        }
        return BadRequest("Something went wrong");
    }

    [Authorize]
    [Route("GetUserReviews")]
    [HttpGet]
    public async Task<IActionResult> GetUserReviews()
    {
        if (ModelState.IsValid)
        {
            var email = HttpContext.User.Identity!.Name;

            if (email != null)
            {
                var result = await _reviewService.GetUserReviewsAsync(email);
                if (result != null)
                    return Ok(result);
                else
                    return NotFound("No user reviews found"); ;
            }
        }
        return BadRequest("Something went wrong");
    }

    [Authorize]
    [Route("GetUserReviewCount")]
    [HttpGet]
    public async Task<IActionResult> GetUserReviewCount()
    {
        if (ModelState.IsValid)
        {
            var email = HttpContext.User.Identity!.Name;

            if (email != null)
            {
                var result = await _reviewService.GetUserReviewCountAsync(email);
                return Ok(result);
            }
        }
        return BadRequest("Something went wrong");
    }

    [Authorize]
    [Route("AddReview")]
    [HttpPost]
    public async Task<IActionResult> AddReview(ReviewDto dto)
    {
        if (ModelState.IsValid)
        {
            var email = HttpContext.User.Identity!.Name;

            if (email != null)
            {
                var result = await _reviewService.AddReviewAsync(dto, email);
                if (result != null)
                    return Created("Review added", null);
                else
                    return BadRequest("Something went wrong");
            }
        }
        return BadRequest("Invalid data");
    }

    [Authorize]
    [Route("UpdateReview")]
    [HttpPut]
    public async Task<IActionResult> UpdateReview(UpdateReviewDto dto)
    {
        if (ModelState.IsValid)
        {
            var email = HttpContext.User.Identity!.Name;

            if (email != null)
            {
                if (await _reviewService.UpdateReviewAsync(dto, email))
                    return Ok("Review updated");
                else
                    return BadRequest("Something went wrong");
            }
        }
        return BadRequest("Invalid data");
    }

    [Authorize]
    [Route("RemoveReview/{reviewId}")]
    [HttpDelete]
    public async Task<IActionResult> RemoveReview(int reviewId)
    {
        if (ModelState.IsValid)
        {
            var email = HttpContext.User.Identity!.Name;

            if (email != null)
            {
                if (await _reviewService.RemoveReviewAsync(reviewId, email))
                    return Ok("Review removed");
                else
                    return BadRequest("Something went wrong");
            }
        }
        return BadRequest("Invalid data");
    }
}
