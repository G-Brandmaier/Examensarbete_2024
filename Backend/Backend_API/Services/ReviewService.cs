using Backend_API.Models;
using Backend_API.Models.Dtos;
using Backend_API.Models.Entities;
using Backend_API.Repositories;
using Microsoft.AspNetCore.Identity;

namespace Backend_API.Services;

public class ReviewService
{
    private readonly ReviewRepo _reviewRepo;
    private readonly UserManager<IdentityUser> _userManager;
    private readonly ILogger<ReviewService> _logger;

    public ReviewService(ReviewRepo reviewRepo, UserManager<IdentityUser> userManager, ILogger<ReviewService> logger)
    {
        _reviewRepo = reviewRepo;
        _userManager = userManager;
        _logger = logger;
    }

    public async Task<List<Review>> GetReviewsByIdAndTypeAsync(int mediaId, string type)
    {
        try
        {
            var reviewEntitys = await _reviewRepo.GetReviewsByIdAndTypeAsync(mediaId, type);
            var reviews = new List<Review>();

            if (reviewEntitys.Count > 0)
            {
                foreach (var review in reviewEntitys)
                {
                    reviews.Add(review);
                }
            }
            return reviews;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            _logger.LogError(ex, $"An error occurred while getting the reviews for media with id:{mediaId} type{type}");
            return null;
        }
    }

    public async Task<Review> GetUserReviewByIdAndTypeAsync(string email, int mediaId, string mediaType)
    {
        try
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user != null)
            {
                var result = await _reviewRepo.GetUserReviewByIdAndTypeAsync(user.Id, mediaId, mediaType);
                if (result != null)
                    return result;
                else
                    return null;

            }
            return null;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            _logger.LogError(ex, $"An error occurred while getting the user review for media with id:{mediaId} type{mediaType}");
            return null;
        }
    }

    public async Task<List<Review>> GetUserReviewsAsync(string email)
    {
        try
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user != null)
            {
                var result = await _reviewRepo.GetUserReviewsAsync(user.Id);
                var reviews = new List<Review>();

                if (result != null)
                {
                    foreach (var review in result)
                    {
                        reviews.Add(review);
                    }
                }
                return reviews;
            }
            return null;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            _logger.LogError(ex, $"An error occurred while getting the user reviews");
            return null;
        }
    }

    public async Task<int> GetUserReviewCountAsync(string email)
    {
        try
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user != null)
            {
                var result = await _reviewRepo.GetUserReviewsAsync(user.Id);

                if (result != null)
                {
                    return result.Count;
                }
                return 0;
            }
            return 0;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            _logger.LogError(ex, $"An error occurred while getting the user review count");
            return 0;
        }
    }
    

    public async Task<Review> GetLatestReviewByIdAndTypeAsync(int mediaId, string mediaType)
    {
        try
        {
            var result = await _reviewRepo.GetLatestReviewByIdAndTypeAsync(mediaId, mediaType);
            if (result != null)
                return result;
            else
                return null;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            _logger.LogError(ex, $"An error occurred while getting the latest review for media with id:{mediaId} type{mediaType}");
            return null;
        }
    }

    
    public async Task<List<Review>> GetLatestUserReviewsAsync(string email, int amount)
    {
        try
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user != null)
            {
                var result = await _reviewRepo.GetLatestUserReviewsAsync(user.Id, amount);
                var reviews = new List<Review>();

                if (result != null)
                {
                    foreach (var review in result)
                    {
                        reviews.Add(review);
                    }
                    return reviews;
                }
            }
            return null;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            _logger.LogError(ex, $"An error occurred while getting the latest ${amount} user reviews");
            return null;
        }
    }


    public async Task<Review> AddReviewAsync(ReviewDto dto, string email)
    {
        try
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user != null)
            {
                var reviews = await _reviewRepo.GetUserReviewsAsync(user.Id);

                var existingReview = reviews.Where(x => x.MediaId == dto.MediaId && x.MediaType == dto.MediaType).FirstOrDefault();
                if (existingReview == null)
                {
                    var ratingEntity = await _reviewRepo.GetRatingAsync(dto.MediaId, dto.MediaType);
                    if (ratingEntity == null)
                    {
                        var newRatingentity = new RatingEntity
                        {
                            MediaId = dto.MediaId,
                            MediaType = dto.MediaType,
                            Average = dto.Rating
                        };
                        await _reviewRepo.AddRatingAsync(newRatingentity);
                    }

                    ReviewEntity entity = dto;
                    entity.Created_At = DateTime.Now.ToString();
                    entity.IdentityUser = user;
                    entity.IdentityUserId = user.Id;
                    var result = await _reviewRepo.AddReviewAsync(entity);
                    if (result != null)
                    {
                        await UpdateRatingAverage(dto.MediaId, dto.MediaType);
                        return result;
                    }
                }
            }
            return null;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            _logger.LogError(ex, $"An error occurred while adding review for media with id:{dto.MediaId} type{dto.MediaType}");
            return null;
        }
    }

    public async Task<bool> UpdateReviewAsync(UpdateReviewDto dto, string email)
    {
        try
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user != null)
            {
                var review = await _reviewRepo.GetUserReviewAsync(user.Id, dto.Id);

                if (review != null)
                {
                    var updatedEntity = review;
                    updatedEntity.Title = dto.Title;
                    updatedEntity.Description = dto.Description;
                    updatedEntity.Rating = dto.Rating;
                    updatedEntity.Updated_At = DateTime.Now.ToString();

                    var result = await _reviewRepo.UpdateReviewAsync(updatedEntity);

                    if (result)
                    {
                        await UpdateRatingAverage(review.MediaId, review.MediaType);
                        return result;
                    }
                }
            }
            return false;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            _logger.LogError(ex, $"An error occurred while updating review for media with id:{dto.Id}");
            return false;
        }
    }

    public async Task<bool> RemoveReviewAsync(int reviewId, string email)
    {
        try
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user != null)
            {
                var review = await _reviewRepo.GetUserReviewAsync(user.Id, reviewId);
                var mediaId = review.MediaId;
                var mediaType = review.MediaType;

                if (review != null)
                {
                    var result = await _reviewRepo.RemoveReviewAsync(review);
                    if (result)
                    {
                        await UpdateRatingAverage(mediaId, mediaType);
                        return result;
                    }
                }
            }
            return false;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            _logger.LogError(ex, $"An error occurred while removing review for media with id:{reviewId}");
            return false;
        }
    }

    public async Task<bool> UpdateRatingAverage(int mediaId, string mediaType)
    {
        try
        {
            var ratingEntity = await _reviewRepo.GetRatingAsync(mediaId, mediaType);
            if (ratingEntity != null)
            {
                var allReviews = await _reviewRepo.GetReviewsByIdAndTypeAsync(mediaId, mediaType);
                if (allReviews.Count > 0)
                {
                    var ratings = allReviews.Select(x => x.Rating).ToList();
                    decimal average = ratings.Sum() / (decimal)ratings.Count;
                    ratingEntity.Average = Math.Round(average, 1);
                    return await _reviewRepo.UpdateRatingAsync(ratingEntity);
                }
                else
                {
                    ratingEntity.Average = 0;
                    return await _reviewRepo.UpdateRatingAsync(ratingEntity);
                }
            }
            return false;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            _logger.LogError(ex, $"An error occurred while updating rating for media with id:{mediaId} and type:{mediaType}");
            return false;
        }
    }

    public async Task<RatingEntity> GetRatingAsync(int mediaId, string mediaType)
    {
        try
        {
            var ratingEntity = await _reviewRepo.GetRatingAsync(mediaId, mediaType);
            if (ratingEntity != null)
                return ratingEntity;
            else
                return null;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            _logger.LogError(ex, $"An error occurred while getting the rating for media with id:{mediaId} and type:{mediaType}");
            return null;
        }
    }
}
