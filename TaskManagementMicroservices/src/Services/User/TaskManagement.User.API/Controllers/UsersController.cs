using MediatR;
using Microsoft.AspNetCore.Mvc;
using TaskManagement.User.Application.DTOs;
using TaskManagement.User.Application.Features.Users.Commands.CreateUser;
using TaskManagement.User.Application.Features.Users.Commands.LoginUser;
using TaskManagement.User.Application.Features.Users.Queries.GetAllUsers;
using TaskManagement.User.Application.Features.Users.Queries.GetUser;

namespace TaskManagement.User.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IMediator _mediator;

        public UsersController(IMediator mediator)
        {
            _mediator = mediator;
        }

        /// <summary>
        /// Register a new user
        /// </summary>
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register([FromBody] CreateUserRequest request)
        {
            try
            {
                var command = new CreateUserCommand
                {
                    Email = request.Email,
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    Password = request.Password,
                    Role = request.Role
                };

                var result = await _mediator.Send(command);
                return CreatedAtAction(nameof(GetUser), new { id = result.Id }, result);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while creating the user", details = ex.Message });
            }
        }

        /// <summary>
        /// Login user
        /// </summary>
        [HttpPost("login")]
        public async Task<ActionResult<LoginResponse>> Login([FromBody] LoginRequest request)
        {
            try
            {
                var command = new LoginUserCommand
                {
                    Email = request.Email,
                    Password = request.Password
                };

                var result = await _mediator.Send(command);

                if (!result.Success)
                {
                    return Unauthorized(result);
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred during login", details = ex.Message });
            }
        }

        /// <summary>
        /// Get user by ID
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetUser(Guid id)
        {
            try
            {
                var query = new GetUserQuery(id);
                var result = await _mediator.Send(query);

                if (result == null)
                {
                    return NotFound(new { message = "User not found" });
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while retrieving the user", details = ex.Message });
            }
        }

        /// <summary>
        /// Get all users
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetAllUsers()
        {
            try
            {
                var query = new GetAllUsersQuery();
                var result = await _mediator.Send(query);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while retrieving users", details = ex.Message });
            }
        }
    }
}