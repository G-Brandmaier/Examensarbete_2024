namespace Backend_API.Models.Dtos.TMDB;

public class CreditDto
{
    public List<ActorDto> Cast { get; set; }

    public List<CrewDto> Crew { get; set; }
}
