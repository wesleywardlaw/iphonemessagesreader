# iPhone Messages Reader

## Interface

![screenshot0](https://user-images.githubusercontent.com/32420362/31694020-6d70b1d0-b367-11e7-901a-3faf788f5262.png)

![screenshot](https://user-images.githubusercontent.com/32420362/31694036-84aa7af2-b367-11e7-9c63-a9d6affc24c6.png)

## Setup

This application is a local utility for users to view their text messages from an iPhone backup.  The React client runs off of a webpack server and the api uses Node.  You will need [NodeJS](https://nodejs.org) installed to run it.

This backup was created from a phone running iOS 10.2. Folder structure of future backups could be somewhat different, although historically you need to be looking for the following file to get your messages:

3d0d7e5fb2ce288813306e4d4636395e047a3d28

After creating a backup from iTunes, in Windows 10 it will be stored in C:\Users\<yourusername>\AppData\Roaming\Apple Computer\MobileSync\Backup

From what I understand, the Mac location is ~/Library/Application Support/MobileSync/Backup/.  I have not been able to test at this time.

Inside that folder will be a folder with a name that is a long string of characters.  Within that will be folder are several other folders, one of which will be named 3d.  Inside 3d is the file needed.

To open the file, you will need something to read SQLite.  I used [SQLiteSpy](https://www.yunqa.de/delphi/products/sqlitespy/index).

Enter the following and execute the SQL (F9 in SQLiteSpy):

```
CREATE TABLE cleanmessages
(
  RowID,
  UniqueID,
  Type,
  Time,
  Date,
  Epoch,
  Text,
  AttachmentID
);

INSERT INTO cleanmessages SELECT 
            m.rowid as RowID,
            h.id AS UniqueID, 
            CASE is_from_me 
                WHEN 0 THEN "received" 
                WHEN 1 THEN "sent" 
                ELSE "Unknown" 
            END as Type, 
            CASE 
                WHEN date > 0 then TIME(date + 978307200, 'unixepoch', 'localtime')
                ELSE NULL
            END as Time,
            CASE 
                WHEN date > 0 THEN strftime('%Y%m%d', date + 978307200, 'unixepoch', 'localtime')
                ELSE NULL
            END as Date, 
            CASE 
                WHEN date > 0 THEN date + 978307200
                ELSE NULL
            END as Epoch, 
            text as Text,
            maj.attachment_id AS AttachmentID
        FROM message m
        LEFT JOIN handle h ON h.rowid = m.handle_id
        LEFT JOIN message_attachment_join maj
        ON maj.message_id = m.rowid
        ORDER BY UniqueID, Date, Time
``` 

Now save the database as messages.db and put it in the root of the api folder of your local copy of this project.

After discovering how to identify the database storing an attachment associated with a particular message([you can read about this topic here if you are interested](https://apple.stackexchange.com/questions/77432/location-of-message-attachments-in-ios-6-backup)), I was  unable to access the data and got an error about encryption, which I could not circumvent.  To get attachments I used [iBackupViewer](http://www.imactools.com/iphonebackupviewer/) and extracted them all.  In my experience, tools like this are extremely slow for viewing(which is why I wanted to create a React version), but it got the necessary files to use with this project.

If you are going to include attachments, save them in a folder called attachments inside the client folder of your local copy of this project.

## Running

To run the client, navigate to the client directory using the command prompt and enter npm start.

To run the server, navigate to the api directory using the command prompt and enter npm start.

Once running, you can access the project in the browser at http://localhost:8080/.

