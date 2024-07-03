using Backend_API.Helpers.Filters;
using Backend_API.Models.Dtos;
using Backend_API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend_API.Controllers;

[UseApiKey]
[Route("api/[controller]")]
[ApiController]
public class AccountController : ControllerBase
{
    private readonly AccountService _accountService;

    public AccountController(AccountService accountService)
    {
        _accountService = accountService;
    }

    [Authorize]
    [Route("GetUser")]
    [HttpGet]
    public async Task<IActionResult> GetUser()
    {
        if (ModelState.IsValid)
        {
            var email = HttpContext.User.Identity!.Name;

            if(email != null)
            {
                var user = await _accountService.GetUserAsync(email);
                if (user != null)
                {
                    return Ok(user);
                }
            }
            return BadRequest("Could not fetch user");
        }
        return BadRequest("Something went wrong!");
    }

    [Route("Register")]
    [HttpPost]
    public async Task<IActionResult> RegisterUser(RegisterUserDto dto)
    {
        if (ModelState.IsValid)
        {
            if (await _accountService.RegisterUserAsync(dto))
            {
                return Created("User created", null);
            }
            return BadRequest("Username or Email was not accepted");
        }
        return BadRequest("Invalid data!");
    }

    [Route("Login")]
    [HttpPost]
    public async Task<IActionResult> LoginUser(LoginUserDto dto)
    {
        if (ModelState.IsValid)
        {
            var token = await _accountService.LogInAsync(dto);

            if (!string.IsNullOrEmpty(token))
            {
                return Ok(token);
            }
            return BadRequest("Email or Password are not valid");
        }
        return BadRequest("Invalid data");
    }

    [Authorize]
    [Route("LogOut")]
    [HttpPost]
    public async Task<IActionResult> LogOutAsync()
    {
        try
        {
            await _accountService.LogOutAsync();
            return Ok("User is logged out");
        }
        catch (Exception ex)
        {
            return Problem($"{ex.Message}");
        }
    }

    [Authorize]
    [Route("UpdateUsername/{newUsername}")]
    [HttpPut]
    public async Task<IActionResult> UpdateUsername(string newUsername)
    {
        if (ModelState.IsValid)
        {
            var email = HttpContext.User.Identity!.Name;
            if (await _accountService.UpdateUsernameAsync(newUsername, email!))
            {
                return Ok(newUsername);
            }
            return BadRequest("Something went wrong!");
        }
        return BadRequest("Invalid data!");
    }

    [Authorize]
    [Route("ChangeUserPassword")]
    [HttpPut]
    public async Task<IActionResult> ChangeUserPassword(UpdatePasswordDto dto)
    {
        if (ModelState.IsValid)
        {
            var email = HttpContext.User.Identity!.Name;
            if (await _accountService.ChangeUserPasswordAsync(dto.NewPassword, dto.OldPassword, email!))
            {
                return Ok("Password updated");
            }
            return BadRequest("Something went wrong!");
        }
        return BadRequest("Invalid data!");
    }

    [Authorize]
    [Route("DeleteAccount")]
    [HttpDelete]
    public async Task<IActionResult> DeleteAccount()
    {
        if (ModelState.IsValid)
        {
            var email = HttpContext.User.Identity!.Name;
            if (await _accountService.DeleteAccountAsync(email!))
            {
                return Ok("User removed");
            }
            return BadRequest("Something went wrong!");
        }
        return BadRequest("Something went wrong!");
    }
}
