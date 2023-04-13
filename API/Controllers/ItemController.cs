using API.Data;
using API.Dtos;
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
        [HttpGet("getitems")]
        public async Task<ActionResult<IEnumerable<Item>>> GetItems()
        {
            var items = await _context.Items.ToListAsync();

            return items;
        }
        [HttpGet("getitem/{id}")]
        public async Task<ActionResult<Item>> GetItem(int id)
        {
            var item = await _context.Items.FindAsync(id);

            return item;
        }
        [HttpPost("additem")]
        public async Task<ActionResult<Item>> AddItem([FromBody] ItemDto itemDto)
        {
            if (itemDto == null)
            {
                return BadRequest(ModelState);
            }
            if(itemDto.Quantity < 0){
                return BadRequest("Quantity Cannot Be Negative");
            }

            var item = new Item
            {
                Name = itemDto.Name.ToUpper(),
                Quantity = itemDto.Quantity,
                Category = itemDto.Category.ToUpper(),
                Condition = itemDto.Condition,
                Description = itemDto.Description
            };
            await _context.Items.AddAsync(item);
            await _context.SaveChangesAsync();

            return Ok("Successfully Created");
        }

        [HttpPut("updateitem")]
        public async Task<ActionResult<Item>> UpdateItem(int itemId, [FromBody] ItemDto updatedItem)
        {
            if (updatedItem == null)
            {
                return BadRequest(ModelState);
            }

            if (!await ItemExists(itemId))
            {
                return BadRequest(ModelState);
            }
            var item = new Item
            {
                Id = itemId,
                Name = updatedItem.Name.ToUpper(),
                Quantity = updatedItem.Quantity,
                Category = updatedItem.Category.ToUpper(),
                Condition = updatedItem.Condition,
                Description = updatedItem.Description
            };

            _context.Items.Update(item);

            await _context.SaveChangesAsync();

            return Ok("Successfully Updated");
        }
        [HttpDelete("deleteitem")]
        public async Task<ActionResult<Item>> DeleteItem(int itemId)
        {
            if (ItemExists(itemId) == null)
            {
                return BadRequest(ModelState);
            }

            var item = _context.Items.FirstOrDefault(x => x.Id == itemId);

            _context.Items.Remove(item);
            await _context.SaveChangesAsync();

            return Ok("Item Deleted");
        }
        private async Task<bool> ItemExists(int id)
        {
            return await _context.Items.AnyAsync(x => x.Id == id);
        }

    }
}