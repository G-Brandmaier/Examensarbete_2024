using Backend_API.Contexts;
using Backend_API.Models;
using Backend_API.Models.Dtos;
using Backend_API.Models.Entities;
using Backend_API.Repositories;
using Microsoft.AspNetCore.Identity;

namespace Backend_API.Services;

public class UserProfileService
{
    private readonly UserProfileRepo _userProfileRepo;
    private readonly UserManager<IdentityUser> _userManager;
    private readonly DataContext _context;
    private readonly ILogger<UserProfileService> _logger;

    public UserProfileService(UserProfileRepo userProfileRepo, UserManager<IdentityUser> userManager, DataContext context, ILogger<UserProfileService> logger)
    {
        _userProfileRepo = userProfileRepo;
        _userManager = userManager;
        _context = context;
        _logger = logger;
    }

    public async Task<UserProfile> GetUserProfileAsync(string email)
    {
        try
        {
            var identityUser = await _userManager.FindByEmailAsync(email);
            if (identityUser != null)
            {
                var profile = await _userProfileRepo.GetUserProfile(identityUser.Id);
                if (profile != null)
                    return profile;
                else
                    return null;
            }
            else
            {
                throw new Exception("User not found");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            _logger.LogError(ex, "An error occurred while getting the userprofile");
            return null;
        }
    }

    public async Task<bool> AddUserProfileAsync(IdentityUser user)
    {
        try
        {
            var userProfile = new UserProfileEntity
            {
                Id = user.Id,
                MemberSince = DateTime.Today.ToShortDateString(),
            };
            return await _userProfileRepo.AddUserProfile(userProfile);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            _logger.LogError(ex, "An error occurred while adding the userprofile to the database");
            return false;
        }
    }

    public async Task<UserProfile> UpdateUserProfileAsync(string email, UpdateUserProfileDto dto)
    {
        using (var transaction = await _context.Database.BeginTransactionAsync())
        {
            try
            {
                var identityUser = await _userManager.FindByEmailAsync(email);
                if (identityUser != null)
                {
                    var oldProfile = await _userProfileRepo.GetUserProfile(identityUser.Id);
                    var entity = oldProfile;
                    entity.Description = dto.Description;
                    entity.OpenProfile = dto.OpenProfile;
                    entity.Icon = dto.Icon;
                    entity.IconColor = dto.IconColor;

                    var updatedProfile = await _userProfileRepo.UpdateUserProfile(entity);
                    if (updatedProfile != null)
                    {
                        await transaction.CommitAsync();
                        return updatedProfile;
                    }
                    else
                    {
                        throw new Exception("Userprofile could not be updated");
                    }
                }
                else
                {
                    throw new Exception("User not found");
                }
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                Console.WriteLine($"Error: {ex.Message}");
                _logger.LogError(ex, "An error occurred while updating the userprofile");
                return null;
            }
        }
    }

    public async Task<bool> DeleteAccountAsync(IdentityUser identityUser)
    {
        try
        {
            var userProfileEnity = await _userProfileRepo.GetUserProfile(identityUser.Id!);
            if (userProfileEnity != null)
            {
                return await _userProfileRepo.DeleteAccountAsync(userProfileEnity);
            }
            else
            {
                throw new Exception("Userprofile not found");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            _logger.LogError(ex, "An error occurred while removing the userprofile");
            return false;
        }
    }
    

    public async Task<List<WatchListItemDto>> GetUserWatchListAsync(string email)
    {
        try
        {
            var identityUser = await _userManager.FindByEmailAsync(email);
            if (identityUser != null)
            {
                var userProfileWatchListItems = await _userProfileRepo.GetAllUserProfileWatchListItemsAsync(identityUser.Id);
                if (userProfileWatchListItems.Count > 0)
                {
                    var watchlist = new List<WatchListItemDto>();
                    foreach (var item in userProfileWatchListItems)
                    {
                        watchlist.Add(item.WatchListItem);
                    }
                    return watchlist;
                }
                else
                    return null;
            }
            else
            {
                throw new Exception("User not found");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            _logger.LogError(ex, "An error occurred while getting the user watchlist");
            return null;
        }
    }

    public async Task<bool> CheckAddedToUserWatchListAsync(string email, int mediaId, string mediaType)
    {
        try
        {
            var identityUser = await _userManager.FindByEmailAsync(email);
            if (identityUser != null)
            {
                var watchListItem = await _userProfileRepo.GetWatchListItemAsync(mediaId, mediaType);
                if (watchListItem != null)
                {
                    var userWatchListItem = await _userProfileRepo.GetUserProfileWatchListItemAsync(watchListItem.Id, identityUser.Id);
                    if(userWatchListItem != null)
                        return true;
                    else 
                        return false;
                }
                else
                    return false;
            }
            else
            {
                throw new Exception("User not found");
            };
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            _logger.LogError(ex, "An error occurred while checking if item is on the user watchlist");
            return false;
        }
    }

    public async Task<bool> AddToUserWatchListAsync(WatchListItemDto dto, string email)
    {
        try
        {
            var identityUser = await _userManager.FindByEmailAsync(email);
            if (identityUser != null)
            {
                var existingItem = await _userProfileRepo.GetWatchListItemAsync(dto.MediaId, dto.MediaType);
                var userProfile = await _userProfileRepo.GetUserProfile(identityUser.Id);
                var entity = new UserProfileWatchListItemEntity
                {
                    UserProfile = userProfile,
                    UserProfileId = userProfile.Id

                };
                if (existingItem != null)
                {
                    entity.WatchListItem = existingItem;
                }
                else
                {
                    var result = await _userProfileRepo.AddWatchListItemAsync(dto);
                    entity.WatchListItem = result;
                }
                if (await _userProfileRepo.AddUserProfileWatchListItemAsync(entity) != null)
                    return true;
                else return false;
            }
            else
            {
                throw new Exception("User not found");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            _logger.LogError(ex, "An error occurred while adding item to the user watchlist");
            return false;
        }
    }

    public async Task<bool> RemoveFromUserWatchListAsync(int mediaId, string mediaType, string email)
    {
        try
        {
            var identityUser = await _userManager.FindByEmailAsync(email);
            if (identityUser != null)
            {
                var watchListItem = await _userProfileRepo.GetWatchListItemAsync(mediaId, mediaType);
                if (watchListItem != null)
                {
                    var entityToRemove = await _userProfileRepo.GetUserProfileWatchListItemAsync(watchListItem.Id, identityUser.Id);
                    if (entityToRemove != null)
                    {
                        return await _userProfileRepo.RemoveUserProfileWatchListItemAsync(entityToRemove);
                    }
                    return false;
                }
                else
                    return false;
            }
            else
            {
                throw new Exception("User not found");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            _logger.LogError(ex, "An error occurred while removing item from the user watchlist");
            return false;
        }
    }
}
