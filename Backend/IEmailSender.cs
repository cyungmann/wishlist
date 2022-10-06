using FluentEmail.Core.Models;

namespace Backend;

public interface IEmailSender
{
    Task<SendResponse> SendEmailVerificationAsync(string userId, string email, string code, CancellationToken ct = default);
}
