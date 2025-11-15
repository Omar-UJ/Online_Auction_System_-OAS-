using System;
using System.Web.Http;
using System.Data.SqlClient;
using System.Configuration;
using _API.Models;
using System.Data;
using System.IO;
using System.Web;

namespace _API.Controllers
{
    [RoutePrefix("api/Admin")]
    public class AdminController : ApiController
    {
        SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["connect"].ConnectionString);
        SqlDataAdapter da = null;
        gliResponse response =null;
        SqlCommand cmd;
        string email = "";

        [HttpPost]
        [Route("_deactivate")]
        public string deactivate(Client client)
        {
            string msg = "";
            Client cl = new Client();

            try
            {
                cmd = new SqlCommand("_deactivateClient", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@email", client.email);
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
            catch (Exception ex)
            {
                msg = ex.Message;
            }

            return msg;
        }
        [HttpPost]
        [Route("_activate")]
        public string activate(Client client)
        {
            string msg = "";
            try
            {
                cmd = new SqlCommand("_activateClient", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@email", client.email);
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
            catch (Exception ex)
            {
                msg = ex.Message;
            }

            return msg;
        }
    }
}
