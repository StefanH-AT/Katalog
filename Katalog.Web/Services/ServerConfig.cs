
namespace Katalog.Web.Services;

/// <summary>
/// Contains the configuration of this server instance
/// </summary>
public class ServerConfig
{
    /// <summary>
    /// Host address of the server.
    /// For development servers, this will be something like <code>https://localhost:5001/</code>
    ///
    /// If you host this server publicly, set this to the domain you're using
    /// </summary>
    public string Host { get; init; }
    
    /// <summary>
    /// Media can be stored in many ways. A full list of providers can be found in <see cref="MediaStorageProvider"/>
    /// In the config, use the enum entry's name (<see cref="MediaStorageProvider.FileSystem"/>, <see cref="MediaStorageProvider.S3"/>...)
    /// </summary>
    public MediaStorageProvider StorageProvider { get; init; }
    
    /// <summary>
    /// For <see cref="MediaStorageProvider.FileSystem" />
    ///
    /// Path to the directory to use for storage.
    ///
    /// Example: <code>/var/katalog/media</code>
    /// </summary>
    public string FileSystemStoragePath { get; init; }
    
    public DatabaseProvider DatabaseProvider { get; init; }
    
    public string DatabaseSqliteConnectionString { get; init; }

    private readonly IConfiguration _config;
    
    public ServerConfig(ILogger<ServerConfig> logger, IConfiguration config)
    {
        _config = config;
        logger.LogInformation("Initializing server configuration");

        Host = LoadString("Host");
        StorageProvider = LoadMediaStorageProvider("Storage:ProviderName");
        FileSystemStoragePath = LoadString("Storage:FileSystem:Path");
        
        DatabaseProvider = LoadDatabaseProvider("Database:ProviderName");
        DatabaseSqliteConnectionString = LoadString("Database:Sqlite:ConnectionString");
    }

    private string LoadString(string path)
    {
        return _config[path] ?? throw new MissingServerConfigException(path);
    }

    private int LoadInt(string path)
    {
        string val = _config[path] ?? throw new MissingServerConfigException(path);
        if (int.TryParse(val, out int result))
            return result;
        throw new MalformedServerConfigException<int>(path, val);
    }
    
    private MediaStorageProvider LoadMediaStorageProvider(string path)
    {
        string val = _config[path] ?? throw new MissingServerConfigException(path);
        if (Enum.TryParse<MediaStorageProvider>(val, out var result))
            return result;
        
        throw new MalformedServerConfigException<MediaStorageProvider>(path, val);
    }
    
    private DatabaseProvider LoadDatabaseProvider(string path)
    {
        string val = _config[path] ?? throw new MissingServerConfigException(path);
        if (Enum.TryParse<DatabaseProvider>(val, out var result))
            return result;
        
        throw new MalformedServerConfigException<DatabaseProvider>(path, val);
    }
    
}

public class MissingServerConfigException : Exception
{
    public MissingServerConfigException(string propertyName)
    {
        Message = $"Failed to read config property '{propertyName}' from config";
    }

    public override string Message { get; }
}

public class MalformedServerConfigException<T> : Exception
{
    public MalformedServerConfigException(string propertyName, string value)
    {
        Message = $"Failed to read config property '{propertyName}' from config. Value '{value}' is not a valid {typeof(T).Name}";
    }

    public override string Message { get; }
}

public enum MediaStorageProvider
{
    FileSystem,
    S3
}

public enum DatabaseProvider
{
    Sqlite
}