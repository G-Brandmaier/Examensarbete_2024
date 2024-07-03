using Backend_API.Helpers.Azure;

namespace Backend_API.Services.ApiTMDB;

public class MediaApiService
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;
    private readonly string _apiUrl;
    private readonly string _token;
    private readonly KeyVaultHelper _keyVaultHelper;

    public MediaApiService(IConfiguration configuration, KeyVaultHelper keyVaultHelper)
    {
        _httpClient = new HttpClient();
        _configuration = configuration;
        _keyVaultHelper = keyVaultHelper;
        _apiUrl = $"{_configuration.GetSection("TmdbApi").GetValue<string>("ApiUrl")!}";
        _token = _keyVaultHelper.GetTmdbApiToken();
    }

    public async Task<string> SearchAllAsync(string searchValue)
    {
        try
        {
            var url = $"{_apiUrl}search/multi?query={searchValue}&include_adult=false";
            return await SendHttpRequest(HttpMethod.Get, url);
        }
        catch (Exception ex)
        {
            _httpClient.Dispose();
            return ex.Message;
        }

    }

    public async Task<string> SearchTypeAsync(string type, string searchValue)
    {
        try
        {
            var url = $"{_apiUrl}search/{type}?query={searchValue}&include_adult=false";
            return await SendHttpRequest(HttpMethod.Get, url);
        }
        catch (Exception ex)
        {
            _httpClient.Dispose();
            return ex.Message;
        }

    }

    public async Task<string> GetMediaTeaserAsync(int id, string type)
    {
        try
        {
            var url = $"{_apiUrl}{type}/{id}?&include_adult=false";
            return await SendHttpRequest(HttpMethod.Get, url);
        }
        catch (Exception ex)
        {
            _httpClient.Dispose();
            return ex.Message;
        }

    }

    public async Task<string> GetActorDetailsAsync(int id)
    {
        try
        {
            var url = $"{_apiUrl}person/{id}?&append_to_response=combined_credits&include_adult=false";
            return await SendHttpRequest(HttpMethod.Get, url);
        }
        catch (Exception ex)
        {
            _httpClient.Dispose();
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
