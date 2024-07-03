using Backend_API.Helpers.Azure;

namespace Backend_API.Services.ApiTMDB;

public class TvSeriesApiService
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;
    private readonly string _apiUrl;
    private readonly string _token;
    private readonly KeyVaultHelper _keyVaultHelper;

    public TvSeriesApiService(IConfiguration configuration, KeyVaultHelper keyVaultHelper)
    {
        _httpClient = new HttpClient();
        _configuration = configuration;
        _apiUrl = $"{_configuration.GetSection("TmdbApi").GetValue<string>("ApiUrl")!}";
        _keyVaultHelper = keyVaultHelper;
        _token = _keyVaultHelper.GetTmdbApiToken();
    }

    public async Task<string> GetTvSeriesDetailsAsync(int tvSeriesId)
    {
        try
        {
            var url = $"{_apiUrl}tv/{tvSeriesId}?&append_to_response=videos,aggregate_credits&include_adult=false";
            return await SendHttpRequest(HttpMethod.Get, url);
        }
        catch (Exception ex)
        {
            _httpClient.Dispose();
            return ex.Message;
        }
    }

    public async Task<string> GetTvSeriesSeasonDetailsAsync(int tvSeriesId, int season)
    {
        try
        {
            var url = $"{_apiUrl}tv/{tvSeriesId}/season/{season}?&append_to_response=videos,aggregate_credits&include_adult=false";
            return await SendHttpRequest(HttpMethod.Get, url);
        }
        catch (Exception ex)
        {
            _httpClient.Dispose();
            return ex.Message;
        }
    }
   
    public async Task<string> GetSimilarTvSeriesAsync(int page, int tvSeriesId)
    {
        try
        {
            var url = $"{_apiUrl}tv/{tvSeriesId}/similar?&page={page}&include_adult=false";
            return await SendHttpRequest(HttpMethod.Get, url);
        }
        catch (Exception ex)
        {
            return ex.Message;
        }
    }

    public async Task<string> GetTvSeriesOnTheAirAsync(int page)
    {
        try
        {
            var minDate = DateTime.Today.ToShortDateString();
            var maxDate = DateTime.Today.AddDays(7).ToShortDateString();
            var url = $"{_apiUrl}tv/on_the_air?include_adult=false?&page={page}&region=US";
            return await SendHttpRequest(HttpMethod.Get, url);
        }
        catch (Exception ex)
        {
            return ex.Message;
        }
    }

    public async Task<string> GetTopRatedTvSeriesAsync(int page)
    {
        try
        {
            var url = $"{_apiUrl}tv/top_rated?&page={page}&include_adult=false&region=US";
            return await SendHttpRequest(HttpMethod.Get, url);
        }
        catch (Exception ex)
        {
            return ex.Message;
        }
    }

    public async Task<string> GetPopularTvSeriesAsync(int page)
    {      try
        {
            var url = $"{_apiUrl}tv/popular?&page={page}&include_adult=false&region=US";
            return await SendHttpRequest(HttpMethod.Get, url);
        }
        catch (Exception ex)
        {
            return ex.Message;
        }
    }

    private async Task<string> SendHttpRequest(HttpMethod httpMethod, string url)
    {
        try
        {
            var request = new HttpRequestMessage(httpMethod, url);
            request.Headers.Add("accept", "application/json");
            request.Headers.Add("Authorization", $"Bearer {_token}");
            HttpResponseMessage response = await _httpClient.SendAsync(request);

            if (response.IsSuccessStatusCode)
            {
                var responseBody = await response.Content.ReadAsStringAsync();
                _httpClient.Dispose();
                return responseBody;
            }
            else
                return string.Empty;
        }
        catch (Exception ex)
        {
            _httpClient.Dispose();
            return ex.Message;
        }
    }
}
