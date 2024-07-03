namespace Backend_API.Models.Dtos.TMDB.TvSeries;

public class AggregateCrewDto
{
    public string Name { get; set; } = null!;
    public string Department { get; set; } = null!;
    public List<JobDto> Jobs { get; set; } = null!;
}
