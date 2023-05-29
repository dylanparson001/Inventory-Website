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
        public async Task<ActionResult<Item>> AddItem([FromBody] ItemDto item)
        {
            if (item == null)
            {
                return BadRequest(ModelState);
            }
            if (item.Quantity < 0)
            {
                return BadRequest("Quantity Cannot Be Negative");
            }
            // If the user enters a name that already exists, dont create a new item. 
            // Might be good idea to prompt user in client to make sure they know they are updating instead of adding
            if (await ItemNameExists(item.Name) == true)
            {
                // Need to create item object because client does not send id 
                Item existingItem = await GetItemByName(item.Name);

                // Assign id to item
                item.Id = existingItem.Id;

                // Update item
                await UpdateItem(item);

            }
            else
            {
                // Create new item
                var newItem = new Item
                {
                    Name = item.Name.ToUpper(), // names are uppercased here and in client to ensure data is uniform
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
        public async Task<ActionResult<Item>> UpdateItem([FromBody] ItemDto updatedItem)
        {
            if (updatedItem == null)
            {
                return BadRequest(ModelState);
            }

            var itemToUpdate = new Item
            {
                Id = updatedItem.Id,
                Name = updatedItem.Name.ToUpper(),
                Quantity = updatedItem.Quantity,
                Category = updatedItem.Category,
                Condition = updatedItem.Condition,
                Description = updatedItem.Description
            };

            _context.Items.Update(itemToUpdate);

            await _context.SaveChangesAsync();

            return NoContent();
        }


        [HttpDelete("deleteitem/{id}")]
        public async Task<ActionResult<Item>> DeleteItem(int id)
        {
            var item = await _context.Items.FirstOrDefaultAsync(x => x.Id == id);

            _context.Items.Remove(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("deleteitem/selected")]
        public async Task<IActionResult> DeleteItems([FromBody] List<int> ids)
        {
            var itemsToDelete = await _context.Items.Where(i => ids.Contains(i.Id)).ToListAsync();
            _context.Items.RemoveRange(itemsToDelete);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        private async Task<bool> ItemExistsById(int id)
        {
            return await _context.Items.AsNoTracking().AnyAsync(x => x.Id == id);
        }
        private async Task<bool> ItemNameExists(string name)
        {
            return await _context.Items.AsNoTracking().AnyAsync(x => x.Name == name);
        }
        private async Task<Item> GetItemByName(string name)
        {
            // Learned about as no tracking, EF tracks context for changes, and if im making a call that is meant to be temporary AsNotracking() stops the tracl
            Item item = await _context.Items.AsNoTracking()
                .FirstOrDefaultAsync(item => item.Name == name);

            return item;
        }

    }
}