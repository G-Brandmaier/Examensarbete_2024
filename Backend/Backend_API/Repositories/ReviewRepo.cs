using Backend_API.Contexts;
using Backend_API.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend_API.Repositories;

public class ReviewRepo
{
    private readonly DataContext _context;

    public ReviewRepo(DataContext context)
    {
        _context = context;
    }

    public async Task<List<ReviewEntity>> GetReviewsByIdAndTypeAsync(int mediaId, string type)
    {
        try
        {
            return await _context.Review.Include("IdentityUser").Where(x => x.MediaId == mediaId && x.MediaType == type).ToListAsync();
        }
        catch (Exception ex)
        {

        }
        return null;
    }

    public async Task<ReviewEntity> GetUserReviewAsync(string userId, int reviewId)
    {
        try
        {
            return await _context.Review.Where(x => x.IdentityUserId == userId && x.Id == reviewId).SingleOrDefaultAsync();
        }
        catch (Exception ex)
        {

        }
        return null;
    }
 
    public async Task<ReviewEntity> GetLatestReviewByIdAndTypeAsync(int mediaId, string type)
    {
        try
        {
            return _context.Review.Include("IdentityUser").Where(x => x.MediaId == mediaId && x.MediaType == type).OrderByDescending(y => y.Created_At).FirstOrDefault()!;
        }
        catch (Exception ex)
        {

        }
        return null;
    }

    public async Task<List<ReviewEntity>> GetLatestUserReviewsAsync(string id, int amount)
    {
        try
        {
            var reviews = await GetUserReviewsAsync(id);
            if(reviews != null)
            {
                return reviews.OrderByDescending(x => x.Created_At).Take(reviews.Count < amount ? reviews.Count : amount).ToList();
            }
        }
        catch (Exception ex)
        {

        }
        return null;
    }
    

    public async Task<ReviewEntity> GetUserReviewByIdAndTypeAsync(string userId, int mediaId, string mediaType)
    {
        try
        {
            return await _context.Review.Where(x => x.IdentityUserId == userId && x.MediaId == mediaId && x.MediaType == mediaType).SingleOrDefaultAsync();
        }
        catch (Exception ex)
        {

        }
        return null;
    }

    public async Task<List<ReviewEntity>> GetUserReviewsAsync(string userId)
    {
        try
        {
            return await _context.Review.Where(x => x.IdentityUserId == userId).ToListAsync();
        }
        catch (Exception ex)
        {

        }
        return null;
    }

    public async Task<ReviewEntity> AddReviewAsync(ReviewEntity entity)
    {
        try
        {
            _context.Review.Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }
        catch (Exception ex)
        {

        }
        return null;
    }

    public async Task<bool> UpdateReviewAsync(ReviewEntity entity)
    {
        try
        {
            _context.Review.Update(entity);
            await _context.SaveChangesAsync();
            return true;
        }
        catch (Exception ex)
        {

        }
        return false;
    }

    public async Task<bool> RemoveReviewAsync(ReviewEntity entity)
    {
        try
        {
            _context.Review.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }
        catch (Exception ex)
        {

        }
        return false;
    }

    public async Task<RatingEntity> AddRatingAsync(RatingEntity entity)
    {
        try
        {
            _context.Rating.Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }
        catch (Exception ex)
        {

        }
        return null;
    }

    public async Task<bool> UpdateRatingAsync(RatingEntity entity)
    {
        try
        {
            _context.Rating.Update(entity);
            await _context.SaveChangesAsync();
            return true;
        }
        catch (Exception ex)
        {

        }
        return false;
    }

    public async Task<RatingEntity> GetRatingAsync(int mediaId, string mediaType)
    {
        try
        {
            return _context.Rating.Where(x => x.MediaId == mediaId && x.MediaType == mediaType).SingleOrDefault();
        }
        catch (Exception ex)
        {

        }
        return null;
    }
}
