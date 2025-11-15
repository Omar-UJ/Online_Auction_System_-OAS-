using System;
using System.Collections.Generic;
using System.Web.Http;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using _API.Models;
using AOAS;
using System.IO;


namespace _API.Controllers
{
    [RoutePrefix("api/Conn")]

    public class ConnController : ApiController
    {
        SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["connect"].ConnectionString);
        SqlCommand cmd = null;
        SqlDataAdapter da = null;

        
        PED ped = new PED();
        [HttpPost]
        [Route("_register")]
        public string Registration(Client client)
        {
            string msg = string.Empty;
            try
            {

                cmd = new SqlCommand("_registration", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@fname", client.first_name);
                cmd.Parameters.AddWithValue("@lname", client.last_name);
                cmd.Parameters.AddWithValue("@email", client.email);
                cmd.Parameters.AddWithValue("@password", ped.Enc(client.password));
                cmd.Parameters.AddWithValue("@pnumber", client.telephone);
                cmd.Parameters.AddWithValue("@dob", client.dob);
               


                conn.Open();
                int i = cmd.ExecuteNonQuery();
                conn.Close();

                if (i > 0)
                    msg = "SUCCESS";
                else
                    msg = "ERROR";
            }
            catch (Exception ex)
            {
                msg = ex.Message;
            }

            return msg;
        }

        [HttpGet]
        [Route("_getClients")]
        public List<Client> GetClients()  
        { List<Client> clients = new List<Client>();
            Response response = new Response();
            
            try
            {
               
                da = new SqlDataAdapter("select first_name,last_name,email,telephone,status from _user where status>99 AND status<700", conn);
                DataTable dt = new DataTable();
              
                
                da.Fill(dt);
                if (dt.Rows.Count > 0)
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        Client cl = new Client();
                        cl.first_name = Convert.ToString(dt.Rows[i]["first_name"]);
                        cl.last_name = Convert.ToString(dt.Rows[i]["last_name"]);
                        cl.email = Convert.ToString(dt.Rows[i]["email"]);
                        cl.telephone = Convert.ToInt32(dt.Rows[i]["telephone"]);
                        cl.status = Convert.ToInt32(dt.Rows[i]["status"]);
                        clients.Add(cl);
                    }
                if (clients.Count > 0)
                {
                    response.isSuccess = true;
                    response.msg = "Success";
                    //response.clients = clients;
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
            return clients;
        }
    }
    }
