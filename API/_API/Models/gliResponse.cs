using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace _API.Models
{
    public class gliResponse
    {
        public bool isSuccess { get; set; }
        public string msg { get; set; }
        public Client client { get; set; }
    }
}