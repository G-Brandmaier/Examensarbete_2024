using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Backend_API.Models;

public class User
{
    public string Email { get; set; } = null!;

    public string UserName { get; set; } = null!;

    public static implicit operator User(IdentityUser identityUser)
    {
        return new User
        {
            Email = identityUser.Email!,
            UserName = identityUser.UserName!
        };
    }
}
