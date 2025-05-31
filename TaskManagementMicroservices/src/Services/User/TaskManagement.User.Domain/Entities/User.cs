using TaskManagement.Shared.Domain;

namespace TaskManagement.User.Domain.Entities
{
    public class User : BaseEntity
    {
        public string Email { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public UserRole Role { get; set; } = UserRole.User;
        public bool IsActive { get; set; } = true;
        public bool IsEmailVerified { get; set; } = false;
        public DateTime? LastLoginAt { get; set; }

        public string FullName => $"{FirstName} {LastName}";

        // Domain methods
        public void UpdateProfile(string firstName, string lastName)
        {
            FirstName = firstName;
            LastName = lastName;
            UpdatedAt = DateTime.UtcNow;
        }

        public void MarkAsLoggedIn()
        {
            LastLoginAt = DateTime.UtcNow;
            UpdatedAt = DateTime.UtcNow;
        }

        public void VerifyEmail()
        {
            IsEmailVerified = true;
            UpdatedAt = DateTime.UtcNow;
        }
    }

    public enum UserRole
    {
        User = 0,
        ProjectManager = 1,
        Admin = 2
    }
}