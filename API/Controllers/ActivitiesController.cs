using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ActivitiesController : BaseAPIController
    {
        private readonly DataContext _dc;
        public ActivitiesController(DataContext dc)
        {
            this._dc = dc;

        }

        // Get All Activities
        [HttpGet]
        public async Task<List<Activity>> GetActivities(){
           return await _dc.Activities.ToListAsync();
           
        }

        // Get Activities based on Activity Id
        [HttpGet("{id}")]
        public async Task<Activity> GetActivity(Guid id){
            return await _dc.Activities.FindAsync(id);
        }
    }
}