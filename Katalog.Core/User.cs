namespace Katalog.Core;

public record User
{
    public Guid InternalId { get; init; }
    public string DisplayName { get; init; }
    public DateTime CreatedAt { get; init; }
    public string Email { get; init; }
    public string PasswordHash { get; init; }
    public string PasswordSalt { get; init; }
}