using MediatR;
using TaskManagement.User.Application.DTOs;

namespace TaskManagement.User.Application.Features.Users.Queries.GetAllUsers
{
    public class GetAllUsersQuery : IRequest<IEnumerable<UserDto>>
    {
    }
}