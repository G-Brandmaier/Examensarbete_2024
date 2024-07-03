using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using Backend_API.Contexts;
using Backend_API.Helpers.Azure;
using Backend_API.Helpers.JWT;
using Backend_API.Repositories;
using Backend_API.Services;
using Backend_API.Services.ApiTMDB;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers().AddNewtonsoftJson(options =>
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

builder.Logging.AddConfiguration(builder.Configuration.GetSection("Logging"));
builder.Services.AddLogging();

var client = new SecretClient(new Uri(builder.Configuration.GetSection("Azure").GetValue<string>("AzureKeyVaultUrl")!), new DefaultAzureCredential());
KeyVaultSecret secretConnectionstring = client.GetSecret("ConnectionstringDb");
KeyVaultSecret secretTokenValidator = client.GetSecret("TokenValidatorSecret");

/*DATABASE AND REPOS*/
builder.Services.AddDbContext<DataContext>(x => x.UseSqlServer(secretConnectionstring.Value));
builder.Services.AddScoped<UserProfileRepo>();
builder.Services.AddScoped<ReviewRepo>();

/*SERVICES AND HELPERS*/
builder.Services.AddScoped<AccountService>();
builder.Services.AddScoped<MovieService>();
builder.Services.AddScoped<MediaService>();
builder.Services.AddScoped<TvSeriesService>();
builder.Services.AddScoped<ReviewService>();
builder.Services.AddScoped<JwtToken>();
builder.Services.AddScoped<UserProfileService>();
builder.Services.AddSingleton<KeyVaultHelper>();

/* API SERVICES*/
builder.Services.AddScoped<MovieApiService>();
builder.Services.AddScoped<MediaApiService>();
builder.Services.AddScoped<TvSeriesApiService>();

/*AUTHENTICATION*/

builder.Services.AddIdentity<IdentityUser, IdentityRole>(x =>
{
    x.Password.RequiredLength = 8;
    x.SignIn.RequireConfirmedAccount = false;
    x.User.RequireUniqueEmail = true;

}).AddEntityFrameworkStores<DataContext>();

builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x =>
{
    x.Events = new JwtBearerEvents
    {
        OnTokenValidated = context =>
        {
            if (string.IsNullOrEmpty(context?.Principal?.FindFirst("id")?.Value) || string.IsNullOrEmpty(context?.Principal?.Identity?.Name))
                context?.Fail("Unauthorized");

            return Task.CompletedTask;
        }
    };

    x.RequireHttpsMetadata = true;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidIssuer = builder.Configuration.GetSection("TokenValidation").GetValue<string>("Issuer")!,
        ValidateAudience = true,
        ValidAudience = builder.Configuration.GetSection("TokenValidation").GetValue<string>("Audience")!,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(secretTokenValidator.Value))
    };
});


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(x => x.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod());
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
