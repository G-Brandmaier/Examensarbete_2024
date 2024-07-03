namespace Backend_API.Models.Dtos.TMDB.TvSeries;

public class TvSeriesDetailsDto
{
    private string ImagePosterPath;
    private string ImageBackdropPath;

    public int Id { get; set; }

    public string Name { get; set; }

    public List<int> Episode_Run_Time { get; set; }

    public List<GenreDto> Genres { get; set; }

    public string HomePage {  get; set; }

    public string Last_Air_Date { get; set; }

    public string Overview {  get; set; }

    public string First_Air_Date { get; set; }

    public string Poster_Path
    {
        get { return ImagePosterPath; }
        set { ImagePosterPath = $"https://image.tmdb.org/t/p/w500{value}"; }
    }
    public string Backdrop_Path
    {
        get { return ImageBackdropPath; }
        set { ImageBackdropPath = $"https://image.tmdb.org/t/p/w500{value}"; }
    }

    public List<CreatorDto> Created_By { get; set; }

    public VideosDto Videos { get; set; } = null!;

    public List<ProductionCompanyDto> Production_Companies { get; set; }

    public List<SeasonDto> Seasons { get; set; }

    public string Status { get; set; }

    public bool In_Production { get; set; }

    public int Number_Of_Episodes { get; set; }

    public int Number_Of_Seasons { get; set; }

    public AggregateCreditsDto Aggregate_Credits { get; set; } = null!;

    public List<NetworkDto> Networks { get; set; }

    public decimal? Vote_Average { get; set; }

    public decimal? Rating { get; set; }


    public string MediaType = "tv";
}
