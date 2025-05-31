using AutoMapper;
using MediatR;
using TaskManagement.User.Application.DTOs;
using TaskManagement.User.Application.Interfaces;
using TaskManagement.User.Domain.Entities;
using TaskManagement.User.Domain.Repositories;

namespace TaskManagement.User.Application.Features.Users.Commands.CreateUser
{
    public class CreateUserHandler : IRequestHandler<CreateUserCommand, UserDto>
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IPasswordHasher _passwordHasher;

        public CreateUserHandler(
            IUserRepository userRepository,
            IMapper mapper,
            IPasswordHasher passwordHasher)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _passwordHasher = passwordHasher;
        }

        public async Task<UserDto> Handle(CreateUserCommand request, CancellationToken cancellationToken)
        {
            // Check if user already exists
            if (await _userRepository.ExistsAsync(request.Email))
            {
                throw new InvalidOperationException("User with this email already exists");
            }

            // Parse role
            if (!Enum.TryParse<UserRole>(request.Role, true, out var userRole))
            {
                userRole = UserRole.User;
            }

            // Create user entity
            var user = new Domain.Entities.User
            {
                Email = request.Email.ToLowerInvariant(),
                FirstName = request.FirstName,
                LastName = request.LastName,
                PasswordHash = _passwordHasher.HashPassword(request.Password),
                Role = userRole,
                CreatedBy = "System"
            };

            // Save to database
            var createdUser = await _userRepository.CreateAsync(user);

            // Return DTO
            return _mapper.Map<UserDto>(createdUser);
        }
    }
}