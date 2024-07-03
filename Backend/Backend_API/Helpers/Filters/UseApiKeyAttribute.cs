using Backend_API.Helpers.Azure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Backend_API.Helpers.Filters;

public class UseApiKeyAttribute : Attribute, IAsyncActionFilter
{
    public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        var keyVaultHelper = context.HttpContext.RequestServices.GetRequiredService<KeyVaultHelper>();
        var apiKey = keyVaultHelper.GetApiKey();

        if (!context.HttpContext.Request.Query.TryGetValue("key", out var key))
        {
            context.Result = new UnauthorizedResult();
            return;
        }
        if (!apiKey!.Equals(key))
        {
            context.Result = new UnauthorizedResult();
            return;
        }

        await next();
    }
}
