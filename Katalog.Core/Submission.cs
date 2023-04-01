namespace Katalog.Core;

public record Submission
{
    public Guid InternalId { get; init; }
    public User Submitter { get; init; }
    public IMedia Media { get; init; }
    
}