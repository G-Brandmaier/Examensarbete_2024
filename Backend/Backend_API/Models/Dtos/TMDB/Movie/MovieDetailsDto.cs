using Microsoft.AspNetCore.Mvc.Formatters;

namespace Backend_API.Models.Dtos.TMDB.Movie;

public class MovieDetailsDto
{
    private string ImageBackdropPath;
    private string ImagePosterPath;
    public int Id { get; set; }
    public string Original_Title { get; set; } = null!;
    public string Title { get; set; } = null!;
    public string Original_Language { get; set; } = null!;
    public string Overview { get; set; } = null!;
    public string Backdrop_Path
    {
        get { return ImageBackdropPath; }
        set { ImageBackdropPath = $"https://image.tmdb.org/t/p/w500{value}"; }
    }
    public string Poster_Path
    {
        get { return ImagePosterPath; }
        set { ImagePosterPath = $"https://image.tmdb.org/t/p/w500{value}"; }
    }
    public string Budget { get; set; } = null!;
    public List<GenreDto> Genres { get; set; } = null!;
    public string HomePage { get; set; } = null!;
    public string Release_Date { get; set; } = null!;
    public string Runtime { get; set; } = null!;
    public List<ProductionCompanyDto> Production_Companies { get; set; } = null!;
    public VideosDto Videos { get; set; } = null!;
    public CreditDto Credits { get; set; } = null!;

    public string MediaType = "movie";
    public decimal? Vote_Average { get; set; }
    public decimal? Rating { get; set; }
    public string Director { get; set; } = null!;
}