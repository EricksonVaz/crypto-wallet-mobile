export const environment = {
  production: true,
  firebase:{
    apiKey: "AIzaSyCaKWKEjQvV_-s1kewAJVOmNBtVpbmyjTc",
    authDomain: "test-riftone-io.firebaseapp.com",
    projectId: "test-riftone-io",
    storageBucket: "test-riftone-io.appspot.com",
    messagingSenderId: "348176771616",
    appId: "1:348176771616:web:8c68b428f6db39d417ea45",
    measurementId: "G-4MPFKG9NN9"
  },
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
