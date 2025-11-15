using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace _API.Models
{
    public class AucResponse
    {
        public bool isSuccess { get; set; }
        public string msg { get; set; }
        public List<Auction>  auctions{ get; set;}
    }
}