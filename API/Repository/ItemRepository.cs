using Microsoft.EntityFrameworkCore;

namespace API.Repository
{
    public class ItemRepository
    {
        private readonly DbContext _context;
        public ItemRepository(DbContext context)
        {
            _context = context;
        }

        public async void Save()
        {
            await _context.SaveChangesAsync();
        }

    }
}