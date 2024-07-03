namespace Backend_API.Models.Dtos.TMDB;

public class ProductionCompanyDto
{
    private string ImagePath;
    public string Logo_Path
    {
        get { return ImagePath; }
        set { ImagePath = $"https://image.tmdb.org/t/p/w500{value}"; }
    }
    public string Name { get; set; }
    public string Origin_Country { get; set; }
}