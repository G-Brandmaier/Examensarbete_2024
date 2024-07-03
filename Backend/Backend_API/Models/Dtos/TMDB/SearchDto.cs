namespace Backend_API.Models.Dtos.TMDB;

public class SearchDto
{
    public int Page {  get; set; }
    public List<SearchItemDto> Results { get; set; }
}
