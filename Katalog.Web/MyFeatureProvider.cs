using System.Reflection;
using Katalog.Web.Services;
using Microsoft.AspNetCore.Mvc.Controllers;

namespace Katalog.Web;

public class MyFeatureProvider : ControllerFeatureProvider
{

    private readonly ServerConfig _serverConfig;

    public MyFeatureProvider(ServerConfig serverConfig)
    {
        _serverConfig = serverConfig;
    }
    
    protected override bool IsController(TypeInfo typeInfo)
    {
        if (_serverConfig.StorageProvider == MediaStorageProvider.FileSystem && 
            typeInfo.IsEquivalentTo(typeof(LocalMediaStorageService)))
        {
            return false;
        }

        return true;
    }
}