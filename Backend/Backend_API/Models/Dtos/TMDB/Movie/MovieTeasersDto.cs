namespace Backend_API.Models.Dtos.TMDB.Movie;

public class MovieTeasersDto
{
    public int Page { get; set; }
    public int Total_Pages { get; set; }
    public List<MovieTeaserDto> Results { get; set; }
}
