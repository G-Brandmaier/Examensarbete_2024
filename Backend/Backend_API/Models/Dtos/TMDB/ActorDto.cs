namespace Backend_API.Models.Dtos.TMDB;

public class ActorDto
{
    private string ImagePath;
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string Profile_Path
    {
        get { return ImagePath; }
        set { ImagePath = $"https://image.tmdb.org/t/p/w500{value}"; }
    }
    public string Character { get; set; } = null!;
}
