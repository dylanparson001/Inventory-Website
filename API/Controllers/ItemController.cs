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

        [HttpGet("getitem/{id}")]
        public async Task<ActionResult<Item>> GetItem(int id)
        {
            var item = await _context.Items.FindAsync(id);

            return item;
        }

        [HttpGet("getitems")]
        public async Task<ActionResult<IEnumerable<Item>>> GetItems()
        {
            var items = await _context.Items.ToListAsync();

            return items;
        }

        [HttpPost("additem")]
        public async Task<ActionResult<Item>> AddItem([FromBody] Item item)
        {
            if (item == null)
            {
                return BadRequest(ModelState);
            }
            if (item.Quantity < 0)
            {
                return BadRequest("Quantity Cannot Be Negative");
            }
            
            if (await ItemNameExists(item.Name) == true)
            {
                Item existingItem = await GetItemByName(item.Name);
                
                item.Id = existingItem.Id;

                await UpdateItem(item);
                
            }
            else {
                var newItem = new Item
                {
                    Name = item.Name.ToUpper(),
                    Quantity = item.Quantity,
                    Category = item.Category,
                    Condition = item.Condition,
                    Description = item.Description
                };
                await _context.Items.AddAsync(newItem);
                await _context.SaveChangesAsync();
            }

            return Ok();
        }

        [HttpPut("updateitem")]
        public async Task<ActionResult<Item>> UpdateItem([FromBody] Item updatedItem)
        {
            if (updatedItem == null)
            {
                return BadRequest(ModelState);
            }

            _context.Items.Update(updatedItem);

            await _context.SaveChangesAsync();

            return NoContent();
        }
 

        [HttpDelete("deleteitem/{id}")]
        public async Task<ActionResult<Item>> DeleteItem(int id)
        {
            var item = await _context.Items.FindAsync(id); // Was using firstordefault, but that wasnt working for some reason?

            _context.Items.Remove(item);
            await _context.SaveChangesAsync();
            return Ok("Item Deleted");
        }

        [HttpDelete("deleteitem/selected")]
        public async Task<IActionResult> DeleteItems([FromBody] List<int> ids)
        {

            var itemsToDelete = await _context.Items.Where(i => ids.Contains(i.Id)).ToListAsync();
            _context.Items.RemoveRange(itemsToDelete);
            await _context.SaveChangesAsync();


            return NoContent(); // 204 No Content
        }
        private async Task<bool> ItemExists(int id)
        {
            return await _context.Items.AnyAsync(x => x.Id == id);
        }
        private async Task<bool> ItemNameExists(string name)
        {
            return await _context.Items.AnyAsync(x => x.Name == name);
        }
        private async Task<Item> GetItemByName(string name){
            
            // Learned about as no tracking, EF tracks context for changes, and if im making a call that is meant to be temporary AsNotracking() stops the tracl
            Item item = await _context.Items.AsNoTracking().FirstOrDefaultAsync(item => item.Name == name);

            return item;
        }

    }
}