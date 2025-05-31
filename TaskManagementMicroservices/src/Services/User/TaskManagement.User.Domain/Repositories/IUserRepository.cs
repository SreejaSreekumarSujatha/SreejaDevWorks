namespace TaskManagement.User.Domain.Repositories
{
    public interface IUserRepository
    {
        Task<Entities.User?> GetByIdAsync(Guid id);
        Task<Entities.User?> GetByEmailAsync(string email);
        Task<IEnumerable<Entities.User>> GetAllAsync();
        Task<Entities.User> CreateAsync(Entities.User user);
        Task<Entities.User> UpdateAsync(Entities.User user);
        Task<bool> DeleteAsync(Guid id);
        Task<bool> ExistsAsync(string email);
        Task<int> GetTotalCountAsync();
    }
}