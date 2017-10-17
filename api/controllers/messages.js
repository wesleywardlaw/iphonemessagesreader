const SqliteJsonExport = require('sqlite-json-export');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./messages.db');
const exporter = new SqliteJsonExport(db);

exports.fetchMessages = function(req,res){
    let select ='';
    if(req.params.date!==('20000101')){
        select = `SELECT * FROM cleanmessages WHERE UniqueID='${req.params.id}' AND Date>='${req.params.date}'`
    } else{
        select = `SELECT * FROM cleanmessages WHERE UniqueID='${req.params.id}'`;
    }
   
    exporter.json(select, (err, messages) => {
        if(err){
            console.log(err);
        }
        const attachmentselect = "SELECT filename, ROWID FROM attachment";
        exporter.json(attachmentselect, (err, attachments ) => {
            if(err){
                console.log(err);
            }
            res.send({messages,attachments});
        });
      });
   
}
    
