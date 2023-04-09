
global using Katalog.Core;
using Katalog.Persistence;
using Katalog.Storage;
using Katalog.Web.Services;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.FileProviders.Physical;

var builder = WebApplication.CreateBuilder(args);

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
builder.Services.AddDbContext<KatalogContext>(options =>
{
    if (config.DatabaseProvider == DatabaseProvider.Sqlite)
    {
        options.UseSqlite(config.DatabaseSqliteConnectionString);
    }
});
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
builder.Services.AddIdentity<IdentityUser, IdentityRole>(options =>
{
    options.SignIn.RequireConfirmedAccount = true;
    options.Password.RequiredLength = 18;
    options.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._";
    options.User.RequireUniqueEmail = true;
}).AddRoles<IdentityRole>().AddEntityFrameworkStores<KatalogContext>();


builder.Services.AddSingleton<IMediaStorage, LocalMediaStorageService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseStaticFiles();
if (config.StorageProvider == MediaStorageProvider.FileSystem)
{
    app.UseStaticFiles(new StaticFileOptions()
    {
        FileProvider = new PhysicalFileProvider(config.FileSystemStoragePath, ExclusionFilters.DotPrefixed),
        RequestPath = "/media"
    });
}

app.UseRouting();

app.MapControllers();
app.MapBlazorHub();
app.MapFallbackToPage("/_Host");

app.Run();
