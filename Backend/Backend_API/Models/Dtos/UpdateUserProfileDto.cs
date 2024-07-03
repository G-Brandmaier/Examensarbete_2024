using Microsoft.AspNetCore.Http.Metadata;
using System.ComponentModel.DataAnnotations;

namespace Backend_API.Models.Dtos;

public class UpdateUserProfileDto
{
    [MaxLength(250)]
    public string? Description { get; set; }

    public string? Icon { get; set; }

    public string? IconColor { get; set; }

    public bool OpenProfile { get; set; }

}
