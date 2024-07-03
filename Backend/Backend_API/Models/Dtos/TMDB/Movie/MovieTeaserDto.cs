namespace Backend_API.Models.Dtos.TMDB.Movie;

public class MovieTeaserDto
{
    private string ImagePosterPath;
    public int Id { get; set; }
    public string Title { get; set; }
    public string Poster_Path
    {
        get { return ImagePosterPath; }
        set { ImagePosterPath = $"https://image.tmdb.org/t/p/w500{value}"; }
    }
    public string Release_Date { get; set; }
}
