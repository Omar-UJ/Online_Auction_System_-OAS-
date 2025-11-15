using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace _API.Models
{
    public class Client
    {
      public int id { get; set; }
        public int cID { get; set; }
        public string first_name { get; set; }
        public string last_name { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public int  telephone { get; set; }
        public int status { get; set; }
        public byte[] profilePic { get; set; }
        public string dob { get; set; }
        public string country { get; set; }
        public string city { get; set; }
        public string street { get; set; }
        public int zipCode { get; set; }

    }
}