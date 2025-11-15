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
    [RoutePrefix("api/Notifie")]
    public class NotificationController : ApiController
    {
        SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["connect"].ConnectionString);
        SqlDataAdapter da = null;
        SqlCommand cmd = null;


        [HttpPost]
        [Route("_notify")]
        public string Notify(Notification notif)
        {
            string msg = "";
            try
            {
                cmd = new SqlCommand("_notify", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@author_email", notif.author_email);
                cmd.Parameters.AddWithValue("@dest_email", notif.dest_email);
                cmd.Parameters.AddWithValue("@title", notif.title);
                cmd.Parameters.AddWithValue("@desc", notif.desc);
                cmd.Parameters.AddWithValue("@status", notif.status);

                conn.Open();
                int i = cmd.ExecuteNonQuery();
                conn.Close();

                if (i > 0)
                    msg = "Success";
                else
                    msg = "Error";

            }
            catch (Exception ex)
            {
                msg = ex.Message;
            }
            return msg;

        }


        [HttpPost]
        [Route("_getNotification")]
        public List<Notification> GetNotification(Notification notif)
        {
            List<Notification> notifications = new List<Notification>();

            try
            {


                da = new SqlDataAdapter("_getNotification", conn);
                da.SelectCommand.CommandType = CommandType.StoredProcedure;
                da.SelectCommand.Parameters.AddWithValue("dest_email", notif.dest_email);
                DataTable dt = new DataTable();

                int type = 0;
                da.Fill(dt);
                if (dt.Rows.Count > 0)
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        Notification cl = new Notification();

                        cl.title = Convert.ToString(dt.Rows[i]["title"]);
                        cl.desc = Convert.ToString(dt.Rows[i]["description"]);
                        cl.date = Convert.ToString(dt.Rows[i]["author_date"]);
                        cl.author_email = Convert.ToString(dt.Rows[i]["author_email"]);
                        cl.dest_email = Convert.ToString(dt.Rows[i]["destination_email"]);
                        cl.status = Convert.ToInt32(dt.Rows[i]["status"]);

                        notifications.Add(cl);
                    }

            }
            catch (Exception ex)
            {
               
            }
            return notifications;
        }



        [HttpPost]
        [Route("_getTopNotification")]
        public List<Notification> GetTopNotification(Notification notif)
        {
            List<Notification> notifications = new List<Notification>();

            try
            {


                da = new SqlDataAdapter("_getTop3Notification", conn);
                da.SelectCommand.CommandType = CommandType.StoredProcedure;
                da.SelectCommand.Parameters.AddWithValue("dest_email", notif.dest_email);
                DataTable dt = new DataTable();

                int type = 0;
                da.Fill(dt);
                if (dt.Rows.Count > 0)
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        Notification cl = new Notification();

                        cl.title = Convert.ToString(dt.Rows[i]["title"]);
                        cl.desc = Convert.ToString(dt.Rows[i]["description"]);
                        cl.date = Convert.ToString(dt.Rows[i]["author_date"]);
                        cl.author_email = Convert.ToString(dt.Rows[i]["author_email"]);
                        cl.dest_email = Convert.ToString(dt.Rows[i]["destination_email"]);
                        cl.status = Convert.ToInt32(dt.Rows[i]["status"]);

                        notifications.Add(cl);
                    }

            }
            catch (Exception ex)
            {

            }
            return notifications;
        }

    }   

}