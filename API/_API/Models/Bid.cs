using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace _API.Models
{
    public class Bid
    {
        public int b_id { get; set; }
        public double price { get; set; }
        public int auction_id { get; set; }
        public string email { get; set; }

    }
}