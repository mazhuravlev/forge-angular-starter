using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestSharp.Portable;
using RestSharp.Portable.HttpClient;

namespace server.Controllers.Api
{
  [Produces("application/json")]
  [Route("api")]
  public class IndexController : Controller
  {
    public IActionResult Index()
    {
      return Ok(new { Version = "0.1" });
    }

    [HttpGet("token")]
    public async Task<IActionResult> Token()
    {
      using (var client = new RestClient(new Uri("https://developer.api.autodesk.com/authentication/v1/authenticate")))
      {
        const string clientId = __INSERT__ID__;
        const string clienSecret = __INSERT__SECRET__;
        var request = new RestRequest("", Method.POST) { };
        request.AddParameter("client_id", clientId);
        request.AddParameter("client_secret", clienSecret);
        request.AddParameter("grant_type", "client_credentials");
        request.AddParameter("scope", "data:read");
        request.AddHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
        try
        {
          var result = await client.Execute<TokenResponse>(request);
          return Ok(result.Data);
        }
        catch (Exception e)
        {

        }
        return StatusCode(555);
      }
    }

    public class TokenResponse
    {
      public string access_token;
    }
  }
}