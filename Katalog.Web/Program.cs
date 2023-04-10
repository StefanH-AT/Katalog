
using Katalog.Web.Areas.Identity.Data;
using Katalog.Web.Services;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.FileProviders.Physical;

Console.WriteLine("Starting Katalog");

var builder = WebApplication.CreateBuilder(args);

if (OperatingSystem.IsWindows())
{
    builder.Configuration.AddJsonFile("appsettings.Windows.json", optional: true);
    if (builder.Environment.IsDevelopment())
        builder.Configuration.AddJsonFile("appsettings.Windows.Development.json", optional: true);
}
if (OperatingSystem.IsLinux())
{
    builder.Configuration.AddJsonFile("appsettings.Linux.json", optional: true);
    if (builder.Environment.IsDevelopment())
        builder.Configuration.AddJsonFile("appsettings.Linux.Development.json", optional: true);
}

builder.Services.AddLogging(loggingBuilder =>
{
    loggingBuilder.ClearProviders();
    loggingBuilder.AddConsole();
});
builder.Services.AddTransient<ServerConfig>();
var config = builder.Services.BuildServiceProvider().GetService<ServerConfig>();
if (config is null)
{
    Console.WriteLine("Failed to load server configuration");
    return;
}

builder.Services.AddRazorPages();
builder.Services.AddServerSideBlazor();
builder.Services.AddDbContext<WebContext>(options =>
{
    if (config.DatabaseProvider == DatabaseProvider.Sqlite)
    {
        Console.WriteLine("Using SQLite database located at " + config.DatabaseSqliteConnectionString);
        options.UseSqlite(config.DatabaseSqliteConnectionString);
    }
});

builder.Services.AddDefaultIdentity<WebUser>(options =>
{
    options.SignIn.RequireConfirmedAccount = true;
    options.Password.RequiredLength = 18;
    options.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._";
    options.User.RequireUniqueEmail = true;
}).AddRoles<IdentityRole>().AddEntityFrameworkStores<WebContext>();
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.Cookie.HttpOnly = true;
        options.Cookie.IsEssential = true;
        options.ExpireTimeSpan = TimeSpan.FromDays(14);
        options.LoginPath = "/identity/login";
        options.LogoutPath = "/identity/logout";
        options.AccessDeniedPath = "/auth/accessdenied";
    });


builder.Services.AddSingleton<IMediaStorage, LocalMediaStorageService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseStaticFiles();
if (config.StorageProvider == MediaStorageProvider.FileSystem)
{
    app.UseStaticFiles(new StaticFileOptions()
    {
        FileProvider = new PhysicalFileProvider(Path.GetFullPath(config.FileSystemStoragePath), ExclusionFilters.DotPrefixed),
        RequestPath = "/media"
    });
}

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapRazorPages();
app.MapBlazorHub();
app.MapFallbackToPage("/_Host");

app.Run();
