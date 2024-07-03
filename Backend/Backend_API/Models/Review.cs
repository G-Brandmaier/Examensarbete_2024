namespace Backend_API.Models;

public class Review
{
    public int Id { get; set; }

    public string Title { get; set; } = null!;

    public int Rating { get; set; }

    public string Description { get; set; } = null!;

    public int MediaId { get; set; }

    public string MediaType { get; set; } = null!;

    public string MediaName { get; set; } = null!;

    public string CreatedAt { get; set; } = null!;

    public string UpdatedAt { get; set; } = null!;

    public string IdentityUserId { get; set; } = null!;

    public string Author {  get; set; } = null!;
}
