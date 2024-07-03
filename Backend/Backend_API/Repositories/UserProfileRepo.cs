using Backend_API.Contexts;
using Backend_API.Models;
using Backend_API.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend_API.Repositories;

public class UserProfileRepo
{
    private readonly DataContext _context;

    public UserProfileRepo(DataContext context)
    {
        _context = context;
    }

    public async Task<UserProfileEntity> GetUserProfile(string userId)
    {
        try
        {
            return await _context.UserProfile.SingleOrDefaultAsync(x => x.Id == userId);
        }
        catch (Exception ex)
        {

        }
        return null;
    }

    public async Task<bool> AddUserProfile(UserProfileEntity entity)
    {
        try
        {
            await _context.UserProfile.AddAsync(entity);
            _context.SaveChanges();
            return true;
        }
        catch (Exception ex)
        {

        }
        return false;
    }


    public async Task<UserProfile> UpdateUserProfile(UserProfileEntity entity)
    {
        try
        {
            _context.UserProfile.Update(entity);
            await _context.SaveChangesAsync();
            return entity;
        }
        catch (Exception ex)
        {

        }
        return null;
    }

    public async Task<bool> DeleteAccountAsync(UserProfileEntity entity)
    {
        try
        {
            _context.UserProfile.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }
        catch (Exception ex)
        {

        }
        return false;
    }
    

    public async Task<WatchListItemEntity> GetWatchListItemAsync(int mediaId, string mediaType)
    {
        try
        {
            return _context.WatchListItem.Where(x => x.MediaId == mediaId && x.MediaType == mediaType).SingleOrDefault();
        }
        catch (Exception ex)
        {

        }
        return null;
    }

    public async Task<UserProfileWatchListItemEntity> GetUserProfileWatchListItemAsync(int watchListItemId, string userId)
    {
        try
        {
            return _context.UserProfileWatchListItem.Where(x => x.WatchListItemId == watchListItemId && x.UserProfileId == userId).SingleOrDefault();
        }
        catch (Exception ex)
        {

        }
        return null;
    }

    public async Task<List<UserProfileWatchListItemEntity>> GetAllUserProfileWatchListItemsAsync(string userId)
    {
        try
        {
            return _context.UserProfileWatchListItem.Where(x => x.UserProfileId == userId).Include("WatchListItem").ToList();
        }
        catch (Exception ex)
        {

        }
        return null;
    }

    public async Task<WatchListItemEntity> AddWatchListItemAsync(WatchListItemEntity entity)
    {
        try
        {
            _context.WatchListItem.Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }
        catch (Exception ex)
        {

        }
        return null;
    }

    public async Task<UserProfileWatchListItemEntity> AddUserProfileWatchListItemAsync(UserProfileWatchListItemEntity entity)
    {
        try
        {
            _context.UserProfileWatchListItem.Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }
        catch (Exception ex)
        {

        }
        return null;
    }

    public async Task<bool> RemoveUserProfileWatchListItemAsync(UserProfileWatchListItemEntity entity)
    {
        try
        {
            var entityToRemove = _context.UserProfileWatchListItem.Where(x => x.WatchListItemId == entity.WatchListItemId && x.UserProfileId == entity.UserProfileId).SingleOrDefault();
            if (entityToRemove != null)
            {
                _context.UserProfileWatchListItem.Remove(entityToRemove);
                await _context.SaveChangesAsync();
                return true;
            }
            else
                return false;
        }
        catch (Exception ex)
        {

        }
        return false;
    }
}
