using Katalog.Core;
using Katalog.Storage;

namespace Katalog.Web.Services;

/// <summary>
/// Stores media on the local file system and exposes it with an endpoint,
/// which has to be registered in startup using the helper method
/// </summary>
public class LocalMediaStorageService : IMediaStorage
{

    private readonly ServerConfig _serverConfig;

    public LocalMediaStorageService(ServerConfig serverConfig)
    {
        _serverConfig = serverConfig;
    }
    
    public string GetMediaUrl(Guid submissionPublicId)
    {
        return $"{_serverConfig.Host}/media/${submissionPublicId}";
    }

    public Task UploadMedia(Submission submission)
    {
        throw new NotImplementedException();
    }
}