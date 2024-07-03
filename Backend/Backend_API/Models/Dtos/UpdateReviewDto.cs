using Backend_API.Models.Entities;

namespace Backend_API.Models.Dtos;

public class UpdateReviewDto
{
    public int Id { get; set; }

    public string Title { get; set; } = null!;

    public int Rating { get; set; }

    public string Description { get; set; } = null!;

    public static implicit operator ReviewEntity(UpdateReviewDto dto)
    {
        return new ReviewEntity
        {
            Id = dto.Id,
            Title = dto.Title,
            Description = string.IsNullOrEmpty(dto.Description) ? "" : dto.Description,
            Rating = dto.Rating,
        };
    }
}
