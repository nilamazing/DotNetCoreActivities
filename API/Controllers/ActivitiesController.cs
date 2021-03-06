using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Applications.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore;
// using Persistence;

namespace API.Controllers
{
    public class ActivitiesController : BaseAPIController
    {
        //private readonly IMediator _mediator;
        // Using the Mediator property from the BaseAPIController
        public ActivitiesController(IMediator mediator)
        {
            //this._mediator = mediator;

        }

        // Get All Activities
        [HttpGet]
        public async Task<List<Activity>> GetActivities()
        {
            return await Mediator.Send(new List.Query());
        }

        // Get Activities based on Activity Id
        [HttpGet("{id}")]
        public async Task<Activity> GetActivity(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id=id});
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity){

            await Mediator.Send(new Create.Command{Activity=activity});
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, [FromBody] Activity activity){
            activity.ID=id;
            await Mediator.Send(new Edit.Command{Id=id,ActivityToUpdate=activity});
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id){
            await Mediator.Send(new Delete.Command{Id=id});
            return Ok();
        }
    }
}