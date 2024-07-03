using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Backend_API.Models.Entities;

[PrimaryKey(nameof(UserProfileId), nameof(WatchListItemId))]
public class UserProfileWatchListItemEntity
{
    [Required]
    public string UserProfileId { get; set; } = null!;

    public UserProfileEntity UserProfile { get; set; } = null!;

    [Required]
    public int WatchListItemId { get; set; }
    public WatchListItemEntity WatchListItem { get; set; } = null!;
}