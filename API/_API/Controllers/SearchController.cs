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
    [RoutePrefix("api/Search")]
    public class SearchController : ApiController
    {
        SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["connect"].ConnectionString);
        SqlDataAdapter da = null;
        SqlCommand cmd = null;
        AuctionController ac = new AuctionController();

        [HttpPost]
        [Route("_searchAuction")]
        public List<Auction> SearchAuction(Search search)
        {
            List<Auction> auction = new List<Auction>();
            string queryString = " SELECT * FROM auction WHERE a_name LIKE  '%"+search.search+"%'" +
                "OR a_tag LIKE '%" + search.search + "%'" +
                "ORDER BY a_rate DESC";
          try
            {

                conn.Open();
                da = new SqlDataAdapter(queryString, conn);
    

                DataTable dt = new DataTable();
               
                da.Fill(dt);

                if (dt.Rows.Count > 0)
                {
                    int type = 0;
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {

                        Auction cl = new Auction();
                        Auction tm = new Auction();
                        cl.title = Convert.ToString(dt.Rows[i]["a_name"]);
                        cl.pic = ((byte[])dt.Rows[i]["a_pictures"]);
                        cl.id = Convert.ToInt32(dt.Rows[i]["auction_id"]);
                        tm = ac.compareDate(Convert.ToString(dt.Rows[i]["a_start"]), Convert.ToString(dt.Rows[i]["a_end"]));
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
                    return auction;
                }return null;
            }
            catch (Exception ex)
            {
               return null;
            }
        }

        [HttpPost]
        [Route("_searchClient")]
        public List<Client> SearchClient(Search search)
        {
            List<Client> client = new List<Client>();
            string queryString = " SELECT * FROM _user WHERE email LIKE  '%" + search.search + "%' AND status > 100 AND status < 700" +
                "OR first_name LIKE '%" + search.search + "%' AND status > 100 AND status < 700";
            try
            {

                conn.Open();
                da = new SqlDataAdapter(queryString, conn);


                DataTable dt = new DataTable();

                da.Fill(dt);

                if (dt.Rows.Count > 0)
                {
                    int type = 0;
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {

                        Client cl = new Client();
                        cl.first_name = Convert.ToString(dt.Rows[i]["first_name"]);
                        cl.last_name = Convert.ToString(dt.Rows[i]["last_name"]);
                        cl.email = Convert.ToString(dt.Rows[i]["email"]);
                        cl.telephone = Convert.ToInt32(dt.Rows[i]["telephone"]);
                        cl.status = Convert.ToInt32(dt.Rows[i]["status"]);
                        client.Add(cl);
                    }
                    return client;
                }
                return null;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}