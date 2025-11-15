using System;
using System.Collections.Generic;
using System.Web.Http;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using _API.Models;
using System.Web;
using System.IO;

namespace _API.Controllers
{
    [RoutePrefix("api/Auction")]
    public class AuctionController : ApiController
    {
        SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["connect"].ConnectionString);
        SqlDataAdapter da = null;
        SqlCommand cmd = null;

        int count = 0;
        [HttpPost]
        [Route("_addAuction")]
        public IHttpActionResult addAuction()
        {

            // Get the uploaded image from the request
            var httpRequest = HttpContext.Current.Request;
            var image = httpRequest.Files["pic"];


            if (image != null)
            {
                // Save the image to a temporary location
                var tempImagePath = Path.Combine(HttpContext.Current.Server.MapPath("~/Temp"), image.FileName);
                image.SaveAs(tempImagePath);

                // Read the image file as bytes
                byte[] imageData = File.ReadAllBytes(tempImagePath);

                // Insert the image into the SQL database
                string connectionString = "connect";
                using (conn)
                {
                    conn.Open();
                    using (cmd = new SqlCommand("_addAuction", conn))
                    {

                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@title", HttpContext.Current.Request["title"]);
                        cmd.Parameters.AddWithValue("@desc", HttpContext.Current.Request["desc"]);
                        cmd.Parameters.AddWithValue("@pic", imageData);
                        cmd.Parameters.AddWithValue("@price", HttpContext.Current.Request["price"]);
                        cmd.Parameters.AddWithValue("@aucTag", HttpContext.Current.Request["tag"]);
                        cmd.Parameters.AddWithValue("@aucType", HttpContext.Current.Request["type"]);
                        cmd.Parameters.AddWithValue("@aucStartDate", HttpContext.Current.Request["sdate"]);
                        cmd.Parameters.AddWithValue("@aucEndDate", HttpContext.Current.Request["edate"]);
                        cmd.Parameters.AddWithValue("@client_id", HttpContext.Current.Request["client_id"]);
                        cmd.Parameters.AddWithValue("@access", HttpContext.Current.Request["access"]);
                        cmd.Parameters.AddWithValue("@a_view", 0);
                        cmd.Parameters.AddWithValue("@a_rate", 0);

                        cmd.ExecuteNonQuery();

                    }//  connection.Close();     
                }

                // Clean up the temporary image file
                File.Delete(tempImagePath);
                return Ok("Image uploaded successfully.");
            }

            return BadRequest("No image uploaded.");
        }
        [HttpPost]
        [Route("_getAuction")]
        public List<Auction> GetAuction(Filter filter)
        {
            List<Auction> auction = new List<Auction>();
            //AucResponse response = new AucResponse();

            try
            {
                if (this.count == 0)
                {

                    count++;

                    da = new SqlDataAdapter(filter.filter, conn);
                    da.SelectCommand.CommandType = CommandType.StoredProcedure;
                    DataTable dt = new DataTable();

                    int type = 0;
                    da.Fill(dt);
                    if (dt.Rows.Count > 0)
                        for (int i = 0; i < dt.Rows.Count; i++)
                        {
                            Auction cl = new Auction();
                            Auction tm = new Auction();
                            cl.title = Convert.ToString(dt.Rows[i]["a_name"]);
                            cl.pic = ((byte[])dt.Rows[i]["a_pictures"]);
                            cl.id = Convert.ToInt32(dt.Rows[i]["auction_id"]);
                            tm = compareDate(Convert.ToString(dt.Rows[i]["a_start"]), Convert.ToString(dt.Rows[i]["a_end"]));
                            cl.date = tm.date;
                            cl.time = tm.time;
                            cl.sDate = tm.sDate;
                            cl.eDate = tm.eDate;
                            cl.isStart = tm.isStart;
                            cl.per = tm.per;
                            type = Convert.ToInt32(dt.Rows[i]["a_type"]);
                            cl.tag = Convert.ToString(dt.Rows[i]["a_tag"]);
                            cl.desc = Convert.ToString(dt.Rows[i]["a_desc"]);
                            if (type == 0) cl.type = "Open Bid";
                            else cl.type = "Closed Bid";
                            cl.price = Convert.ToDouble(dt.Rows[i]["a_price"]);
                            cl.view = Convert.ToInt32(dt.Rows[i]["a_view"]);
                            cl.rate = Convert.ToInt32(dt.Rows[i]["a_rate"]);
                            auction.Add(cl);
                        }
                }
            }
            catch (Exception ex)
            {
                //response.isSuccess = false;
                //response.msg = ex.Message.ToString();
                // response.clients = null;

            }
            return auction;
        }

        [HttpPost]
        [Route("_getMyBid")]
        public List<Auction> MyBid(Auction item)
        {
            List<Auction> auction = new List<Auction>();
            Response response = new Response();

            try
            {

                da = new SqlDataAdapter("SELECT *FROM auction WHERE client_id = " + item.cID, conn);
                DataTable dt = new DataTable();

                int type = 0;
                da.Fill(dt);
                if (dt.Rows.Count > 0)
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        Auction cl = new Auction();
                        cl.title = Convert.ToString(dt.Rows[i]["a_name"]);
                        cl.pic = ((byte[])dt.Rows[i]["a_pictures"]);
                        cl.id = Convert.ToInt32(dt.Rows[i]["auction_id"]);
                        cl.sDate = Convert.ToString(dt.Rows[i]["a_start"]);
                        cl.eDate = Convert.ToString(dt.Rows[i]["a_end"]);
                        type = Convert.ToInt32(dt.Rows[i]["a_type"]);
                        cl.tag = Convert.ToString(dt.Rows[i]["a_tag"]);
                        cl.desc = Convert.ToString(dt.Rows[i]["a_desc"]);
                        if (type == 0) cl.type = "Open Bid";
                        else cl.type = "Closed Bid";
                        cl.price = Convert.ToInt32(dt.Rows[i]["a_price"]);
                        cl.view = Convert.ToInt32(dt.Rows[i]["a_view"]);
                        //cl.rate = Convert.ToInt32(dt.Rows[i]["a_rate"]);
                        auction.Add(cl);
                    }
                if (auction.Count > 0)
                {
                    response.isSuccess = true;
                    response.msg = "Success";
                    //response.clients = auction;
                }
                else
                {
                    response.isSuccess = false;
                    response.msg = "ERROR";
                    //response.clients = null;
                }

            }
            catch (Exception ex)
            {
                response.isSuccess = false;
                response.msg = ex.Message.ToString();
                // response.clients = null;

            }
            return auction;
        }
        public Auction compareDate(string sdate, string edate)
        {
            Auction auction = new Auction();
            var sd = Convert.ToDateTime(sdate);
            var ed = Convert.ToDateTime(edate);
            var cd = DateTime.Now;
            auction.isStart = 0;
            if (cd.CompareTo(sd) > 0 && cd.CompareTo(ed) < 0)
            {
                var v = ed.Subtract(cd);
                var t = ed.Subtract(sd);
                if (Convert.ToInt32(v.Days) == 0) auction.date = null;
                else auction.date = Convert.ToString(v.Days + " d");
                auction.time = Convert.ToString(v.Hours + " h " + v.Minutes + " m");
                auction.eDate = "End";
                auction.isStart = 1;

                int dm = (Convert.ToInt32(v.Days) * 24) * 60;
                int hm = (Convert.ToInt32(v.Hours) * 60);
                int tm = dm + hm + Convert.ToInt32(v.Minutes);

                int tdm = (Convert.ToInt32(t.Days) * 24) * 60;
                int thm = (Convert.ToInt32(t.Hours) * 60);
                int ttm = tdm + thm + Convert.ToInt32(t.Minutes);

                int sub = ttm - tm, prev_i = 1, cur_i = 0;
                for (int i = 1; i < 100; i++)
                {

                    cur_i = ttm * i / 100;
                    if (prev_i < sub && sub < cur_i)
                    {
                        auction.per = i - 1;
                        break;
                    }
                    prev_i = cur_i;
                }



            }
            else if (cd.CompareTo(sd) < 0)
            {
                var v = sd.Subtract(cd);
                if (Convert.ToInt32(v.Days) == 0) auction.date = null;
                else auction.date = Convert.ToString(v.Days + " d");
                auction.time = Convert.ToString(v.Hours + " h " + v.Minutes + " m");
                auction.sDate = "Start";
                auction.isStart = 0;

                if (Convert.ToInt32(v.Days) > 10) auction.per = 100;
                else if (Convert.ToInt32(v.Days) >= 1) auction.per = Convert.ToInt32(v.Days) * 10;
                else if (Convert.ToInt32(v.Hours) > 1) auction.per = Convert.ToInt32(v.Hours);
                else if (Convert.ToInt32(v.Minutes) > 1) auction.per = Convert.ToInt32(v.Minutes) * 0.2;
                else auction.per = 0;

            }
            else if (ed.CompareTo(cd) < 0)
            {
                auction.date = Convert.ToString(0);
                auction.time = Convert.ToString(0);

            }
            return auction;
        }

        [HttpPost]
        [Route("_getSelectedAuction")]
        public Auction GetSelectedAuction(Auction item)
        {
            Auction cl = new Auction();
            Auction tm = new Auction();
            Response response = new Response();
            int id = Convert.ToInt32(item.id);
            try
            {
                if (this.count == 0)
                {
                    count++;
                    int type = 0;
                    da = new SqlDataAdapter("_getSelectedAuction", conn);
                    da.SelectCommand.CommandType = CommandType.StoredProcedure;
                    da.SelectCommand.Parameters.AddWithValue("@a_id", id);

                    DataTable dt = new DataTable();
                    da.Fill(dt);
                    if (dt.Rows.Count > 0)
                    {
                        cl.title = Convert.ToString(dt.Rows[0]["a_name"]);
                        cl.pic = ((byte[])dt.Rows[0]["a_pictures"]);
                        cl.id = Convert.ToInt32(dt.Rows[0]["auction_id"]);
                        tm = compareDate(Convert.ToString(dt.Rows[0]["a_start"]), Convert.ToString(dt.Rows[0]["a_end"]));
                        cl.date = tm.date;
                        cl.time = tm.time;
                        cl.sDate = tm.sDate;
                        cl.eDate = tm.eDate;
                        cl.isStart = tm.isStart;
                        cl.per = tm.per;
                        cl.tag = Convert.ToString(dt.Rows[0]["a_tag"]);
                        cl.desc = Convert.ToString(dt.Rows[0]["a_desc"]);
                        type = Convert.ToInt32(dt.Rows[0]["a_type"]);
                        if (type == 0) cl.type = "Open Bid";
                        else cl.type = "Closed Bid";
                        cl.price = Convert.ToInt32(dt.Rows[0]["a_price"]);
                        cl.cID = Convert.ToInt32(dt.Rows[0]["client_id"]);
                        cl.rate = Convert.ToInt32(dt.Rows[0]["a_rate"]);
                        if (dt.Rows[0]["total_rtr"] == null) cl.totalRtr = 0;
                        else cl.totalRtr = Convert.ToInt32(dt.Rows[0]["total_rtr"]);
                    }
                    else cl = null;
                    if (cl.id > 0)
                    {
                        response.isSuccess = true;
                        response.msg = "Success";
                    }
                    else
                    {
                        response.isSuccess = false;
                        response.msg = "ERROR";
                    }
                }
            }
            catch (Exception ex)
            {
                response.isSuccess = false;
                response.msg = ex.Message.ToString();
            }
            return cl;
        }
        [HttpPost]
        [Route("_setBid")]
        public string SetBid(Bid bid)
        {
            string msg = "";
            try
            {
                if (this.count == 0)
                {

                    count++;

                    cmd = new SqlCommand("_setBid", conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@auction_id", bid.auction_id);
                    cmd.Parameters.AddWithValue("@email", bid.email);
                    cmd.Parameters.AddWithValue("@price", bid.price);


                    conn.Open();
                    int i = cmd.ExecuteNonQuery();
                    conn.Close();

                    if (i > 0)
                        msg = "Success";
                    else
                        msg = "Error";
                }
            }
            catch (Exception ex)
            {
                msg = ex.Message;
            }

            return msg;

        }

        [HttpPost]
        [Route("_updateBid")]
        public string UpdateBidInfo(Auction auction)
        {
            string msg = "";
            Client cl = new Client();
            try
            {
                if (this.count == 0)
                {

                    count++;
                    cmd = new SqlCommand("_updateBid", conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@title", auction.title);
                    cmd.Parameters.AddWithValue("@desc", auction.desc);
                    cmd.Parameters.AddWithValue("@price", auction.price);
                    cmd.Parameters.AddWithValue("@picture", auction.pic);
                    cmd.Parameters.AddWithValue("@sDate", auction.sDate);
                    cmd.Parameters.AddWithValue("@eDate", auction.eDate);
                    cmd.Parameters.AddWithValue("@access", auction.access);
                    cmd.Parameters.AddWithValue("@a_id", auction.id);
                    cmd.Parameters.AddWithValue("@tag", auction.tag);
                    cmd.Parameters.AddWithValue("@type", auction.type);


                    conn.Open();
                    int i = cmd.ExecuteNonQuery();
                    conn.Close();

                    if (i > 0)
                    {
                        msg = "Success";
                    }
                    else
                        msg = "Error";
                }
            }
            catch (Exception ex)
            {
                msg = ex.Message;
            }

            return msg;
        }

        [HttpPost]
        [Route("_addView")]
        public string AddView(Auction auction)
        {
            string msg = "";
            try
            {

                cmd = new SqlCommand("_addView", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@auction_id", auction.id);
                cmd.Parameters.AddWithValue("@client_id", auction.cID);
                conn.Open();
                int i = cmd.ExecuteNonQuery();
                conn.Close();
                if (i > 0)
                {
                    msg = "Success";
                }
                else
                    msg = "Error";
                return msg;
            }
            catch (Exception ex)
            {
                msg = ex.Message;
            }

            return msg;
        }

        [HttpPost]
        [Route("_addRate")]
        public string AddRate(Auction auction)
        {
            string msg = "";
            try
            {
                if (count == 0)
                {
                    cmd = new SqlCommand("_addRate", conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@auction_id", auction.id);
                    cmd.Parameters.AddWithValue("@client_id", auction.cID);
                    cmd.Parameters.AddWithValue("@value", auction.rate);
                    conn.Open();
                    int i = cmd.ExecuteNonQuery();
                    conn.Close();
                    if (i > 0)
                    {
                        msg = "SUCCESS";
                    }
                    else
                        msg = "ERROR";
                }
                return msg;
            }
            catch (Exception ex)
            {
                msg = ex.Message;
            }

            return msg;
        }

        [HttpPost]
        [Route("_openBid")]
        public double OpenBid(Auction auction)
        {

            double msg = 0.0;
            {
                try
                {
                    count++;
                    da = new SqlDataAdapter("_openBid", conn);
                    da.SelectCommand.CommandType = CommandType.StoredProcedure;
                    da.SelectCommand.Parameters.AddWithValue("@auction_id", auction.id);

                    DataTable dt = new DataTable();
                    da.Fill(dt);

                    int i = 0;
                    if (dt.Rows.Count > 0)
                    {
                        msg = Convert.ToDouble(dt.Rows[0]["b_price"]);
                    }

                    return msg;
                }
                catch (Exception ex)
                {
                    msg = 0;
                }

                return msg;
            }

        }
[HttpPost]
        [Route("_closeBid")]
        public double CloseBid(Auction auction)
        {

            double msg = 0.0;
            {
                try
                {
                    count++;
                    da = new SqlDataAdapter("_closeBid", conn);
                    da.SelectCommand.CommandType = CommandType.StoredProcedure;
                    da.SelectCommand.Parameters.AddWithValue("@auction_id", auction.id);
                    da.SelectCommand.Parameters.AddWithValue("@email", auction.title);

                    DataTable dt = new DataTable();
                    da.Fill(dt);

                    int i = 0;
                    if (dt.Rows.Count > 0)
                    {
                        msg = Convert.ToDouble(dt.Rows[0]["b_price"]);
                    }

                    return msg;
                }
                catch (Exception ex)
                {
                    msg = 0;
                }

                return msg;
            }

        }
        [HttpGet]
        [Route("_getCategory")]
        public List<Category> GetCategory()
        {
            List<Category> categories = new List<Category>();
            Category cl = new Category();

            try
            {
                    da = new SqlDataAdapter("_getCategory", conn);
                    da.SelectCommand.CommandType = CommandType.StoredProcedure;
             

                    DataTable dt = new DataTable();
                    da.Fill(dt);
                    if (dt.Rows.Count > 0)
                    {
                        cl.title = "Accessories";
                        cl.amount = Convert.ToInt32(dt.Rows[0]["accessories"]);
                        categories.Add(cl);
                    cl = new Category();
                        cl.title = "Electronics";
                        cl.amount = Convert.ToInt32(dt.Rows[0]["electronics"]);
                        categories.Add(cl);
                    cl = new Category();
                    cl.title = "Cars";
                    cl.amount = Convert.ToInt32(dt.Rows[0]["cars"]);
                    categories.Add(cl);
                    cl = new Category();
                    cl.title = "Fashion";
                    cl.amount = Convert.ToInt32(dt.Rows[0]["fashion"]);
                    categories.Add(cl);
                    cl = new Category();
                    cl.title = "Art";
                    cl.amount = Convert.ToInt32(dt.Rows[0]["art"]);
                    categories.Add(cl);
                    cl = new Category();
                    cl.title = "Pets";
                    cl.amount = Convert.ToInt32(dt.Rows[0]["pets"]);
                    categories.Add(cl);

                }
                    else cl = null;
                
            }
            catch (Exception ex)
            {
                return null;
            }
            return categories;
        }

        [HttpPost]
        [Route("_OpenBidWinner")]
        public Client OpenBidWinner(Auction auction)
        {
            Client client = new Client();

            {
                try
                {
                    count++;
                    da = new SqlDataAdapter("_getOpenBidWinner", conn);
                    da.SelectCommand.CommandType = CommandType.StoredProcedure;
                    da.SelectCommand.Parameters.AddWithValue("@auction_id", auction.id);

                    DataTable dt = new DataTable();
                    da.Fill(dt);
                    if (dt.Rows.Count > 0)
                    {
                        client.email = Convert.ToString(dt.Rows[0]["email"]);
                    }

                    return client;
                }
                catch (Exception ex)
                {
                    return null;
                }

                return null;
            }

        }
    }
}