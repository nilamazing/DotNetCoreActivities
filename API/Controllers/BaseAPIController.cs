using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace API.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class BaseAPIController:ControllerBase
    {
        private IMediator _mediator;
        
        // Get the injected Meditor Service from Service Injection
        // Mediator will serve as the Mediator service for all the Controllers
        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();
        
    }
}