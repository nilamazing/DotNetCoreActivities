using System;
using System.Threading;
using System.Threading.Tasks;
using Applications.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Applications.Activities
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public Activity ActivityToUpdate { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                this._mapper = mapper;
                this._context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Id);
                // activity.Description = request.ActivityToUpdate.Description ?? activity.Description;
                // activity.City = request.ActivityToUpdate.City ?? activity.City;
                // activity.Date = (request.ActivityToUpdate.Date==DateTime.MinValue)?request.ActivityToUpdate.Date:activity.Date;
                // activity.Title = request.ActivityToUpdate.Title ?? activity.Title;
                // activity.Venue = request.ActivityToUpdate.Venue ?? activity.Venue;
                // activity.Category = request.ActivityToUpdate.Category ?? activity.Category;
                this._mapper.Map(request.ActivityToUpdate,activity);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}