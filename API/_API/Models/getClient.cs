using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace _API.Models
{
    public class getClient
    {
        public class GetClientResponse
        {
            public bool isSuccess { get; set; }
            public string msg { get; set; }
            public List<GetClient> getClient { get; set; }
        }
        public class GetClient
        {
            public string first_name { get; set; }
            public string last_name { get; set; }
            public string email { get; set; }
            public string password { get; set; }
            public int telephone { get; set; }
        }
    }
}