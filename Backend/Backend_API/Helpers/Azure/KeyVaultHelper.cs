using Azure;
using Azure.Identity;
using Azure.Security.KeyVault.Secrets;

namespace Backend_API.Helpers.Azure;

public class KeyVaultHelper
{
    private readonly SecretClient _client;
    private readonly string _keyVaultUrl;
    private readonly IConfiguration _configuration;
    private IDictionary<string, string> _secrets;
    private readonly ILogger<KeyVaultHelper> _logger;

    public KeyVaultHelper(IConfiguration configuration, ILogger<KeyVaultHelper> logger)
    {
        _configuration = configuration;
        _keyVaultUrl = $"{_configuration.GetSection("Azure").GetValue<string>("AzureKeyVaultUrl")!}";
        _client = new SecretClient(new Uri(_keyVaultUrl), new DefaultAzureCredential());
        _logger = logger;
        _secrets = GetAllSecretsAsync().Result;
    }

    public string GetConnectionStringDataContext()
    {
        try
        {
            return _secrets.Where(x => x.Key == "ConnectionstringDb").SingleOrDefault().Value;
        }
        catch (Exception ex)
        {
            Console.WriteLine("An error occurred while getting all the connectionstring: " + ex.Message);
            _logger.LogError(ex, $"An error occurred while getting all the connectionstring");
            return string.Empty;
        }
    }

    public string GetApiKey()
    {
        try
        {
            return _secrets.Where(x => x.Key == "ApiKey").SingleOrDefault().Value;
        }
        catch (Exception ex)
        {
            Console.WriteLine("An error occurred while getting all the api key: " + ex.Message);
            _logger.LogError(ex, $"An error occurred while getting all the api key");
            return string.Empty;
        }
    }

    public string GetTmdbApiToken()
    {
        try
        {
            return _secrets.Where(x => x.Key == "TmdbToken").SingleOrDefault().Value;

        }
        catch (Exception ex)
        {
            Console.WriteLine("An error occurred while getting all the tmdb api token: " + ex.Message);
            _logger.LogError(ex, $"An error occurred while getting all the tmdb api token");
            return string.Empty;
        }
    }


    public string GetTokenValidatorSecret()
    {
        try
        {
            return _secrets.Where(x => x.Key == "TokenValidatorSecret").SingleOrDefault().Value;
        }
        catch (Exception ex)
        {
            Console.WriteLine("An error occurred while getting the token validator: " + ex.Message);
            _logger.LogError(ex, $"An error occurred while getting the token validator");
            return string.Empty;
        }
    }

    public async Task<IDictionary<string, string>> GetAllSecretsAsync()
    {
        try
        {
            AsyncPageable<SecretProperties> allSecrets = _client.GetPropertiesOfSecretsAsync();
            IDictionary<string, string> secrets = new Dictionary<string, string>();
            await foreach (SecretProperties secretProperties in allSecrets)
            {
                KeyVaultSecret secret = await _client.GetSecretAsync(secretProperties.Name);
                secrets.Add(secretProperties.Name, secret.Value);
            }
            return secrets;
        }
        catch (Exception ex)
        {
            Console.WriteLine("An error occurred while getting all the azure keyvault secrets: " + ex.Message);
            _logger.LogError(ex, $"An error occurred while getting all the azure keyvault secrets");
            return null;
        }
    }
}
