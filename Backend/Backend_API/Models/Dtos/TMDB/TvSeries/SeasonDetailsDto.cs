namespace Backend_API.Models.Dtos.TMDB.TvSeries;

public class SeasonDetailsDto
{
    private string ImagePosterPath;

    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string Overview { get; set; } = null!;
    public string Air_Date { get; set; } = null!;
    public string Poster_Path
    {
        get { return ImagePosterPath; }
        set { ImagePosterPath = $"https://image.tmdb.org/t/p/w500{value}"; }
    }
    public int Season_Number { get; set; }
    public decimal Vote_Average { get; set; }
    public List<EpisodeDto> Episodes { get; set; } = null!;
    public AggregateCreditsDto Aggregate_Credits { get; set; } = null!;
    public VideosDto Videos { get; set; } = null!;

    public string MediaType = "season";

}
