namespace Backend_API.Models.Dtos.TMDB.TvSeries;

public class AggregateCreditsDto
{
    public List<AggregateActorDto> Cast { get; set; } = null!;

    public List<AggregateCrewDto> Crew { get; set; } = null!;
}
