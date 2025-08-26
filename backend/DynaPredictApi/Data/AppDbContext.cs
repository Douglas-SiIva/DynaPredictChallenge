using Microsoft.EntityFrameworkCore;
using DynaPredictApi.Models;

namespace DynaPredictApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Machine> Machines { get; set; }
    }
}