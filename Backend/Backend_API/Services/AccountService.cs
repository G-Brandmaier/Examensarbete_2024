using Backend_API.Contexts;
using Backend_API.Helpers.JWT;
using Backend_API.Models;
using Backend_API.Models.Dtos;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace Backend_API.Services;

public class AccountService
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly SignInManager<IdentityUser> _signInManager;
    private readonly JwtToken _jwtToken;
    private readonly UserProfileService _userProfileService;
    private readonly DataContext _context;
    private readonly ILogger<AccountService> _logger;

    public AccountService(JwtToken jwtToken, SignInManager<IdentityUser> signInManager, UserManager<IdentityUser> userManager, UserProfileService userProfileService, DataContext context, ILogger<AccountService> logger)
    {
        _jwtToken = jwtToken;
        _signInManager = signInManager;
        _userManager = userManager;
        _userProfileService = userProfileService;
        _context = context;
        _logger = logger;
    }

    public async Task<User> GetUserAsync(string email)
    {
        try
        {
            var identityUser = await _userManager.FindByEmailAsync(email);
            if (identityUser != null)
            {
                return identityUser;
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            _logger.LogError(ex, "An error occurred while fetching the user");
        }
        return null;
    }

    public async Task<bool> RegisterUserAsync(RegisterUserDto dto)
    {
        using (var transaction = await _context.Database.BeginTransactionAsync())
        {
            try
            {
                var identityUser = await _userManager.FindByEmailAsync(dto.Email);
                if (identityUser == null)
                {
                    var identityResult = await _userManager.CreateAsync(dto, dto.Password);
                    if (identityResult.Succeeded)
                    {
                        var user = await _userManager.FindByEmailAsync(dto.Email);
                        if (user == null)
                        {
                            throw new Exception("User not found after registration");
                        }
                        await _userProfileService.AddUserProfileAsync(user);
                        await transaction.CommitAsync();
                        return true;
                    }
                    else
                    {
                        throw new Exception("User could not be registered");
                    }
                }
                else
                {
                    throw new Exception("Email already exists");
                }
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                Console.WriteLine($"Error: {ex.Message}");
                _logger.LogError(ex, "An error occurred while adding the identityuser and userprofile to the database");
                return false;
            }
        }
    }

    public async Task<string> LogInAsync(LoginUserDto dto)
    {
        try
        {
            var identityUser = await _userManager.FindByEmailAsync(dto.Email);
            if (identityUser != null)
            {
                var signInResult = await _signInManager.CheckPasswordSignInAsync(identityUser, dto.Password, false);
                if (signInResult.Succeeded)
                {
                    var claimsIdentity = new ClaimsIdentity(new Claim[]
                    {
                    new Claim("id", identityUser.Id.ToString()),
                    new Claim(ClaimTypes.Name, identityUser.Email!),
                    });

                    if (dto.RememberMe == false)
                        return _jwtToken.GenerateToken(claimsIdentity, DateTime.Now.AddHours(1));

                    else
                        return _jwtToken.GenerateToken(claimsIdentity, DateTime.Now.AddMonths(3));
                }
            }
            return string.Empty;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            _logger.LogError(ex, "An error occurred while logging in the user");
            return string.Empty;
        }
    }

    public async Task LogOutAsync()
    {
        await _signInManager.SignOutAsync();
    }

    public async Task<bool> UpdateUsernameAsync(string newUsername, string email)
    {
        try
        {
            var identityUser = await _userManager.FindByEmailAsync(email);
            if (identityUser != null)
            {
                var updateResult = await _userManager.SetUserNameAsync(identityUser, newUsername);
                if (updateResult.Succeeded)
                    return true;
            }
            return false;

        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            _logger.LogError(ex, "An error occurred while updating the username");
            return false;
        }
    }

    public async Task<bool> ChangeUserPasswordAsync(string newPassword, string oldPassword, string email)
    {
        try
        {
            var identityUser = await _userManager.FindByEmailAsync(email);
            if (identityUser != null)
            {
                var passwordResult = await _userManager.ChangePasswordAsync(identityUser, oldPassword, newPassword);
                if (passwordResult.Succeeded)
                    return true;
            }
            return false;

        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            _logger.LogError(ex, "An error occurred while changeing the user password");
            return false;
        }
    }

    public async Task<bool> DeleteAccountAsync(string email)
    {
        using (var transaction = await _context.Database.BeginTransactionAsync())
        {
            try
            {
                var identityUser = await _userManager.FindByEmailAsync(email);

                if (identityUser == null)
                {
                    throw new Exception("User not found");
                }

                var resultEntity = await _userProfileService.DeleteAccountAsync(identityUser);
                if (resultEntity)
                {
                    var resultIdentity = await _userManager.DeleteAsync(identityUser);
                    if (!resultIdentity.Succeeded)
                    {
                        throw new Exception("User could not be removed");
                    }
                }
                else
                {
                    throw new Exception("UserProfile could not be removed");
                }
                await transaction.CommitAsync();
                return true;
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                Console.WriteLine($"Error: {ex.Message}");
                _logger.LogError(ex, "An error occurred while removing the user from the database");
                return false;
            }
        }
    }
    
}
