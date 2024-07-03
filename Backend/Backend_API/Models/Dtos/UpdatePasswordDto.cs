namespace Backend_API.Models.Dtos;

public class UpdatePasswordDto
{
    public string OldPassword { get; set; } = null!;
    public string NewPassword { get; set;} = null!;
}
