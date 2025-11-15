using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

namespace AOAS
{
    public class PED
    {
       private static String key = "sblw-3hn8-sqoy19";
        public  string Enc(string pass)
        {
            byte[] ary = UTF8Encoding.UTF8.GetBytes(pass);
            TripleDESCryptoServiceProvider tripleDES = new TripleDESCryptoServiceProvider();
            tripleDES.Key = UTF8Encoding.UTF8.GetBytes(key);
            tripleDES.Mode = CipherMode.ECB;
            tripleDES.Padding = PaddingMode.PKCS7;
            ICryptoTransform cryptoTransform = tripleDES.CreateEncryptor();
            byte[] result = cryptoTransform.TransformFinalBlock(ary,0,ary.Length);
            tripleDES.Clear();
            return Convert.ToBase64String(result,0,result.Length);
        }  public  string Dec(string pass)
        {
            byte[] ary = Convert.FromBase64String(pass);
            TripleDESCryptoServiceProvider tripleDES = new TripleDESCryptoServiceProvider();
            tripleDES.Key = UTF8Encoding.UTF8.GetBytes(key);
            tripleDES.Mode = CipherMode.ECB;
            tripleDES.Padding = PaddingMode.PKCS7;
            ICryptoTransform cryptoTransform = tripleDES.CreateDecryptor();
            byte[] result = cryptoTransform.TransformFinalBlock(ary,0,ary.Length);
            tripleDES.Clear();
            return UTF8Encoding.UTF8.GetString(result);
        }
    }
}
