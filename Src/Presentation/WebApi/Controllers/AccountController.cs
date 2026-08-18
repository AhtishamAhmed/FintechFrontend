using MediatR;
using Microsoft.AspNetCore.Mvc;
using Application.Features.Account.Commands;
using Application.Features.Account.Queries;
using Application.Features.Account.Queries.GetUser;
using Application.Features.Account.Queries.GetUsers;

namespace WebApi.Controllers
{
    [Route("api/account/[action]")]
    [ApiController]

    public class AccountController : ControllerBase
    {
        private readonly IMediator _mediator;
        public AccountController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var result = await _mediator.Send(new GetUsersQuery());
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(Guid id)
        {
            var result = await _mediator.Send(new GetUserQuery() { Id = id });
            return Ok(result);
        }
        [HttpPost]
        public async Task<IActionResult> CreateUser(CreateUserCommand command, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(command, cancellationToken);
            return Ok(result);
        }
    }
}
