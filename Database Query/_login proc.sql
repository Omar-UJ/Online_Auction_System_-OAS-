create proc _login(@email varchar(250),@password varchar(250))
AS
BEGIN
SELECT
u.status,
u.user_id user_id,
u.first_name first_name,
u.last_name last_name,
u.email email,
u.telephone telephone,
u.pic pic,
c.client_id client_id
FROM _user u
INNER JOIN client c
ON u.user_id = c.user_id
WHERE u.email = @email AND u.password = @password
END
/*----------------------------------------------------------------------------*/
create proc _getAuction
AS
BEGIN
SELECT (SELECT COUNT(auction_id)from bid WHERE auction_id=)AS total_bider,* from auction WHERE access = 1 AND 
ORDER BY a_rate DESC
END
/*----------------------------------------------------------------------------*/
create proc _getAuctionBySDateDESC
AS
BEGIN
SELECT * from auction WHERE access = 1
ORDER BY a_start DESC
END
/*----------------------------------------------------------------------------*/
create proc _getAuctionBySDateASC
AS
BEGIN
SELECT * from auction WHERE access = 1
ORDER BY a_start ASC
END
/*----------------------------------------------------------------------------*/
create proc _getAuctionByEDateDESC
AS
BEGIN
SELECT * from auction WHERE access = 1
ORDER BY a_end DESC
END
/*----------------------------------------------------------------------------*/
create proc _getAuctionByEDateASC
AS
BEGIN
SELECT * from auction WHERE access = 1
ORDER BY a_end ASC
/*----------------------------------------------------------------------------*/
create proc _getCategory
AS
BEGIN
SELECT Top(1)
(SELECT COUNT(auction_id)from auction WHERE a_tag LIKE '%accessories%')AS accessories ,
(SELECT COUNT(auction_id)from auction WHERE a_tag LIKE '%electronics%')AS electronics,
(SELECT COUNT(auction_id)from auction WHERE a_tag LIKE '%cars%')AS cars,
(SELECT COUNT(auction_id)from auction WHERE a_tag LIKE '%fashion%')AS fashion,
(SELECT COUNT(auction_id)from auction WHERE a_tag LIKE '%art%')AS art,
(SELECT COUNT(auction_id)from auction WHERE a_tag LIKE '%pet%')AS pets
From auction
END
/*----------------------------------------------------------------------------*/create proc _getTopRate
AS
BEGIN
SELECT TOP(3) *FROM auction WHERE access = 1 AND a_start >= GETDATE() AND a_rate >=8
ORDER BY a_rate DESC
END
/*----------------------------------------------------------------------------*/
create proc _openBid(@auction_id int)
AS
BEGIN
SELECT TOP 1 *FROM bid
WHERE auction_id = @auction_id
ORDER BY b_price DESC;
END
/*----------------------------------------------------------------------------*/
create proc _deactivateAccount(@email varchar(255))
AS
BEGIN
DELETE FROM _user WHERE email = @email AND 
NOT EXISTS(SELECT  a.auction_id,a.a_start ,u.user_id,c.client_id
FROM _user u INNER JOIN client as c 
ON u.user_id = c.user_id
INNER JOIN auction a
ON a.client_id = c.client_id WHERE u.email = @email AND a.a_start >GETDATE())
select user_id from _user where email =@email
END
_deactivateAccount 'ujemal32@gmail.com'


/*----------------------------------------------------------------------------*/
create proc _closeBid(@auction_id int,@email varchar(255))
AS
BEGIN
SELECT *FROM bid
WHERE auction_id = @auction_id AND email = @email
END

/*----------------------------------------------------------------------------*/
/*Notification*/

create proc _notify(@author_email varchar(250),@dest_email varchar(250),@title varchar(150),@desc varchar(250),@status int)
AS
BEGIN
INSERT INTO notification(title,description,destination_email,author_email,status,author_date)
SELECT @title,@desc,@dest_email,@author_email,@status,GETDATE()
WHERE NOT EXISTS (
SELECT destination_email
FROM notification WHERE title = title AND destination_email = @dest_email AND description = @desc AND author_email = @author_email
)
END

/*Get Notification*/

create proc _getNotification(@dest_email varchar(250))
AS
BEGIN
exec _setNotificationSeen @dest_email
SELECT *FROM notification
WHERE destination_email = @dest_email
ORDER BY author_date DESC
END

create proc _getTop3Notification(@dest_email varchar(250))
AS
BEGIN
SELECT *FROM notification
WHERE destination_email = @dest_email 
ORDER BY author_date DESC
END

create proc _setNotificationSeen(@dest_email varchar(250))
AS
BEGIN
update notification
set status = status+1
WHERE destination_email = @dest_email AND status<=101
END

/*----------------------------------------------------------------------------*/
/*Check And Update Bid Winner*/
create proc _chkWinner(@auction_id int)
AS
BEGIN
UPDATE bid 
set b_win = 1  
WHERE  auction_id = @auction_id AND b_price = (SELECT MAX(b_price)FROM bid WHERE auction_id = @auction_id)
AND EXISTS (
SELECT auction_id
FROM auction WHERE auction_id = @auction_id AND a_end < GETDATE())
END
/*GetWinner*/
create proc _getOpenBidWinner(@auction_id int)
AS
BEGIN
SELECT *FROM bid WHERE auction_id = @auction_id AND b_win = 1
END
/*----------------------------------------------------------------------------*/
/*Add Bid payment*/
create proc _payBid(@email varchar(250),@auction_id varchar(250),@pay_amount float,@tx_ref varchar(300))
AS
BEGIN
INSERT INTO _transaction(type,email,amount,date,tx_ref,status)
SELECT @auction_id,@email,@pay_amount,GETDATE(),@tx_ref,101
WHERE NOT EXISTS (
SELECT type,email
FROM _transaction WHERE type = @auction_id AND email = @email AND tx_ref = @tx_ref
)
END
/*----------------------------------------------------------------------------*/
/*get Bid payment*/
create proc _getBidPayment(@email int,@type varchar(250) NULL)
AS
BEGIN
SELECT *from _transaction WHERE email = @email AND type = @type
END

/*----------------------------------------------------------------------------*/
/*Add Pro Account payment*/
create proc _getProAccount(@email varchar(255),@pay_amount float,@tx_ref varchar(300))
AS
BEGIN
INSERT INTO _transaction(email,amount,date,tx_ref,status,type)
SELECT @email,@pay_amount,GETDATE(),@tx_ref,501,'Account'
WHERE NOT EXISTS (
SELECT email
FROM _transaction WHERE email = @email AND tx_ref = @tx_ref
)
END
/*----------------------------------------------------------------------------*/
/*Add Pro Account payment*/
create proc _getPremiumAccount(@email varchar(255),@pay_amount float,@tx_ref varchar(300))
AS
BEGIN
INSERT INTO _transaction(email,amount,date,tx_ref,status,type)
SELECT @email,@pay_amount,GETDATE(),@tx_ref,601,'Account'
WHERE NOT EXISTS (
SELECT email
FROM _transaction WHERE email = @email AND tx_ref = @tx_ref
)
END

/*----------------------------------------------------------------------------*/
/*get Account payment*/
create proc _getAccountPayment(@email varchar(255))
AS
BEGIN
SELECT email,status from _transaction WHERE email = @email AND status LIKE '%50%'
END

/*----------------------------------------------------------------------------*/
create proc _getSelectedAuction(@a_id int)
AS
BEGIN
exec _chkWinner @a_id
DECLARE @total_rtr int
SELECT total_rtr = (SELECT COUNT(*)from rate WHERE auction_id = @a_id),*FROM auction WHERE auction_id = @a_id
END

/*----------------------------------------------------------------------------*/
create proc _registration(@fname varchar(250),@lname varchar(250),@email varchar(250),@pnumber int,@password varchar(250),@dob date)
AS
BEGIN
INSERT INTO _user(first_name,last_name,email,telephone,password,dob,status,pic) VALUES (@fname,@lname,@email,@pnumber,@password,@dob,1,0)
SELECT user_id from _user WHERE email = @email
END
_registration 'Acharach','','Acharach@AOAS.COM',900000000,'',''
/*----------------------------------------------------------------------------*/

create proc _addView(@auction_id int,@client_id int)
AS
BEGIN
INSERT INTO _view(auction_id,viewer_id,view_date)
SELECT @auction_id,@client_id,GETDATE()
WHERE NOT EXISTS (
SELECT auction_id,viewer_id
FROM _view WHERE auction_id = @auction_id AND viewer_id = @client_id)
END
/*----------------------------------------------------------------------------*/
create proc _addRate(@auction_id int,@client_id int,@value int)
AS
BEGIN
INSERT INTO rate(auction_id,client_id,r_value)
SELECT @auction_id,@client_id,@value 
WHERE NOT EXISTS (
SELECT auction_id,client_id
FROM rate WHERE auction_id = @auction_id AND client_id = @client_id)
END

/*----------------------------------------------------------------------------*/
create proc _setClientAddress(@country varchar(250),@city varchar(250),@street varchar(250),@zipCode int,@u_id int)
AS
BEGIN
UPDATE address 
SET
country = @country,
city = @city,
street = @street,
zipCode = @zipCode WHERE u_id = @u_id
END
/*----------------------------------------------------------------------------*/

create proc _setClientInfo(@first_name varchar(250),@last_name varchar(250),@email varchar(250),@pic varbinary(max))
AS
BEGIN
UPDATE _user 
SET
first_name = @first_name,
last_name = @last_name,
pic = @pic
WHERE email = @email
END

/*----------------------------------------------------------------------------*/
create proc _updateBid(@title varchar(250),@desc varchar(250),@price int,@picture varchar(250),@sDate date,@eDate date,@access int,@a_id int,@tag varchar(250),@type varchar(250))
AS
BEGIN
UPDATE auction 
SET
a_name = @title,
a_desc =@desc,
a_price = @price,
a_pictures = @picture,
a_start = @sDate,
a_end =@eDate,
a_tag =@tag,
a_type =@type,
access = @access
WHERE auction_id = @a_id
END
/*----------------------------------------------------------------------------*/
  create proc _getClientInfo(@email varchar(250))
AS
BEGIN
SELECT
u.user_id user_id,
u.first_name,
u.last_name ,
u.email ,
u.telephone,
u.pic pic,
a.country,
a.city ,
a.street ,
a.zipCode,
c.client_id
FROM _user u
INNER JOIN client AS c
ON u.user_id = c.user_id 
INNER JOIN address a ON a.u_id = u.user_id
WHERE u.email = @email 
END
/*----------------------------------------------------------------------------*/
create proc _getClientAddress(@uid varchar(250))
AS
BEGIN
SELECT * from address WHERE u_id = @uid
END
/*----------------------------------------------------------------------------*/
create proc 
_addAuction(@title varchar(250),@desc varchar(250),@pic varbinary(max),@price float, @aucTag varchar(250),@aucType varchar(250),@aucStartDate smalldatetime, @aucEndDate smalldatetime,@client_id int,@access int,@a_view int,@a_rate decimal)
AS
BEGIN
INSERT INTO auction(a_name,a_desc,a_pictures,a_price,a_tag,a_type,a_start,a_end,client_id,access,a_view,a_rate) 
VALUES (@title,@desc,@pic,@price,@aucTag,@aucType,@aucStartDate,@aucEndDate,@client_id,@access,@a_view,@a_rate)
END

/*----------------------------------------------------------------------------*/
create proc 
_updateAuction(@client_id int,@item_id int)
AS
BEGIN
/*----------------------------------------------------------------------------*/
create proc _setBid(@auction_id int , @email varchar(250),@price float)
AS
BEGIN
INSERT INTO bid(auction_id,email,b_price) 
SELECT @auction_id,@email,@price
WHERE NOT  EXISTS (
SELECT auction_id,email
FROM bid WHERE auction_id = @auction_id AND email = @email) 
AND  EXISTS (
SELECT auction_id
FROM auction WHERE auction_id = @auction_id AND a_start < GETDATE() AND a_end > GETDATE())  
UPDATE bid 
set b_price = @price 
WHERE auction_id = @auction_id AND email = @email AND b_price < @price 
AND  EXISTS (
SELECT auction_id
FROM auction WHERE auction_id = @auction_id AND a_end > GETDATE())  
END
/*----------------------------------------------------------------------------*/
create trigger rate_auction
on rate
after insert
as begin 
set nocount on;
update auction 
set a_rate = (SELECT  AVG(r_value) FROM  rate WHERE auction_id = (select i.auction_id
from inserted as i))
where auction_id = (select i.auction_id
from inserted as i)
end
/*----------------------------------------------------------------------------*/
  create trigger notify_winner
on bid
after update
as begin 
set nocount on;
INSERT INTO notification(title,description,destination_email,author_email,status,author_date)
select 'Congrats on winning the auction!',
'You have successfully bid for and acquired the item you were after.

It is always amazing to watch someone win an auction, and we are excited that you came out on top. 
We are thrilled for you and hope that you will enjoy the item.

Warmest congratulations once again and thank you for participating.',i.email,'Acharach@AOAS.COM' ,i.auction_id,GETDATE()
from inserted as i
WHERE (select i.b_win from inserted as i)=1 AND  NOT EXISTS (
SELECT ntf_id
FROM notification WHERE destination_email = (select i.email from inserted as i)  AND status = (select i.auction_id from inserted as i)
)
end
/*----------------------------------------------------------------------------*/
  create trigger notify_new_account
on _user
after insert
as begin 
set nocount on;
INSERT INTO notification(title,description,destination_email,author_email,status,author_date)
select 'Welcome to Acharach!!',
'Dear '+i.first_name +',

We are so excited to welcome you to our community! Your account has been successfully created and is now ready for you to use. We are thrilled to have you on board and we look forward to providing you with a great user experience.
Please log in to your new account using the login credentials you provided during registration. If you have any questions, issues or concerns, please don’t hesitate to reach out to our customer support team.

Thank you for choosing to join our community. We are excited to have you join us.'
,i.email,'Acharach@AOAS.COM',i.user_id,GETDATE()
FROM inserted as i
WHERE  NOT EXISTS (
SELECT ntf_id
FROM notification WHERE destination_email = (select i.email from inserted as i)  AND status = (select i.user_id from inserted as i)
)
end
/*----------------------------------------------------------------------------*/
  create trigger notify_pay
on  _transaction
after insert
as begin 
set nocount on;
INSERT INTO notification(title,description,destination_email,author_email,status,author_date)
select 'Payment successfully received!',CONCAT('Dear ',i.email,'	
We wanted to take a moment to thank you for your payment amount of ',i.amount,' Birr for your participation in our site. 
We appreciate your interest and commitment to our community,Your payment has been successfully received.
We are excited to have you as part of the community and look forward to your contributions.

If you have any questions or concerns regarding the payment , please do not hesitate to contact us. Our customer support team is always available to help.

Thank you again for your support and we look forward to seeing you soon.')
,i.email,'Acharach@AOAS.COM',i.trans_id,GETDATE()
from inserted as i
WHERE  NOT EXISTS (
SELECT ntf_id
FROM notification WHERE destination_email = (select i.email from inserted as i)  AND status = (select i.trans_id from inserted as i)
)
end
/*----------------------------------------------------------------------------*/
/*
last 1 is for active user
last 2 is for deactive user
last 7 is for ban level 1  active user
last 8 is for ban level 2  active user
last 9 is for verified  active user

middle 1-3 is for limt  pro
middle 1-6 is for limt  premium


101 basic active
501 pro active
601 premium active
//////////////

111 basic/active
511-531 pro /limt of used 1-3/month/ active
611-671 premium/limt of used 1-7/month/active

53

*/
/*----------------------------------------------------------------------------*/
create trigger update_limit
on auction
after insert
as begin 
DECLARE @userid int
set nocount on;
set @userid = (select user_id from client where client_id = (select i.client_id from inserted as i))
update _user 
set status = status+10
where user_id = @userid
end

/*----------------------------------------------------------------------------*/
  create trigger notify_limit_reached
on auction
after insert
as begin 
DECLARE @email varchar(255)
DECLARE @userid int
DECLARE @stat int
DECLARE @fname varchar(255)
set nocount on;
set @userid = (select user_id from client where client_id = (select i.client_id from inserted as i))
set @email =( select email from _user where user_id = @userid)
set @stat = (select status from _user where user_id = @userid AND status  LIKE '%53%')
set @fname =( select first_name from _user where user_id = @userid)
INSERT INTO notification(title,description,destination_email,author_email,status,author_date)
select 'You have reached your limit for posting bids!',
'Dear '+@fname +',

We would like to thank you for being an active member of our community. We appreciate your participation and contributions to our platform.

In order to ensure that our platform remains fair and equitable for all users, we’d like to inform you that you have reached your limit for posting bids. 
We have implemented this policy in order to prevent spam and ensure that all members have equal opportunities to participate.

You can still view and monitor the bids, but you will not be able to place any additional bids until you upgrade your account or until the current month ends . 
Once the period has ended, you are free to place bid again.

If you have any questions or concerns, please don’t hesitate to contact our customer support team. Our support team is available to assist you.

Thank you for your understanding and cooperation.'
,@email,'Acharach@AOAS.COM' ,@stat+i.auction_id ,GETDATE()
from inserted as i
WHERE EXISTS(select status from _user where user_id = @userid AND status  LIKE '%53%') 
AND
NOT EXISTS (
SELECT ntf_id
FROM notification WHERE destination_email =@email AND status =@stat+(select i.auction_id from inserted as i)
)
OR
EXISTS(select status from _user where user_id = @userid AND status  LIKE '%66%') 
AND
NOT EXISTS (
SELECT ntf_id
FROM notification WHERE destination_email =@email AND status =@stat+(select i.auction_id from inserted as i)
)
end

/*----------------------------------------------------------------------------*/
create trigger trans_account
on _transaction
after insert
as begin 
set nocount on;
update _user 
set status = (select i.status from inserted  i)
where email = (select i.email from inserted as i)
AND (select i.status from inserted  i)>200
end
/*----------------------------------------------------------------------------*/
create trigger view_auction
on _view
after insert
as begin 
set nocount on;
update auction 
set a_view = a_view+1
where auction_id = (select i.auction_id
from inserted as i)
end
/*----------------------------------------------------------------------------*/
create trigger client_user
on _user
after insert,delete
as begin 
set nocount on;
insert into client(user_id)
select i.user_id
from inserted as i
where (select i.status from inserted  i)<700
end
/*----------------------------------------------------------------------------*/
create trigger admin_user
on _user
after insert,delete
as begin 
set nocount on;
insert into admin(user_id)
select i.user_id
from inserted as i
where (select i.status from inserted  i)>=700
end
/*----------------------------------------------------------------------------*/
create trigger address_user
on _user
after insert,delete
as begin 
set nocount on;
insert into address(u_id)
select i.user_id
from inserted as i
end
/*----------------------------------------------------------------------------*/

create trigger up_to_pro
on _transaction
after insert
as begin 
set nocount on;
update _user 
set status = 501
where (select i.status
from inserted as i) = 501 AND email = (select i.email from inserted as i )
end

/*----------------------------------------------------------------------------*/

create trigger up_to_premium
on _transaction
after insert
as begin 
set nocount on;
update _user 
set status = 601
where (select i.status
from inserted as i) = 601 AND email = (select i.email from inserted as i )
end