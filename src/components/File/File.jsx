import { Moralis } from "moralis";
import { useMoralisFile, useMoralis } from "react-moralis";
import React, { useState, useEffect } from "react";



export default function File ({t}) {

    const {  saveFile } = useMoralisFile(); //   error, isUploading, moralisFile, saveFile,

  //   async function setData(object) {
    
  //   const query = new Moralis.Query("EthTransactionsFiles");
  //   query.equalTo("transaction", object);  
  //   const EthTransactionFile = await query.first();
  //   if(EthTransactionFile)
  //   {
  //     setCategorySelected(EthTransactionFile.get('category'));
  //   }

  // }

async function uploadFile(event, object) {
    
    if (event.target.files[0]) {

        const file = event.target.files[0];
        const fileName = event.target.files[0].name;
  
         //console.log("objectId" + object)
         //console.log("file: " + event.target.files[0])
         //console.log("name: " + event.target.files[0].name)
         console.log("LINK " + object)
  
         const moralisFile = await saveFile(fileName, file, {throwOnError: true, saveIPFS: true});
      
      
      
        // see if in DB
      const query = new Moralis.Query("EthTransactionsFiles");
      query.equalTo("hash", object);  
      const EthTransactionFile = await query.first();
      if(EthTransactionFile)
      {
        EthTransactionFile.set("transactionFile", moralisFile);
        EthTransactionFile.set("ipfs", moralisFile.ipfs());
        EthTransactionFile.set("fhash", moralisFile.hash());

        await EthTransactionFile.save().then(function(file) { // await user.save()??
            console.log("upload done", file)
          }, function(error) {
            console.log("there was an error", error);
          });
  } 
      else // else change in DB
      {
       
       const EthTransactionFile = new Moralis.Object('EthTransactionsFiles')
       EthTransactionFile.set("hash", object);
       EthTransactionFile.set("transactionFile", moralisFile);
       EthTransactionFile.set("ipfs", moralisFile.ipfs());
       EthTransactionFile.set("fhash", moralisFile.hash());

       await EthTransactionFile.save().then(function(file) { // await user.save()??
        console.log("upload done", file)
      }, function(error) {
        console.log("there was an error", error);
      });

    } 

    }
  }  

  async function displayFile(object) {

    console.log("clicked " + object)
    const query = new Moralis.Query("EthTransactionsFiles");
    query.equalTo("hash", object);  
    const EthTransactionFile = await query.first();
    if(EthTransactionFile)
    {
    let fileUrl = EthTransactionFile.get("ipfs")
    if(fileUrl)
    {
        window.open(fileUrl, "_blank");
    } 
} 
else 
{
    alert("No file for this transaction.")
} 

      }

      const { isAuthenticated } = useMoralis();

      useEffect(() => {

        if (isAuthenticated) {
        }
        else {
          console.log("Not connected");
        }

} , [isAuthenticated]);


 return (
    <div>
     <input type="file" id="notesFile" onChange={(e) => uploadFile(e, t)}></input>
     <button onClick={(e) => displayFile(t)}>Open file</button>
     </div>
     );

}  