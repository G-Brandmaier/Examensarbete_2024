using Backend_API.Models.Dtos.TMDB;
using Backend_API.Services.ApiTMDB;
using Newtonsoft.Json;

namespace Backend_API.Services;

public class MediaService
{
    private readonly MediaApiService _mediaApiService;
    private readonly ILogger<MediaService> _logger;

    public MediaService(MediaApiService mediaApiService, ILogger<MediaService> logger)
    {
        _mediaApiService = mediaApiService;
        _logger = logger;
    }
    public async Task<SearchDto> SearchAllAsync(string searchValue)
    {
        try
        {
            var json = await _mediaApiService.SearchAllAsync(searchValue);
            if (json != null)
            {
                return JsonConvert.DeserializeObject<SearchDto>(json);
            }
            return null;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            _logger.LogError(ex, $"An error occurred while getting search results for value:{searchValue}");
            return null;
        }
    }

    public async Task<SearchDto> SearchTypeAsync(string type, string searchValue)
    {
        try
        {
            var json = await _mediaApiService.SearchTypeAsync(type, searchValue);
            if (json != null)
            {
                return JsonConvert.DeserializeObject<SearchDto>(json);
            }
            return null;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            _logger.LogError(ex, $"An error occurred while getting search results for value:{searchValue} and type:{type}");
            return null;
        }
    }

    public async Task<MediaTeaserDto> GetMediaTeaserAsync(int id, string type)
    {
        try
        {
            var json = await _mediaApiService.GetMediaTeaserAsync(id, type);
            if (json != null)
            {
                return JsonConvert.DeserializeObject<MediaTeaserDto>(json);
            }
            return null;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            _logger.LogError(ex, $"An error occurred while getting information about id:{id} and type:{type}");
            return null;
        }
    }

    public async Task<ActorDetailsDto> GetActorDetailsAsync(int id)
    {
        try
        {
            var json = await _mediaApiService.GetActorDetailsAsync(id);
            if (json != null)
            {
                return JsonConvert.DeserializeObject<ActorDetailsDto>(json);
            }
            return null;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            _logger.LogError(ex, $"An error occurred while getting information about actor id:{id}");
            return null;
        }
    }
}