using Backend_API.Models.Entities;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Backend_API.Models.Dtos;

public class RegisterUserDto
{
    [Required]
    [MinLength(4)]
    [MaxLength(16)]
    public string Username { get; set; } = null!;

    [Required]
    [MinLength(6)]
    [RegularExpression(@"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")]
    public string Email { get; set; } = null!;

    [Required]
    [MinLength(8)]
    [RegularExpression(@"^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$")]
    public string Password { get; set; } = null!;


    public static implicit operator IdentityUser(RegisterUserDto dto)
    {
        return new IdentityUser
        {
            Email = dto.Email,
            UserName = dto.Username
        };
    }
}
