using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Katalog.Web.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class IdentityController : ControllerBase
{

    private UserManager<IdentityUser> _userManager;

    public IdentityController(UserManager<IdentityUser> userManager)
    {
        _userManager = userManager;
    }

    [HttpPost]
    public async Task<IActionResult> Register([FromBody] RegisterRequest registerRequest)
    {
        var user = new IdentityUser()
        {
            UserName = registerRequest.UserName,
            Email = registerRequest.Email
        };
        var result = await _userManager.CreateAsync(user, registerRequest.Password);

        if (!result.Succeeded)
        {
            return BadRequest();
        }

        var principal = new ClaimsPrincipal(new ClaimsIdentity()
        {
            
        });

        SignIn()
    }
    
    [HttpGet]
    public IActionResult Login()
    {
        return Login();
    }
    
}

public record RegisterRequest
{
    public string UserName { get; set; }
    public string Password { get; set; }
    public string Email { get; set; }
}