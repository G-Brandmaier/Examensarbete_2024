namespace Backend_API.Models.Dtos.TMDB.TvSeries;

public class NetworkDto
{
    private string LogoPath;
    public int Id { get; set; } 

    public string Name { get; set; }

    public string Origin_Country { get; set; }

    public string Logo_Path
    {
        get { return LogoPath; }
        set { LogoPath = $"https://image.tmdb.org/t/p/w500{value}"; }
    }
}