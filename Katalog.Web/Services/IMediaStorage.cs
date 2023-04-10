using Katalog.Web.Model;

namespace Katalog.Web.Services;

public interface IMediaStorage
{
    public string GetMediaUrl(Guid submissionPublicId);
    public Task UploadMedia(Submission submission);
}