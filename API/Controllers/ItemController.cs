using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ItemController : ControllerBase
    {
        private readonly DataContext _context;
        public ItemController(DataContext context)
        {
            _context = context;

        }
        [HttpGet("/items")]
        public async Task<ActionResult<IEnumerable<Item>>> GetItems()
        {
            var items = await _context.Items.ToListAsync();

            return items;
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Item>> GetItem(int id)
        {
            var item = await _context.Items.FindAsync(id);

            return item;
        }
        [HttpPost]
        public async Task<ActionResult<Item>> AddItem(Item item)
        {
            if (item == null)
            {
                return BadRequest(ModelState);
            }
            await _context.Items.AddAsync(item);

            await _context.SaveChangesAsync();

            return Ok("Successfully Created");
        }

    }
}