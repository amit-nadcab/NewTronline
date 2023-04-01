// const TronWeb = require('tronweb');

import { BiLogIn } from "react-icons/bi";

// const HttpProvider = TronWeb.providers.HttpProvider;
// const tronWeb = new TronWeb({
//      fullNode = new HttpProvider(config?.TRON?.rpc),
//      solidityNode = new HttpProvider(config?.TRON?.rpc),
//      eventServer = new HttpProvider(config?.TRON?.rpc),
//     //  privateKey = "997af1ce8fe2af79f3448133f7d916d7a4a3fa7995f8db6c05d3d8d9b4759898";
//   });
// const contract_address = "TWYcq45CDSCo1Z4A8hNNxLza8eAeo1SVir";

  export const onConnectTron = async () => {
    const tronweb = window.tronWeb
    const user_tron = tronweb.defaultAddress.base58;
   
    if(tronweb && user_tron){
        const t = await getTronContract(tronweb);
       const id =  await t.isExist(1).call();
       console.log(id,"ididid")
    }
    
  };

  function getTronContract(tronweb) {
    return tronweb.contract("TWYcq45CDSCo1Z4A8hNNxLza8eAeo1SVir").at();
  }



//  async function investment(){
    
//     const t = await getTronContract(tronWeb);
//     const user_tron = tronWeb.defaultAddress.base58;
//     const invest = await t.methods
//     .invest("1000000","399")
//     .send({
//       value: 0,
//       from: user_tron,
//     });
//     console.log(invest,"invest");

//   }
//   investment()

  
