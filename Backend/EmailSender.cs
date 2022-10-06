using FluentEmail.Core;
using FluentEmail.Core.Models;
using System.Net;

namespace Backend;

internal sealed class EmailSender : IEmailSender
{
    private readonly IFluentEmail _fluentEmail;

    public EmailSender(IFluentEmail fluentEmail)
    {
        ArgumentNullException.ThrowIfNull(fluentEmail);
        _fluentEmail = fluentEmail;
    }

    public Task<SendResponse> SendEmailVerificationAsync(string userId, string email, string code, CancellationToken ct = default)
    {
        ArgumentException.ThrowIfNullOrEmpty(userId);
        ArgumentException.ThrowIfNullOrEmpty(email);
        ArgumentException.ThrowIfNullOrEmpty(code);

        return _fluentEmail
            .To(email)
            .Subject("Wishlist Email Verification")
            .Body($"Click <a href=\"https://localhost:4200/api/account/confirm?userId={WebUtility.UrlEncode(userId)}&token={WebUtility.UrlEncode(code)}\">here</a> to confirm your email on Wishlist.", true)
            .Tag(Guid.NewGuid().ToString())
            .SendAsync(ct);
    }
}
