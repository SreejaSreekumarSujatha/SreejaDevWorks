using AutoMapper;
using MediatR;
using TaskManagement.User.Application.DTOs;
using TaskManagement.User.Application.Interfaces;
using TaskManagement.User.Domain.Repositories;

namespace TaskManagement.User.Application.Features.Users.Commands.LoginUser
{
    public class LoginUserHandler : IRequestHandler<LoginUserCommand, LoginResponse>
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IPasswordHasher _passwordHasher;

        public LoginUserHandler(
            IUserRepository userRepository,
            IMapper mapper,
            IPasswordHasher passwordHasher)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _passwordHasher = passwordHasher;
        }

        public async Task<LoginResponse> Handle(LoginUserCommand request, CancellationToken cancellationToken)
        {
            // Find user by email
            var user = await _userRepository.GetByEmailAsync(request.Email.ToLowerInvariant());

            if (user == null || !user.IsActive)
            {
                return new LoginResponse
                {
                    Success = false,
                    Message = "Invalid email or password"
                };
            }

            // Verify password
            if (!_passwordHasher.VerifyPassword(request.Password, user.PasswordHash))
            {
                return new LoginResponse
                {
                    Success = false,
                    Message = "Invalid email or password"
                };
            }

            // Update last login
            user.MarkAsLoggedIn();
            await _userRepository.UpdateAsync(user);

            // Create simple token (in real app, use JWT)
            var token = Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes($"{user.Email}:{DateTime.UtcNow:O}"));

            return new LoginResponse
            {
                Success = true,
                User = _mapper.Map<UserDto>(user),
                Token = token,
                ExpiresAt = DateTime.UtcNow.AddHours(24),
                Message = "Login successful"
            };
        }
    }
}