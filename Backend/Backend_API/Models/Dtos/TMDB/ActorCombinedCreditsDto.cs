namespace Backend_API.Models.Dtos.TMDB;

public class ActorCombinedCreditsDto
{
    private string PosterImagePath; 
    private string ImageBackdropPath;

    public int Id { get; set; }
    public string Media_Type { get; set; }
    public string Name { get; set; }
    public string Title { get; set; }
    public string? Overview { get; set;  }
    public string Poster_Path
    {
        get { return PosterImagePath; }
        set { PosterImagePath = $"https://image.tmdb.org/t/p/w500{value}"; }
    }
    public string Backdrop_Path
    {
        get { return ImageBackdropPath; }
        set { ImageBackdropPath = $"https://image.tmdb.org/t/p/w500{value}"; }
    }
    public string Release_Date { get; set; }
    public string First_Air_Date { get; set; }
}
