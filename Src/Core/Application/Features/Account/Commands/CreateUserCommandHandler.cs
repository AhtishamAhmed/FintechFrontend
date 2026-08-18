using MediatR;
using Microsoft.AspNetCore.Identity;
using Application.Wrappers;
using Domain.Entities;

namespace Application.Features.Account.Commands
{
    public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, ApiResponse<bool>>
    {
        private readonly UserManager<AspNetUser> _userManager;

        public CreateUserCommandHandler(UserManager<AspNetUser> userManager)
        {
            _userManager = userManager;
        }
        public async Task<ApiResponse<bool>> Handle(CreateUserCommand request, CancellationToken cancellationToken)
        {

            var user = new AspNetUser
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                UserName = request.Email,
                EmailConfirmed = false,
                NormalizedUserName = request.Email!.ToUpper(),
                NormalizedEmail = request.Email!.ToUpper(),
                IsArchived = false,
                SecurityStamp = Guid.NewGuid().ToString(),
            };
            user.Id = Guid.NewGuid().ToString();

            var result = await _userManager.CreateAsync(user);
            return new ApiResponse<bool>(true, "account created");

        }
    }
}
