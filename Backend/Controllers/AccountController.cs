using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[Route("[controller]")]
[ApiController]
[Authorize]
public class AccountController : ControllerBase
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly SignInManager<IdentityUser> _signInManager;

    public AccountController(
        UserManager<IdentityUser> userManager,
        SignInManager<IdentityUser> signInManager)
    {
        ArgumentNullException.ThrowIfNull(userManager);
        ArgumentNullException.ThrowIfNull(signInManager);

        _userManager = userManager;
        _signInManager = signInManager;
    }

    [HttpPost]
    [AllowAnonymous]
    public async Task<IActionResult> Register(RegisterViewModel registerViewModel)
    {
        ArgumentNullException.ThrowIfNull(registerViewModel);

        var result = await _userManager.CreateAsync(new()
        {
            UserName = registerViewModel.Email,
            Email = registerViewModel.Email,
        }, registerViewModel.Password);

        if (!result.Succeeded)
        {
            return BadRequest(result);
        }

        return Ok();
    }
}
