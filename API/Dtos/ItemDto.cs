using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class ItemDto
    {
        public int Id { get; set; }
        
        
        [Required]
        public string Name { get; set; }
        [Required]
        public int Quantity { get; set; }
        [Required]
        public string Category { get; set; }
        public string Condition { get; set; }
        public string Description { get; set; }
    }
}