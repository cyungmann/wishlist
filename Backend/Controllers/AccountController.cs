using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public sealed class AccountController : ControllerBase
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly SignInManager<IdentityUser> _signInManager;
    private readonly IEmailSender _emailSender;

    public AccountController(
        UserManager<IdentityUser> userManager,
        SignInManager<IdentityUser> signInManager,
        IEmailSender emailSender)
    {
        ArgumentNullException.ThrowIfNull(userManager);
        ArgumentNullException.ThrowIfNull(signInManager);
        ArgumentNullException.ThrowIfNull(emailSender);

        _userManager = userManager;
        _signInManager = signInManager;
        _emailSender = emailSender; 
    }

    [HttpPost("Register")]
    [AllowAnonymous]
    public async Task<IActionResult> Register(RegisterViewModel registerViewModel)
    {
        ArgumentNullException.ThrowIfNull(registerViewModel);

        var user = new IdentityUser
        {
            UserName = registerViewModel.Email,
            Email = registerViewModel.Email,
        };
        var result = await _userManager.CreateAsync(user, registerViewModel.Password);

        if (!result.Succeeded)
        {
            return BadRequest(result);
        }

        var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);

        var sendResponse = await _emailSender.SendEmailVerificationAsync(user.Id, registerViewModel.Email, code);

        if (!sendResponse.Successful)
        {
            await _userManager.DeleteAsync(user);
            return Problem("Error encountered sending email confirmation.");
        }

        return Ok();
    }

    [HttpGet("Confirm")]
    [AllowAnonymous]
    public async Task<IActionResult> Confirm([FromQuery] string userId, [FromQuery] string token)
    {
        ArgumentException.ThrowIfNullOrEmpty(userId);
        ArgumentException.ThrowIfNullOrEmpty(token);

        var user = await _userManager.FindByIdAsync(userId);

        if (user is null)
            return BadRequest("User does not exist");

        var result = await _userManager.ConfirmEmailAsync(user, token);

        if (!result.Succeeded)
            return BadRequest(result);

        return Ok();
    }
}
