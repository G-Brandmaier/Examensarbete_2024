using Backend_API.Models.Dtos.TMDB.TvSeries;
using Backend_API.Services.ApiTMDB;
using Newtonsoft.Json;

namespace Backend_API.Services;

public class TvSeriesService
{
    private readonly TvSeriesApiService _tvSeriesApiService;
    private readonly ReviewService _reviewService;
    private ILogger<TvSeriesApiService> _logger;

    public TvSeriesService(TvSeriesApiService tvSeriesApiService, ReviewService reviewService, ILogger<TvSeriesApiService> logger)
    {
        _tvSeriesApiService = tvSeriesApiService;
        _reviewService = reviewService;
        _logger = logger;
    }

    public async Task<TvSeriesDetailsDto> GetTvSeriesDetailsAsync(int tvSeriesId)
    {
        try
        {
            var json = await _tvSeriesApiService.GetTvSeriesDetailsAsync(tvSeriesId);
            if (json != null)
            {
                var tvSeriesDetails = JsonConvert.DeserializeObject<TvSeriesDetailsDto>(json);
                var ratingEntity = await _reviewService.GetRatingAsync(tvSeriesId, tvSeriesDetails.MediaType);
                if (ratingEntity != null)
                    tvSeriesDetails.Rating = ratingEntity.Average;
                return tvSeriesDetails;
            }
            return null;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            _logger.LogError(ex, $"An error occurred while getting tv-series details, id:{tvSeriesId}");
            return null;
        }
    }

    public async Task<SeasonDetailsDto> GetTvSeriesSeasonDetailsAsync(int tvSeriesId, int season)
    {
        try
        {
            var json = await _tvSeriesApiService.GetTvSeriesSeasonDetailsAsync(tvSeriesId, season);
            if (json != null)
            {
                return JsonConvert.DeserializeObject<SeasonDetailsDto>(json);
            }
            return null;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            _logger.LogError(ex, $"An error occurred while getting tv-series season details, id:{tvSeriesId} season:{season}");
            return null;
        }
    }
    

    public async Task<TvSeriesTeasersDto> GetSimilarTvSeriesAsync(int page, int tvSeriesId)
    {
        try
        {
            var json = await _tvSeriesApiService.GetSimilarTvSeriesAsync(page, tvSeriesId);
            if (json != null)
            {
                return JsonConvert.DeserializeObject<TvSeriesTeasersDto>(json);
            }
            return null;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            _logger.LogError(ex, $"An error occurred while getting similar tv-series, id:{tvSeriesId} page:{page}");

            return null;
        }
    }

    public async Task<TvSeriesTeasersDto> GetTvSeriesOnTheAirAsync(int page)
    {
        try
        {
            var json = await _tvSeriesApiService.GetTvSeriesOnTheAirAsync(page);
            if (json != null)
            {
                return JsonConvert.DeserializeObject<TvSeriesTeasersDto>(json);
            }
            return null;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            _logger.LogError(ex, $"An error occurred while getting on the air tv-series, page:{page}");
            return null;
        }
    }

    public async Task<TvSeriesTeasersDto> GetTopRatedTvSeriesAsync(int page)
    {
        try
        {
            var json = await _tvSeriesApiService.GetTopRatedTvSeriesAsync(page);
            if (json != null)
            {
                return JsonConvert.DeserializeObject<TvSeriesTeasersDto>(json);
            }
            return null;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            _logger.LogError(ex, $"An error occurred while getting top rated tv-series, page:{page}");
            return null;
        }
    }

    public async Task<TvSeriesTeasersDto> GetPopularTvSeriesAsync(int page)
    {
        try
        {
            var json = await _tvSeriesApiService.GetPopularTvSeriesAsync(page);
            if (json != null)
            {
                return JsonConvert.DeserializeObject<TvSeriesTeasersDto>(json);
            }
            return null;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            _logger.LogError(ex, $"An error occurred while getting popular tv-series, page:{page}");
            return null;
        }
    }
}
