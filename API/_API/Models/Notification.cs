using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace _API.Models
{
    public class Notification
    {
        
        public int id { get; set; }
        public string title { get; set; }
        public string desc { get; set; }
        public int status { get; set; }
        public string date { get; set; }
        public string author_email { get; set; }
        public string dest_email { get; set; }
    }
}