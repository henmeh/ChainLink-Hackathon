import { Moralis } from "moralis";
import { useMoralisFile, useMoralis } from "react-moralis";
import React, { useState, useEffect } from "react";



export default function File ({t}) {

    const {  saveFile } = useMoralisFile(); //   error, isUploading, moralisFile, saveFile,
    const [myObject, setObject] = useState("No file saved for this transaction");
    const [fileLink, setFileLink] = useState("");
    const [isCopied, setIsCopied] = useState(false);


async function uploadFile(event, object) {
    
    if (event.target.files[0]) {

        const file = event.target.files[0];
        const fileName = event.target.files[0].name;
        
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
        EthTransactionFile.set("file_name", fileName);

        await EthTransactionFile.save().then(function(file) { // await user.save()??
            console.log("upload done", file)
            setObject(fileName)
            setFileLink(moralisFile.ipfs())
          }, function(error) {
            console.log("there was an error", error);
          });
  } 
      else // else add in DB
      {
       
       const EthTransactionFile = new Moralis.Object('EthTransactionsFiles')
       EthTransactionFile.set("hash", object);
       EthTransactionFile.set("transactionFile", moralisFile);
       EthTransactionFile.set("ipfs", moralisFile.ipfs());
       EthTransactionFile.set("fhash", moralisFile.hash());
       EthTransactionFile.set("file_name", fileName);

       await EthTransactionFile.save().then(function(file) { // await user.save()??
        console.log("upload done", file)
        setObject(fileName)
        setFileLink(moralisFile.ipfs())
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

      async function setButtonDisplay() {

        const query = new Moralis.Query("EthTransactionsFiles");
        query.equalTo("hash", t);  
        const EthTransactionFile = await query.first();
        if(EthTransactionFile)
        {
          setObject(EthTransactionFile.get('file_name'));
          setFileLink(EthTransactionFile.get("ipfs"))
      }
    
          }

      const { isAuthenticated } = useMoralis();

      useEffect(() => {

        if (isAuthenticated) {
          setButtonDisplay()
        }
        else {
          console.log("Not connected");
        }

} , [isAuthenticated]);

async function copyTextToClipboard() {
  if ('clipboard' in navigator) {
    return await navigator.clipboard.writeText(fileLink);
  } else {
    return document.execCommand('copy', true, fileLink);
  }
}

  // onClick handler function for the copy button
  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard()
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  }

 return (
    <div>
     <input type="file" id="notesFile" onChange={(e) => uploadFile(e, t)}></input>
     <button disabled={ myObject === "No file saved for this transaction" }  style={{backgroundColor: myObject === "No file saved for this transaction" ? "" : "green"}} 
     onClick={(e) => displayFile(t)}>
       { myObject }
       </button>
       <button disabled={ !fileLink } style={{backgroundColor: !fileLink ? "" : "#336d6f"}} onClick={handleCopyClick}>
        <span>{isCopied ? 'Copied!' : 'Copy file link'}</span>
          </button>
     </div>
     );

}  