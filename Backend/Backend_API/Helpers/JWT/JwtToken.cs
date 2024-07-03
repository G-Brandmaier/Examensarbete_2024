using Backend_API.Helpers.Azure;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Backend_API.Helpers.JWT;

public class JwtToken
{
    private readonly IConfiguration _configuration;
    private readonly KeyVaultHelper _keyVaultHelper;
    private readonly string _tokenValidatorSecret;

    public JwtToken(IConfiguration configuration, KeyVaultHelper keyVaultHelper)
    {
        _configuration = configuration;
        _keyVaultHelper = keyVaultHelper;
        _tokenValidatorSecret = _keyVaultHelper.GetTokenValidatorSecret();
    }

    public string GenerateToken(ClaimsIdentity claimsIdentity, DateTime expiresAt)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var securityTokenDescriptor = new SecurityTokenDescriptor
        {
            Issuer = _configuration.GetSection("TokenValidation").GetValue<string>("Issuer")!,
            Audience = _configuration.GetSection("TokenValidation").GetValue<string>("Audience")!,
            Subject = claimsIdentity,
            Expires = expiresAt,
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(_tokenValidatorSecret)),
                SecurityAlgorithms.HmacSha512Signature)
        };
        return tokenHandler.WriteToken(tokenHandler.CreateToken(securityTokenDescriptor));
    }
}
