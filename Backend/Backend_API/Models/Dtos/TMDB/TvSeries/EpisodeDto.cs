namespace Backend_API.Models.Dtos.TMDB.TvSeries;

public class EpisodeDto
{
    private string StillPath;

    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string Overview { get; set; } = null!;
    public int Episode_Number { get; set; }
    public string Still_Path
    {
        get { return StillPath; }
        set { StillPath = $"https://image.tmdb.org/t/p/w500{value}"; }
    }
    public decimal Vote_Average { get; set; }
    public string Air_Date { get; set; } = null!;
}
