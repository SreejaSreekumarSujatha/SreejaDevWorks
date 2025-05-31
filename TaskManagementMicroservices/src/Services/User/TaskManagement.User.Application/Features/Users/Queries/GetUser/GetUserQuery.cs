using MediatR;
using TaskManagement.User.Application.DTOs;

namespace TaskManagement.User.Application.Features.Users.Queries.GetUser
{
    public class GetUserQuery : IRequest<UserDto?>
    {
        public Guid UserId { get; set; }

        public GetUserQuery(Guid userId)
        {
            UserId = userId;
        }
    }
}