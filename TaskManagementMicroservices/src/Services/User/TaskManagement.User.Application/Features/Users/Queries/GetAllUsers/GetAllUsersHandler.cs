using AutoMapper;
using MediatR;
using TaskManagement.User.Application.DTOs;
using TaskManagement.User.Domain.Repositories;

namespace TaskManagement.User.Application.Features.Users.Queries.GetAllUsers
{
    public class GetAllUsersHandler : IRequestHandler<GetAllUsersQuery, IEnumerable<UserDto>>
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public GetAllUsersHandler(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<UserDto>> Handle(GetAllUsersQuery request, CancellationToken cancellationToken)
        {
            var users = await _userRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<UserDto>>(users);
        }
    }
}