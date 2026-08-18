using MediatR;
using Application.Exceptions;
using Application.Interfaces.IRepository;
using Application.Wrappers;
using Domain.Entities;

namespace Application.Features.Account.Queries.GetUsers
{
    public class GetUsersQueryHandler : IRequestHandler<GetUsersQuery, ApiResponse<IEnumerable<AspNetUser>>>
    {
        private readonly IAccountRepository _accountRepository;
        public GetUsersQueryHandler(IAccountRepository accountRepository)
        {
            _accountRepository = accountRepository;
        }
        public async Task<ApiResponse<IEnumerable<AspNetUser>>> Handle(GetUsersQuery request, CancellationToken cancellationToken)
        {
            var result = await _accountRepository.GetUsersAsync();

            if (result == null)
            {
                throw new ApiException("Users not found.");
            }

            return new ApiResponse<IEnumerable<AspNetUser>>(result, "Users Fetched successfully");
        }
    }
}
