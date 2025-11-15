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
    [RoutePrefix("api/Client")]
    public class ClientController : ApiController
    {
        SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["connect"].ConnectionString);
        SqlDataAdapter da = null;
        gliResponse response =null;
        SqlCommand cmd;
        string email = "";

        [HttpPost]
        [Route("_getClientInfo")]
        public gliResponse GetClientInfo(Client client)
        {
            response = new gliResponse();
            Client cl = new Client();
            try
            {
                da = new SqlDataAdapter("_getClientInfo", conn);
                da.SelectCommand.CommandType = CommandType.StoredProcedure;
                da.SelectCommand.Parameters.AddWithValue("@email", client.email);
                DataTable dt = new DataTable();
                da.Fill(dt);
                if (dt.Rows.Count > 0)
                {
                    cl.first_name = Convert.ToString(dt.Rows[0]["first_name"]);
                    cl.last_name = Convert.ToString(dt.Rows[0]["last_name"]);
                    cl.id = Convert.ToInt32(dt.Rows[0]["user_id"]);
                    cl.email = Convert.ToString(dt.Rows[0]["email"]);
                    cl.telephone = Convert.ToInt32(dt.Rows[0]["telephone"]);
                    cl.profilePic = ((byte[])dt.Rows[0]["pic"]);
                    cl.cID =  Convert.ToInt32(dt.Rows[0]["client_id"]);

                    cl.country = "" + Convert.ToString(" "+dt.Rows[0]["country"]);
                    cl.city = "" + Convert.ToString(" " + dt.Rows[0]["city"]);
                    cl.street = ""+Convert.ToString(" " + dt.Rows[0]["street"]);
                    cl.zipCode = Convert.ToInt32("0"+dt.Rows[0]["zipCode"]);
                    
                    response.isSuccess = true;
                    response.msg = "SUCCESS";
                    response.client = cl;  
                }
                else
                {
                    response.isSuccess = false;
                    response.msg = "ERROR";
                    response.client = null;
                }
            }
            catch (Exception ex)
            {
                response.isSuccess = false;
                response.msg = ex.Message.ToString();
                response.client = null;
            }
            return response;
        }

        [HttpPost]
        [Route("_deactivateAccount")]
        public gliResponse DeactivateAccount(Client client)
        {
            response = new gliResponse();
            Client cl = new Client();
            try
            {
                da = new SqlDataAdapter("_deactivateAccount", conn);
                da.SelectCommand.CommandType = CommandType.StoredProcedure;
                da.SelectCommand.Parameters.AddWithValue("@email", client.email);
                DataTable dt = new DataTable();
                da.Fill(dt);
                if (dt.Rows.Count > 0)
                {
                    response.isSuccess = false;
                    response.msg = "ERROR";
                    response.client = null;
                }
                else
                {
                     cl.id = Convert.ToInt32(" "+dt.Rows[0]["user_id"]);
                    response.isSuccess = true;
                    response.msg = "SUCCESS";
                    response.client = cl; 
                }
            }
            catch (Exception ex)
            {
                response.isSuccess = false;
                response.msg = ex.Message.ToString();
                response.client = null;
            }
            return response;
        }

        [HttpPost]
        [Route("_setClientAddress")]
        public string SetClientAddress(Client client)
        {
            string msg = "";
            Client cl = new Client();
            int id = Convert.ToInt32(client.id);
            try
            {
                cmd = new SqlCommand("_setClientAddress", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@country", client.country);
                cmd.Parameters.AddWithValue("@city", client.city);
                cmd.Parameters.AddWithValue("@street", client.street);
                cmd.Parameters.AddWithValue("@zipCode", client.zipCode);
                cmd.Parameters.AddWithValue("@u_id", id);

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
        [Route("_setClientInfo")]
        public IHttpActionResult SetClientInfo()
        {
            // Get the uploaded image from the request
            var httpRequest = HttpContext.Current.Request;
            var image = httpRequest.Files["pic"];
            var email = HttpContext.Current.Request["email"];
            if (email != null)
            {
                byte[] imageData = {0};
                if (image != null)
                {
                    // Save the image to a temporary location
                   var tempImagePath = Path.Combine(HttpContext.Current.Server.MapPath("~/Temp"), image.FileName);
                    image.SaveAs(tempImagePath);
                    // Read the image file as bytes
                    imageData = File.ReadAllBytes(tempImagePath);
                }
                using (conn)
                {
                    conn.Open();
                    using (cmd = new SqlCommand("_setClientInfo", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@first_name", HttpContext.Current.Request["first_name"]);
                        cmd.Parameters.AddWithValue("@last_name", HttpContext.Current.Request["last_name"]);
                        cmd.Parameters.AddWithValue("@email", email);
                        cmd.Parameters.AddWithValue("@pic", imageData);
                        cmd.ExecuteNonQuery();
                    }conn.Close();     
                }
                // Clean up the temporary image file
               // File.Delete(tempImagePath);
                return Ok("SUCCESS");
            }

            return BadRequest("ERROR");
        }
    }
}
