using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TaskManagement.User.Application.Interfaces;
using TaskManagement.User.Domain.Repositories;
using TaskManagement.User.Infrastructure.Data;
using TaskManagement.User.Infrastructure.Repositories;
using TaskManagement.User.Infrastructure.Services;

namespace TaskManagement.User.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            // Add DbContext
            services.AddDbContext<UserDbContext>(options =>
                options.UseSqlServer(
                    configuration.GetConnectionString("DefaultConnection"),
                    b => b.MigrationsAssembly(typeof(UserDbContext).Assembly.FullName)));

            // Add repositories
            services.AddScoped<IUserRepository, UserRepository>();

            // Add services
            services.AddScoped<IPasswordHasher, PasswordHasher>();

            return services;
        }
    }
}