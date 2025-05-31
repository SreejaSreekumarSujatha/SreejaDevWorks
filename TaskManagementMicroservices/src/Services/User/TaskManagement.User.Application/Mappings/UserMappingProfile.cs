using AutoMapper;
using TaskManagement.User.Application.DTOs;
using TaskManagement.User.Domain.Entities;

namespace TaskManagement.User.Application.Mappings
{
    public class UserMappingProfile : Profile
    {
        public UserMappingProfile()
        {
            CreateMap<Domain.Entities.User, UserDto>()
                .ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Role.ToString()));

            CreateMap<CreateUserRequest, Domain.Entities.User>()
                .ForMember(dest => dest.Role, opt => opt.MapFrom(src => ParseUserRole(src.Role)))
                .ForMember(dest => dest.PasswordHash, opt => opt.Ignore()) // We'll handle password hashing separately
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.UpdatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedBy, opt => opt.Ignore())
                .ForMember(dest => dest.UpdatedBy, opt => opt.Ignore());
        }

        private static UserRole ParseUserRole(string role)
        {
            if (Enum.TryParse<UserRole>(role, true, out var userRole))
            {
                return userRole;
            }
            return UserRole.User;
        }
    }
}