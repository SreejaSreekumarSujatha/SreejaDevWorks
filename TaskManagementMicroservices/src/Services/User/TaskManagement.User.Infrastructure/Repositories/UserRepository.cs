using Microsoft.EntityFrameworkCore;
using TaskManagement.User.Domain.Repositories;
using TaskManagement.User.Infrastructure.Data;

namespace TaskManagement.User.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly UserDbContext _context;

        public UserRepository(UserDbContext context)
        {
            _context = context;
        }

        public async Task<Domain.Entities.User?> GetByIdAsync(Guid id)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<Domain.Entities.User?> GetByEmailAsync(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email.ToLowerInvariant());
        }

        public async Task<IEnumerable<Domain.Entities.User>> GetAllAsync()
        {
            return await _context.Users
                .Where(u => u.IsActive)
                .OrderBy(u => u.FirstName)
                .ThenBy(u => u.LastName)
                .ToListAsync();
        }

        public async Task<Domain.Entities.User> CreateAsync(Domain.Entities.User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<Domain.Entities.User> UpdateAsync(Domain.Entities.User user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var user = await GetByIdAsync(id);
            if (user != null)
            {
                user.IsActive = false; // Soft delete
                await UpdateAsync(user);
                return true;
            }
            return false;
        }

        public async Task<bool> ExistsAsync(string email)
        {
            return await _context.Users.AnyAsync(u => u.Email == email.ToLowerInvariant());
        }

        public async Task<int> GetTotalCountAsync()
        {
            return await _context.Users.CountAsync(u => u.IsActive);
        }
    }
}