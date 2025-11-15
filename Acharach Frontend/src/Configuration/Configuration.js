module.exports= {
    chkConn:"http://localhost:12758/api/Conn/_chkConn",
    RegisterClient: 'http://localhost:12758/api/Conn/_register',
    GetClient : "http://localhost:12758/api/Login/_login" ,
    GetClients:'http://localhost:12758/api/Conn/_getClients',
    UpdateClientInfo:'http://localhost:12758/api/Client/_setClientInfo',
    AddItem:"http://localhost:12758/api/Auction/_addAuction",
    GetAuction:"http://localhost:12758/api/Auction/_getAuction",
    GetClientInfo:"http://localhost:12758/api/Client/_getClientInfo",
    SetClientAddress:"http://localhost:12758/api/Client/_setClientAddress",
    GetSelectedAuction:"http://localhost:12758/api/Auction/_getSelectedAuction",
    GetMyBid:"http://localhost:12758/api/Auction/_getMyBid",
    UpdateAuctionInfo:"http://localhost:12758/api/Auction/_updateBid",
    SetBid:"http://localhost:12758/api/Auction/_setBid",
    IncView:"http://localhost:12758/api/Auction/_addView",
    getLivePrice:"http://localhost:12758/api/Auction/_openBid",
    IncRate:"http://localhost:12758/api/Auction/_addRate",
    DeactivateAccount:"http://localhost:12758/api/Client/_deactivateAccount",
    getClosedPrice:"http://localhost:12758/api/Auction/_closeBid",
        //Payment
        ChkBidPayment:"http://localhost:12758/api/Pay/_get_Bid_Payment",
        PayBidPayment:"http://localhost:12758/api/Pay/_pay_Bid",
       PayProPayment:"http://localhost:12758/api/Pay/_upgrade_account-pro",
       PayPremiumPayment:"http://localhost:12758/api/Pay/_upgrade_account-premium",

        //Search
        SearchAuction:"http://localhost:12758/api/Search/_searchAuction",
        SearchClient:"http://localhost:12758/api/Search/_searchClient",
         //Catagory
         GetCategory:"http://localhost:12758/api/Auction/_getCategory",

            //Open Bid Winner
         GetOpenWinner:"http://localhost:12758/api/Auction/_OpenBidWinner",

         //Get Notification
         GetNotf:"http://localhost:12758/api/Notifie/_getNotification", 
         GetTopNotf:"http://localhost:12758/api/Notifie/_getTopNotification",
         SetNotf:"http://localhost:12758/api/Notifie/_notify",

         //Get Admin
         GetAdmin : "http://localhost:12758/api/Login/_loginAdmin" ,
         ActivateClient : "http://localhost:12758/api/Admin/_activate" ,
         DeactivateClient : "http://localhost:12758/api/Admin/_deactivate"

}