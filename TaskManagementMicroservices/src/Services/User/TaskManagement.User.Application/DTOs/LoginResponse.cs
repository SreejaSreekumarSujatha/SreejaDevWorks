namespace TaskManagement.User.Application.DTOs
{
    public class LoginResponse
    {
        public UserDto User { get; set; } = new();
        public string Token { get; set; } = string.Empty;
        public DateTime ExpiresAt { get; set; }
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
    }
}