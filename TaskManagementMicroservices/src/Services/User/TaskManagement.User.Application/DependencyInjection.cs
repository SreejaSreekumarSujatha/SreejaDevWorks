using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace TaskManagement.User.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            // Add MediatR
            services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));

            // Add AutoMapper
            services.AddAutoMapper(Assembly.GetExecutingAssembly());

            return services;
        }
    }
}