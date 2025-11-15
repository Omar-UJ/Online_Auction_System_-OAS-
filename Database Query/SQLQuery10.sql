CREATE TABLE [dbo].[_user](
	[user_id] [int]  PRIMARY KEY IDENTITY(10101010,1) NOT NULL,
	[first_name] [varchar](250) NULL,
	[last_name] [varchar](250) NULL,
	[email] [varchar](250) NULL,
	[dob] [date]NULL,
	[password] [varchar](250)NULL,
	[telephone] [int] NULL,
	[status] [int] NULL,
	[pic] [varchar](max) NULL,
	UNIQUE(email)
	)
CREATE TABLE [dbo].[client](
	[client_id] [int]  PRIMARY KEY IDENTITY(10000,1) NOT NULL,
	[user_id] [int] NULL)
	ALTER TABLE [dbo].[client]  WITH CHECK ADD  CONSTRAINT [FK_client_user] FOREIGN KEY([user_id])
REFERENCES [dbo].[_user] ([user_id])
ON DELETE CASCADE ON UPDATE CASCADE

CREATE TABLE [dbo].[auction](
	[auction_id] [int] PRIMARY KEY IDENTITY(1,1) NOT NULL,
	[client_id] [int] NULL,
	[a_name] [varchar](250) NULL,
	[a_desc] [varchar](250) NULL,
	[a_pictures] image NULL,
	[a_price] [float] NULL,
	[a_start] [date] NULL,
	[a_end] [date] NULL,
	[a_tag]  [varchar](250) NULL,
	[a_type]  [int] NULL,
	[a_view] [int] NULL,
	[access] [int] NULL,
	[a_rate] [decimal] NULL
	)
	

ALTER TABLE [dbo].[auction]  WITH CHECK ADD  CONSTRAINT [FK_auction_client] FOREIGN KEY([client_id])
REFERENCES [dbo].[client] ([client_id])
ON DELETE CASCADE ON UPDATE CASCADE
GO



CREATE TABLE [dbo].[bid](
	[b_id][int] PRIMARY KEY IDENTITY(1,1) NOT NULL,
	[auction_id] [int] NULL,
	[email] [varchar](250) NULL,
	[b_desc] [varchar](250) NULL,
	[b_price] [float] NULL,
	[b_time] [datetime] NULL,
	[b_win] [int]NULL
)
ALTER TABLE [dbo].[bid]  WITH CHECK ADD  CONSTRAINT [FK_bid_auction] FOREIGN KEY([auction_id])
REFERENCES [dbo].[auction] ([auction_id])
ON DELETE CASCADE ON UPDATE CASCADE
GO

CREATE TABLE [dbo].[account](
	[acc_id] [int] PRIMARY KEY IDENTITY(1,1) NOT NULL,
	[acc_number] int NULL,
	[client_id] int NOT NULL
	)
	ALTER TABLE [dbo].[account]  WITH CHECK ADD  CONSTRAINT [FK_account_client] FOREIGN KEY([client_id])
REFERENCES [dbo].[client] ([client_id])
ON DELETE CASCADE ON UPDATE CASCADE
GO


	CREATE TABLE [dbo].[address](
	[address_id] [int] PRIMARY KEY IDENTITY(1,1) NOT NULL,
	[u_id] [int]  NULL,
	[country] [varchar](250) NULL,
	[city] [varchar](250) NULL,
	[street] [varchar](250) NULL,
	[zipCode] [int] NULL
)

ALTER TABLE [dbo].[address]  WITH CHECK ADD  CONSTRAINT [FK_address_user] FOREIGN KEY([u_id])
REFERENCES [dbo].[_user] ([user_id])
ON DELETE CASCADE ON UPDATE CASCADE
GO



////////////////////////////////


CREATE TABLE [dbo].[admin](
	[admin_id] [int] PRIMARY KEY IDENTITY(1000,1) NOT NULL,
	[user_id] [int] NULL
	)

ALTER TABLE [dbo].[admin]  WITH CHECK ADD  CONSTRAINT [FK_admin_user] FOREIGN KEY([user_id])
REFERENCES [dbo].[_user] ([user_id])
GO

ALTER TABLE [dbo].[admin] CHECK CONSTRAINT [FK_admin_user]
GO


//////////////////////////////////////

CREATE TABLE [dbo].[_view](
	[v_id] [int] PRIMARY KEY  IDENTITY(1,1) NOT NULL,
	[view_date] date NULL,
	[viewer_id] int NULL,
	[auction_id] int NULL,
)
ALTER TABLE [dbo].[_view]  WITH CHECK ADD  CONSTRAINT [FK_view_client] FOREIGN KEY([viewer_id])
REFERENCES [dbo].[client] ([client_id])
ON  DELETE NO ACTION ON UPDATE NO ACTION
GO
ALTER TABLE [dbo].[_view]  WITH CHECK ADD  CONSTRAINT [FK_view_auction] FOREIGN KEY([auction_id])
REFERENCES [dbo].[auction] ([auction_id])
ON DELETE CASCADE ON UPDATE CASCADE
GO
///////////////////////
CREATE TABLE [dbo].[notification](
	[ntf_id] [int]PRIMARY KEY IDENTITY(1,1) NOT NULL,
	[title][text] NULL,
	[description] [text] NULL,
	[destination_email] [varchar](250) NULL,
	[author_email][varchar](250) NULL,
	[author_date][datetime]NULL,
	[status] int NULL
)
ALTER TABLE [dbo].[notification]  WITH CHECK ADD  CONSTRAINT [FK_notify_client] FOREIGN KEY([destination_email])
REFERENCES [dbo].[_user] ([email])
ON DELETE CASCADE ON UPDATE CASCADE
GO

/////////////////////////


CREATE TABLE [dbo].[rate](
	[rate_id] [int] PRIMARY KEY  IDENTITY(1,1) NOT NULL,
	[r_value] [int] NULL,
	[auction_id] [int] NULL,
	[client_id] [int] NULL
)

ALTER TABLE [dbo].[rate]  WITH CHECK ADD  CONSTRAINT [FK_rate_auction] FOREIGN KEY([auction_id])
REFERENCES [dbo].[auction] ([auction_id])
ON DELETE CASCADE ON UPDATE CASCADE
GO

///////////////////////////////////

CREATE TABLE [dbo].[_transaction](
	[trans_id] [int] PRIMARY KEY  IDENTITY(1,1) NOT NULL,
	[amount] [float] NULL,
	[type] [varchar](250) NULL,
	[email] [varchar](250) NULL,
	[date] [datetime] NULL,
	[tx_ref] [varchar](300) NULL,
	[status] [int] NULL
)
ALTER TABLE [dbo].[_transaction]  WITH CHECK ADD  CONSTRAINT [FK_transaction_user] FOREIGN KEY([email])
REFERENCES [dbo].[_user] ([email])
ON DELETE NO ACTION ON UPDATE NO ACTION
GO
