using Backend_API.Models.Entities;

namespace Backend_API.Models;

public class UserProfile
{
    public string? Description { get; set; }
    public string? Icon { get; set; }
    public string? IconColor { get; set; }
    public bool OpenProfile { get; set; }
    public string MemberSince { get; set; } = null!;


    public static implicit operator UserProfileEntity(UserProfile userProfile)
    {
        return new UserProfileEntity
        {
            Description = userProfile.Description,
            OpenProfile = userProfile.OpenProfile,
            MemberSince = userProfile.MemberSince,
            Icon = userProfile.Icon,
            IconColor = userProfile.IconColor,
        };
    }
}
