using MediatR;
using Application.Wrappers;
using System.ComponentModel.DataAnnotations;

namespace Application.Features.Account.Commands
{
    public class CreateUserCommand : IRequest<ApiResponse<bool>>
    {
        [Required]
        public string? FirstName { get; set; }
        [Required]
        public string? LastName { get; set; }
        [Required]
        public string? Email { get; set; }
    }
}
