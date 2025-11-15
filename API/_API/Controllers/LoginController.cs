using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using _API.Models;
using AOAS;

namespace _API.Controllers
{

    [RoutePrefix("api/Login")]

    public class LoginController : ApiController { 
    SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["connect"].ConnectionString);
    SqlDataAdapter da = null;
    PED ped = new PED();


        [HttpGet]
        [Route("_chkConn")]
        public bool chkConn()
        {
         
            //using (SqlCommand cmd = new SqlCommand("_registration 'umer,'jemal','ujemal@gmail.com',12345678','0923233454')", conn))
            //{
              
            //    conn.Open();
            //    int i = cmd.ExecuteNonQuery();
            //    conn.Close();
            //    if (i > 0)
            //        return true;
            //    else return false;
            //}
            return true;
        }

        [HttpPost]
        [Route("_login")]
        public Response Login(Client client)
        {
            Response response = new Response();

            Client cl = new Client();
            try
            {

                da = new SqlDataAdapter("_login", conn);
                da.SelectCommand.CommandType = CommandType.StoredProcedure;
                da.SelectCommand.Parameters.AddWithValue("@email", client.email);
                da.SelectCommand.Parameters.AddWithValue("@password", ped.Enc(client.password));
                DataTable dt = new DataTable();
                da.Fill(dt);
                if (dt.Rows.Count > 0)
                {
                    cl.first_name = Convert.ToString(dt.Rows[0]["first_name"]);
                    cl.last_name = Convert.ToString(dt.Rows[0]["last_name"]);
                    cl.email = Convert.ToString(dt.Rows[0]["email"]);
                    cl.telephone = Convert.ToInt32(dt.Rows[0]["telephone"]);
                    cl.cID = Convert.ToInt32(dt.Rows[0]["client_id"]);
                    cl.id = Convert.ToInt32(dt.Rows[0]["user_id"]);
                    cl.status = Convert.ToInt32(dt.Rows[0]["status"]);
                    cl.profilePic =(byte[])dt.Rows[0]["pic"];
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
        [Route("_loginAdmin")]
        public Response LoginAdmin(Client client)
        {
            Response response = new Response();

            Client cl = new Client();
            try
            {

                da = new SqlDataAdapter("_loginAdmin", conn);
                da.SelectCommand.CommandType = CommandType.StoredProcedure;
                da.SelectCommand.Parameters.AddWithValue("@email", client.email);
                da.SelectCommand.Parameters.AddWithValue("@password", ped.Enc(client.password));
                DataTable dt = new DataTable();
                da.Fill(dt);
                if (dt.Rows.Count > 0)
                {
                    cl.first_name = Convert.ToString(dt.Rows[0]["first_name"]);
                    cl.last_name = Convert.ToString(dt.Rows[0]["last_name"]);
                    cl.email = Convert.ToString(dt.Rows[0]["email"]);
                    cl.telephone = Convert.ToInt32(dt.Rows[0]["telephone"]);
                    cl.cID = Convert.ToInt32(dt.Rows[0]["admin_id"]);
                    cl.id = Convert.ToInt32(dt.Rows[0]["user_id"]);
                    cl.status = Convert.ToInt32(dt.Rows[0]["status"]);
                    cl.profilePic =(byte[])dt.Rows[0]["pic"];
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



    }
}
