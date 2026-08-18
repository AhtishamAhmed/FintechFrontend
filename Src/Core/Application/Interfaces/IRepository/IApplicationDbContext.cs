using Microsoft.EntityFrameworkCore;
using Domain.Entities;

namespace Application.Interfaces.IRepository
{
    public interface IApplicationDbContext
    {
        DbSet<AspNetUser> AspNetUsers { get; set; }
        DbSet<AspNetUserClaim> AspNetUserClaims { get; set; }
        Task<int> SaveChangesAsync();
    }
}