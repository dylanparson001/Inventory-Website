using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Item
    {
        public int Id { get; set; }
        public string Category { get; set; }

        public string Name { get; set; }

        public string Condition { get; set; }
        public string Description { get; set; }



    }
}