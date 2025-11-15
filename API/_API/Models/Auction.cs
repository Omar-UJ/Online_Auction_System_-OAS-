using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace _API.Models
{
    public class Auction
    {
        public int access { get; set; }
        public int id { get; set; }
        public string title { get; set; }
        public string desc { get; set; }
        public double price { get; set; }
        public byte[] pic { get; set; }
        public string tag { get; set; }
        public string type { get; set; }
        public string sDate { get; set; }
        public string eDate { get; set; }
        public int cID { get; set; }
        public int view { get; set; }
        public bool start { get; set; }
        public decimal rate { get; set; }
        public int totalRtr { get; set; }
        public string date { get; set; }
        public string time { get; set; }
        public double per { get; set; }
        public int isStart { get; set; }
    }
}