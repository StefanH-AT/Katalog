using Katalog.Web.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Katalog.Web.Controllers;

// GET is handled via static files
[ApiController]
[Route("/media")]
public class LocalMediaStorageController : ControllerBase
{

    private IMediaStorage _storageService;

    public LocalMediaStorageController(IMediaStorage mediaStorage, ServerConfig serverConfig)
    {
        _storageService = mediaStorage;
    }

    [HttpPost]
    [Authorize]
    public IActionResult UploadMedia(List<IFormFile> files)
    {
        if(files.Count == 0)
            return BadRequest("No files provided");

        if (files.Count > 1)
            return BadRequest("Only singular files can be uploaded");

        // TODO: Implement media upload
        return Ok();
    }
}