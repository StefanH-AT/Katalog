using Microsoft.AspNetCore.Identity;

namespace Katalog.Web.Model;

public record Submission
{
    public Guid InternalId { get; init; }
    public IdentityUser Submitter { get; init; }
    public IMedia Media { get; init; }
    
}