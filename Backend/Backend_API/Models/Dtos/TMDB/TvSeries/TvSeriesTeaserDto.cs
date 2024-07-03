namespace Backend_API.Models.Dtos.TMDB.TvSeries;

public class TvSeriesTeaserDto
{
    private string ImagePosterPath;
    public int Id { get; set; }
    public string Name { get; set; }
    public string Poster_Path
    {
        get { return ImagePosterPath; }
        set { ImagePosterPath = $"https://image.tmdb.org/t/p/w500{value}"; }
    }
}
