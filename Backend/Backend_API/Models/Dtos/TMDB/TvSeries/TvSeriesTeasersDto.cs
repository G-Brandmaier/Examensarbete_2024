namespace Backend_API.Models.Dtos.TMDB.TvSeries;

public class TvSeriesTeasersDto
{
    public int Page { get; set; }
    public int Total_Pages { get; set; }
    public List<TvSeriesTeaserDto> Results { get; set; }
}
