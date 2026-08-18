using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Application.Interfaces.IRepository;
using Domain.Entities;

namespace Persistance.Context
{
   public class ApplicationDbContext
        :  IdentityDbContext<AspNetUser>, IApplicationDbContext
   {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options): base(options)
        {
        
        }
        public DbSet<AspNetUser> AspNetUsers { get; set; }
        public DbSet<AspNetUserClaim> AspNetUserClaims { get; set; }
        
        public async Task<int> SaveChangesAsync()
        {
            return await base.SaveChangesAsync();
        }
    } 
}
