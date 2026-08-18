using Domain.Entities;

namespace Application.Interfaces.IRepository
{
    public interface IAccountRepository
    {
        Task<IEnumerable<AspNetUser>> GetUsersAsync();
        Task<AspNetUser> GetUserAsync(Guid id);
        Task<bool> AddUserAsync(AspNetUser user);
        Task<bool> AddRoleAsync(AspNetUserClaim userClaim);
        Task<AspNetUserClaim> GetUserClaimsAsync(string id);
        Task SaveChangesAsync();
    }
}