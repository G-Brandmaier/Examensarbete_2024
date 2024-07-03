namespace Backend_API.Models.Dtos.TMDB.TvSeries;

public class AggregateActorDto
{
    private string ImagePath;
    public int Id { get; set; }
    public string Name { get; set; }
    public string Profile_Path
    {
        get { return ImagePath; }
        set { ImagePath = $"https://image.tmdb.org/t/p/w500{value}"; }
    }
    public List<RoleDto> Roles { get; set; }
}
