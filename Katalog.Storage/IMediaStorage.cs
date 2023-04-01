using Katalog.Core;

namespace Katalog.Storage;

public interface IMediaStorage
{
    public string GetMediaUrl(Guid submissionPublicId);
    public Task UploadMedia(Submission submission);
}