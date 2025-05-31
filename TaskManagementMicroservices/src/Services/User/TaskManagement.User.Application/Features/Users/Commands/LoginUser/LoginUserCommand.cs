using MediatR;
using TaskManagement.User.Application.DTOs;

namespace TaskManagement.User.Application.Features.Users.Commands.LoginUser
{
    public class LoginUserCommand : IRequest<LoginResponse>
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}