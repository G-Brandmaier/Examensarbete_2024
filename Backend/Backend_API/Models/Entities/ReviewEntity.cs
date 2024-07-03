using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend_API.Models.Entities;

public class ReviewEntity
{ 
    public int Id { get; set; }

    public string Title { get; set; } = null!;

    [Required]
    public int Rating { get; set; }

    [MaxLength(2000)]
    public string Description { get; set; } = null!;

    public int MediaId { get; set; }

    public string MediaType { get; set; } = null!;

    public string MediaName { get; set; } = null!;

    public string Created_At { get; set; } = null!;

    public string? Updated_At { get; set; }

    [ForeignKey("IdentityUserId")]
    public string IdentityUserId { get; set; } = null!;

    public IdentityUser IdentityUser { get; set; } = null!;

    public static implicit operator Review(ReviewEntity entity)
    {
        return new Review
        {
            Id = entity.Id,
            MediaType = entity.MediaType,
            Title = entity.Title,
            MediaId = entity.MediaId,
            Description = string.IsNullOrEmpty(entity.Description) ? "" : entity.Description,
            Rating = entity.Rating,
            CreatedAt = entity.Created_At,
            UpdatedAt = string.IsNullOrEmpty(entity.Updated_At) ? "" : entity.Updated_At,
            IdentityUserId = entity.IdentityUserId,
            Author = entity.IdentityUser.UserName,
            MediaName = entity.MediaName,
        };
    }
}
