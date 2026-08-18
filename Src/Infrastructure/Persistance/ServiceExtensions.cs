using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Application.Interfaces.IRepository;
using Domain.Entities;
using Persistance.Context;
using Persistance.Repository;

namespace Persistance
{
    public static class ServiceExtensions
    {
        public static void AddPersistance(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<ApplicationDbContext>(option => option.UseNpgsql(
                configuration.GetConnectionString("DefaultConnection")
                ));
         
            services.AddScoped<IApplicationDbContext, ApplicationDbContext>();
            services.AddScoped<IAccountRepository, AccountRepository>();
            services.AddIdentity<AspNetUser, IdentityRole>()
               .AddEntityFrameworkStores<ApplicationDbContext>()
                 .AddDefaultTokenProviders();
        }
    }
}
