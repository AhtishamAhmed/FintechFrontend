using MediatR;
using Application.Wrappers;
using Domain.Entities;

namespace Application.Features.Account.Queries.GetUsers
{
    public class GetUsersQuery : IRequest<ApiResponse<IEnumerable<AspNetUser>>>
    {

    }
}
