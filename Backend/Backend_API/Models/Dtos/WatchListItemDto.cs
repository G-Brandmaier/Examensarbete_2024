using Backend_API.Models.Entities;

namespace Backend_API.Models.Dtos;

public class WatchListItemDto
{
    public int MediaId { get; set; }
    public string MediaType { get; set; }
    public string Name { get; set; } = null!;
    public string? ImagePath { get; set; }

    public static implicit operator WatchListItemEntity(WatchListItemDto dto)
    {
        return new WatchListItemEntity
        {
            MediaId = dto.MediaId,
            MediaType = dto.MediaType,
            Name = dto.Name,
            ImagePath = string.IsNullOrEmpty(dto.ImagePath) ? "" : dto.ImagePath,
        };
    }
}
