using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace _API.Models
{
    public class Paymnet
    {
        public int id { get; set; }
        public string email { get; set; }
        public double amount { get; set; }
        public string tx_ref { get; set; }
        public string type { get; set; }
        public string date { get; set; }
        public int status { get; set; }

    }
}