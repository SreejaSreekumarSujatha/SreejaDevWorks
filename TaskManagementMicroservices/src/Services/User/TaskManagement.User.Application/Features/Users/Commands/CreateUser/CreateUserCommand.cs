using MediatR;
using TaskManagement.User.Application.DTOs;

namespace TaskManagement.User.Application.Features.Users.Commands.CreateUser
{
    public class CreateUserCommand : IRequest<UserDto>
    {
        public string Email { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Role { get; set; } = "User";
    }
}