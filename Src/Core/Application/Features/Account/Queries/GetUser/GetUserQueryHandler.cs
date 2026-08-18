using MediatR;
using Application.Exceptions;
using Application.Interfaces.IRepository;
using Application.Wrappers;
using Domain.Entities;

namespace Application.Features.Account.Queries.GetUser
{
    public class GetUserQueryHandler : IRequestHandler<GetUserQuery, ApiResponse<AspNetUser>>
    {
        private readonly IAccountRepository _accountRepository;

        public GetUserQueryHandler(IAccountRepository accountRepository)
        {
            _accountRepository = accountRepository;
        }
        public async Task<ApiResponse<AspNetUser>> Handle(GetUserQuery request, CancellationToken cancellationToken)
        {
            var result = await _accountRepository.GetUserAsync(request.Id);
            if (result == null)
            { 
                throw new ApiException("User Not Found");
            }

            return new ApiResponse<AspNetUser>(result, "Get User Successfully");
        }
    }
}
