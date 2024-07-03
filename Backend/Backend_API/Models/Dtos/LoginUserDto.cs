using Backend_API.Models.Entities;
using System.ComponentModel.DataAnnotations;

namespace Backend_API.Models.Dtos;

public class LoginUserDto
{
    [Required]
    [MinLength(6)]
    [RegularExpression(@"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")]
    public string Email { get; set; } = null!;

    [Required]
    [MinLength(8)]
    [RegularExpression(@"^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$")]
    public string Password { get; set; } = null!;

    public bool RememberMe { get; set; } = false;

}
