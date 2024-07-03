using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend_API.Models.Entities;

public class UserProfileEntity
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.None)]
    public string Id { get; set; } = null!;

    [MaxLength(250)]
    public string? Description { get; set; }

    public string? Icon { get; set; }

    public string? IconColor { get; set; }

    public bool OpenProfile { get; set; } = false;

    public string MemberSince { get; set; } = null!;

    public ICollection<UserProfileWatchListItemEntity> MovieWatchList = new HashSet<UserProfileWatchListItemEntity>();

    public static implicit operator UserProfile(UserProfileEntity entity)
    {
        return new UserProfile
        {
            Description = entity.Description,
            OpenProfile = entity.OpenProfile,
            MemberSince = entity.MemberSince,
            Icon = entity.Icon,
            IconColor = entity.IconColor,
        };
    }
}
