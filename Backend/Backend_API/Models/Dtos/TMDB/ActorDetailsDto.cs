namespace Backend_API.Models.Dtos.TMDB;

public class ActorDetailsDto
{
    private string ImagePath;

    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public List<string>? Also_Known_As {  get; set; } 
    public string? Biography { get; set; }
    public string? BirthDay { get; set; }
    public string? DeathDay { get; set; }
    public string? Place_Of_Birth { get; set; }
    public string Profile_Path
    {
        get { return ImagePath; }
        set { ImagePath = $"https://image.tmdb.org/t/p/w500{value}"; }
    }
    public ActorCombinedCastingDto? Combined_Credits { get; set; }
}
