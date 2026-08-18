using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;
namespace Domain.Entities
{
    public class AspNetUserClaim : IdentityUserClaim<string>
    {
        [ForeignKey("UserId")]
        public virtual AspNetUser? User { get; set; }
    }
}
