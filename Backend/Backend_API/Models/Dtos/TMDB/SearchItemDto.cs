namespace Backend_API.Models.Dtos.TMDB;

public class SearchItemDto
{
    private string ProfileImagePath;
    private string PosterImagePath;

    public int Id { get; set; }
    public string Media_Type { get; set; }
    public string Name { get; set; }
    public string Title { get; set; }
    public string Poster_Path
    {
        get { return PosterImagePath; }
        set { PosterImagePath = $"https://image.tmdb.org/t/p/w500{value}"; }
    }
    public string Profile_Path
    {
        get { return ProfileImagePath; }
        set { ProfileImagePath = $"https://image.tmdb.org/t/p/w500{value}"; }
    }
    public string Release_Date { get; set; }

    public string First_Air_Date { get; set; }
}
