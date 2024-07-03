using Backend_API.Models.Dtos;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend_API.Models.Entities;

public class WatchListItemEntity
{
    [Key]
    public int Id { get; set; }
    public int MediaId { get; set; } 
    public string MediaType { get; set; }
    public string Name { get; set; } = null!;
    public string? ImagePath { get; set; }

    public ICollection<UserProfileWatchListItemEntity> UserProfileMovieWatchListItems { get; set; } = new HashSet<UserProfileWatchListItemEntity>();

    public static implicit operator WatchListItemDto(WatchListItemEntity entity)
    {
        return new WatchListItemDto
        {
            MediaId = entity.MediaId,
            MediaType = entity.MediaType,
            Name = entity.Name,
            ImagePath = string.IsNullOrEmpty(entity.ImagePath) ? "" : entity.ImagePath,
        };
    }

}
