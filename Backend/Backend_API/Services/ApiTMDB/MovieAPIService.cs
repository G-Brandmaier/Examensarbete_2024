using Azure.Core;
using Backend_API.Helpers.Azure;
using System.Net.Http;

namespace Backend_API.Services.ApiTMDB;

public class MovieApiService
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;
    private readonly string _apiUrl;
    private readonly string _token;
    private readonly KeyVaultHelper _keyVaultHelper;

    public MovieApiService(IConfiguration configuration, KeyVaultHelper keyVaultHelper)
    {
        _httpClient = new HttpClient();
        _configuration = configuration;
        _apiUrl = $"{_configuration.GetSection("TmdbApi").GetValue<string>("ApiUrl")!}";
        _keyVaultHelper = keyVaultHelper;
        _token = _keyVaultHelper.GetTmdbApiToken();
    }

    public async Task<string> GetMovieDetailsAsync(int movieId)
    {
        try
        {
            var url = $"{_apiUrl}movie/{movieId}?&append_to_response=videos,credits&include_adult=false";
            return await SendHttpRequest(HttpMethod.Get, url);
        }
        catch (Exception ex)
        {
            _httpClient.Dispose();
            return ex.Message;
        }
    }

    public async Task<string> GetSimilarMoviesAsync(int page, int movieId)
    {
        try
        {
            var url = $"{_apiUrl}movie/{movieId}/similar?&page={page}&include_adult=false";
            return await SendHttpRequest(HttpMethod.Get, url);
        }
        catch (Exception ex)
        {
            return ex.Message;
        }
    }

    public async Task<string> GetNowPlayingMoviesAsync(int page)
    {
        try
        {
            var url = $"{_apiUrl}movie/now_playing?&page={page}&region=US&include_adult=false";
            return await SendHttpRequest(HttpMethod.Get, url);
        }
        catch (Exception ex)
        {
            return ex.Message;
        }
    }

    public async Task<string> GetUpComingMoviesAsync(int page)
    {
        try
        {
            var minDate = DateTime.Today.ToShortDateString();
            var maxDate = DateTime.Today.AddMonths(3).ToShortDateString();
            var url = $"{_apiUrl}discover/movie?/upcoming?&page={page}&region=US&release_date.gte={minDate}&release_date.lte={maxDate}&with_release_type=2|3&include_adult=false";
            return await SendHttpRequest(HttpMethod.Get, url);
        }
        catch (Exception ex)
        {
            return ex.Message;
        }
    }

    public async Task<string> GetPopularMoviesAsync(int page)
    {
        try
        {
            var url = $"{_apiUrl}discover/movie?/popular?&page={page}&region=US&sort_by=popularity.desc&include_adult=false";
            return await SendHttpRequest(HttpMethod.Get, url);
        }
        catch (Exception ex)
        {
            return ex.Message;
        }
    }

    public async Task<string> GetMovieReviewsAsync(int page, int movieId)
    {
        try
        {
            var url = $"{_apiUrl}movie/{movieId}/reviews?&page={page}";
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
