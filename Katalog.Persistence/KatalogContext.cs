using Microsoft.EntityFrameworkCore;

namespace Katalog.Persistence;

public class KatalogContext : DbContext
{
    
    public KatalogContext(DbContextOptions<KatalogContext> options) : base(options)
    {
    }

    public DbSet<Katalog.Core.User> Users { get; set; }
    public DbSet<Katalog.Core.Submission> Submissions { get; set; }
    
}