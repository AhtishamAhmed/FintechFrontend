using Microsoft.EntityFrameworkCore;
using Application.Interfaces.IRepository;
using Domain.Entities;

namespace Persistance.Repository
{
    public class AccountRepository : IAccountRepository
    {
        private readonly IApplicationDbContext _dbContext;

        public async Task<AspNetUser> GetUserAsync(Guid id)
        {
            return await _dbContext.AspNetUsers.FirstOrDefaultAsync(x => x.Id == id.ToString());
        }
        public AccountRepository(IApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<IEnumerable<AspNetUser>> GetUsersAsync()
        {
             var temp = await _dbContext.AspNetUsers.ToListAsync();
            return temp;
        }

        public async Task<bool> AddUserAsync(AspNetUser user)
        {
            _dbContext.AspNetUsers.Add(user);
            return true;
        }
        public async Task<bool> AddRoleAsync(AspNetUserClaim userClaim)
        {
            await _dbContext.AspNetUserClaims.AddAsync(userClaim);
            return true;
        }
        public async Task<AspNetUserClaim> GetUserClaimsAsync(string id)
        {
            var claims = await _dbContext.AspNetUserClaims
                .Where(c => c.UserId == id)
                .FirstOrDefaultAsync();
            return claims!;
        }
        public async Task SaveChangesAsync()
        {
            await _dbContext.SaveChangesAsync();
        }

    }
}
