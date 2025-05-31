using AutoMapper;
using MediatR;
using TaskManagement.User.Application.DTOs;
using TaskManagement.User.Domain.Repositories;

namespace TaskManagement.User.Application.Features.Users.Queries.GetUser
{
    public class GetUserHandler : IRequestHandler<GetUserQuery, UserDto?>
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public GetUserHandler(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public async Task<UserDto?> Handle(GetUserQuery request, CancellationToken cancellationToken)
        {
            var user = await _userRepository.GetByIdAsync(request.UserId);
            return user != null ? _mapper.Map<UserDto>(user) : null;
        }
    }
}