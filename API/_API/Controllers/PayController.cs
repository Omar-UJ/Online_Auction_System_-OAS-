using System;
using System.Web.Http;
using System.Data.SqlClient;
using System.Configuration;
using _API.Models;
using System.Data;

namespace _API.Controllers
{
    [RoutePrefix("api/Pay")]
    public class PayController : ApiController
    {
        SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["connect"].ConnectionString);
        SqlDataAdapter da = null;
        gliResponse response = null;
        SqlCommand cmd;

        [HttpPost]
        [Route("_get_Bid_Payment")]
        public bool GetBidPayment(Paymnet payment)
        {
            response = new gliResponse();
            Paymnet cl = new Paymnet();
            try
            {
                da = new SqlDataAdapter("_getBidPayment", conn);
                da.SelectCommand.CommandType = CommandType.StoredProcedure;
                da.SelectCommand.Parameters.AddWithValue("@email", payment.email);
                da.SelectCommand.Parameters.AddWithValue("@type", payment.type);
                DataTable dt = new DataTable();
                da.Fill(dt);
                if (dt.Rows.Count > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        [HttpPost]
        [Route("_pay_Bid")]
        public bool PayBid(Paymnet payment)
        {
            try
            {
                cmd = new SqlCommand("_payBid", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@email", payment.email);
                cmd.Parameters.AddWithValue("@type", payment.type);
                cmd.Parameters.AddWithValue("@pay_amount", payment.amount);
                cmd.Parameters.AddWithValue("@tx_ref", payment.tx_ref);
                conn.Open();
                int i = cmd.ExecuteNonQuery();
                conn.Close();

                if (i > 0)
                {
                    return true;
                }
                else
                    return false;
            }
            catch (Exception ex)
            {
                return false;
            }
        }



        [HttpPost]
        [Route("_upgrade_account-pro")]
        public bool UpAccountToPro(Paymnet payment)
        {
            try
            {
                cmd = new SqlCommand("_getProAccount", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@email", payment.email);
                cmd.Parameters.AddWithValue("@pay_amount", payment.amount);
                cmd.Parameters.AddWithValue("@tx_ref", payment.tx_ref);
                conn.Open();
                int i = cmd.ExecuteNonQuery();
                conn.Close();

                if (i > 0)
                {
                    return true;
                }
                else
                    return false;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        [HttpPost]
        [Route("_upgrade_account-premium")]
        public bool UpAccountToPremium(Paymnet payment)
        {
            try
            {
                cmd = new SqlCommand("_getPremiumAccount", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@email", payment.email);
                cmd.Parameters.AddWithValue("@pay_amount", payment.amount);
                cmd.Parameters.AddWithValue("@tx_ref", payment.tx_ref);
                conn.Open();
                int i = cmd.ExecuteNonQuery();
                conn.Close();

                if (i > 0)
                {
                    return true;
                }
                else
                    return false;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
