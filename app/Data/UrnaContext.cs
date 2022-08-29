using app.Models;
using Microsoft.EntityFrameworkCore;

namespace app.Data
{
    public class UrnaContext : DbContext
    {
        public UrnaContext(DbContextOptions<UrnaContext> options) : base(options)
        {
        }

        public DbSet<Candidate> Candidates { get; set; }
        public DbSet<Vote> Votes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            // modelBuilder.Entity<Vote>()
            //     .HasOne(p => p.Candidate);
            var candidate = modelBuilder.Entity<Candidate>(); 
            candidate.Property(x => x.Votes)
                .HasDefaultValueSql("0")
                .ValueGeneratedOnAdd();
        }
    }
}