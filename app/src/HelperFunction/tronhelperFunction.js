// const TronWeb = require('tronweb');

import { BiLogIn } from "react-icons/bi";

// const HttpProvider = TronWeb.providers.HttpProvider;
// const tronWeb = new TronWeb({
//      fullNode = new HttpProvider(config?.TRON?.rpc),
//      solidityNode = new HttpProvider(config?.TRON?.rpc),
//      eventServer = new HttpProvider(config?.TRON?.rpc),
//     //  privateKey = "997af1ce8fe2af79f3448133f7d916d7a4a3fa7995f8db6c05d3d8d9b4759898";
//   });
export const CONTRACT_ADDRESS = "TJp6195fjpaGGt37MNfQojTgAQmaYCz3m2";

  export const onConnectTron = async () => {
    return new Promise(async (resolve, reject) => {
     

      try {
       
        const res = await window?.tronLink?.request({ method: 'tron_requestAccounts' });
        console.log(res,"res123");
       
        if(res.code==200){
          const tronweb = window.tronWeb
          const user_tron = tronweb.defaultAddress.base58;
           const userBalance = await tronweb.trx.getBalance(user_tron);
           const contractBalance = await tronweb.trx.getBalance('TJp6195fjpaGGt37MNfQojTgAQmaYCz3m2');
           console.log(contractBalance,"contractBalance");
           resolve({
            walletAddress:user_tron,
            walletBalance:Math.round(userBalance/1e6),
            joiningPackage:100,
            contract:"TJp6195fjpaGGt37MNfQojTgAQmaYCz3m2",
            contract_balance:contractBalance
            // instance:instance
           })
          }else{
            alert("Tronlink wallet is missing.")
          }

          
        
        
      } catch (err) {
        alert(
          `Download Tronlink Extension.`
        );
        console.error(err);
        reject(err);
        
      }
    
      
    })
  
  
    
  };

  export function getTronContract() {
    return window.tronWeb.contract().at("TJp6195fjpaGGt37MNfQojTgAQmaYCz3m2");
  }



 async function investment(){
    
    const t = await getTronContract();
    const user_tron = window.tronWeb.defaultAddress.base58;
    const invest = await t.methods
    .invest("1000000","399")
    .send({
      value: 0,
      from: user_tron,
    });
    console.log(invest,"invest");

  }


  
