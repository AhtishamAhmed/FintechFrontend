using MediatR;
using Application.Wrappers;
using Domain.Entities;

namespace Application.Features.Account.Queries.GetUser
{
    public class GetUserQuery : IRequest<ApiResponse<AspNetUser>>
    {
        public Guid Id { get; set; }
    }
}
