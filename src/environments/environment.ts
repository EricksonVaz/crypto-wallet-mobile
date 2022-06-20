// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  networks:[
    {
      id:1,
      uuid:"mainnet",
      name:"Ethereum Mainnet",
      rpc:"https://mainnet.infura.io/v3/25cda7b8202041ed91cd18c7c7939c99",
      icon:"assets/ethereum.png",
      symbol:"ETH"
    },
    {
      id:2,
      uuid:"ropsten",
      name:"Ropsten Test Network",
      rpc:"https://ropsten.infura.io/v3/25cda7b8202041ed91cd18c7c7939c99",
      icon:"assets/ethereum.png",
      symbol:"ETH"
    },
    {
      id:3,
      uuid:"rinkeby",
      name:"Rinkeby Test Network",
      rpc:"https://rinkeby.infura.io/v3/25cda7b8202041ed91cd18c7c7939c99",
      icon:"assets/ethereum.png",
      symbol:"ETH"
    },
    {
      id:4,
      uuid:"goerli",
      name:"Goerli Test Network",
      rpc:"https://goerli.infura.io/v3/25cda7b8202041ed91cd18c7c7939c99",
      icon:"assets/ethereum.png",
      symbol:"ETH"
    },
    {
      id:5,
      uuid:"kovan",
      name:"Kovan Test Network",
      rpc:"https://kovan.infura.io/v3/25cda7b8202041ed91cd18c7c7939c99",
      icon:"assets/ethereum.png",
      symbol:"ETH"
    },
    {
      id:6,
      uuid:"ganache",
      name:"Ganache Local Test",
      rpc:"http://127.0.0.1:9545/",
      icon:"assets/android-chrome-192x192.png",
      symbol:"RC"
    }
  ],
  defaultNetwork:{
    id:1,
    uuid:"mainnet",
    name:"Ethereum Mainnet",
    rpc:"https://mainnet.infura.io/v3/25cda7b8202041ed91cd18c7c7939c99",
    icon:"assets/ethereum.png",
    symbol:"ETH"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
