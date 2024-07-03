using Backend_API.Models.Entities;

namespace Backend_API.Models.Dtos;

public class ReviewDto
{
    public string Title { get; set; } = null!;

    public int Rating { get; set; }

    public string Description { get; set; } = null!;

    public int MediaId { get; set; }

    public string MediaType { get; set; } = null!;

    public string MediaName { get; set; } = null!;


    public static implicit operator ReviewEntity(ReviewDto dto)
    {
        return new ReviewEntity
        {
            MediaType = dto.MediaType,
            Title = dto.Title,
            MediaId = dto.MediaId,
            Description = string.IsNullOrEmpty(dto.Description) ? "" : dto.Description,
            Rating = dto.Rating,
            MediaName = dto.MediaName,
        };
    }
}
