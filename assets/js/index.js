
let useraddress;
let provider;
let signer;
let jpyccontract;

function walletmodal(){
    $('#wallet-popup').modal('show');
}


window.onload = async function() {
    ethereum.on('chainChanged', (_chainId) => window.location.reload());
    //$('#wallet-popup').modal('show');
    //newTorus();
    mainimage = document.getElementById("mainimage");
    mainimage.src = image;
    changeToMatic();
    initmetamask();
}



async function initmetamask(){
    if (window.ethereum !== undefined){
        document.getElementById("message").innerHTML = "MetaMask Mobileに接続しました";
    } else {
        document.getElementById("message").innerHTML = "MetaMask Mobileでこのページを開いてください";        
    }
    provider = await new ethers.providers.Web3Provider(window.ethereum);
    signer = await provider.getSigner();
    console.log(signer);
    useraddress = await signer.getAddress();    
    jpyccontract = await new ethers.Contract( jpyc_on_matic , abi, signer );
    balance = await jpyccontract.balanceOf(useraddress) * 10e-19;
    document.getElementById("message").innerHTML = document.getElementById("message").innerHTML + balance + "JPYC持っています";
}

let a;

async function TokenPayment(){
    document.getElementById("message").innerHTML = "ボタンが押されました。お支払いを開始します";
    let options = { gasPrice: 10000000000 , gasLimit: 100000};
    const jpycprice = ethers.utils.parseUnits( pricing.toString() , 18);
    jpyccontract.transfer( shopwalletaddress , jpycprice , options ).catch((error) => {
    a=error;
    document.getElementById("message").innerHTML = error.code + "<br>" + error.message + "<br>" + error.stack + "<br>" + error.data + "<br>" + JSON.stringify(error);
    });
}

async function changeToMatic(){
    document.getElementById("message").innerHTML = "Matic Networkに切り替えましょう";
    let ethereum = window.ethereum;
        const data = [{
            chainId: '0x89',
            chainName: 'Matic Network',
            nativeCurrency:
                {
                    name: 'Matic',
                    symbol: 'Matic',
                    decimals: 18
                },
            rpcUrls: ['https://polygon-mainnet.infura.io/v3/bb3eef7a2041448a8e32b82bfb9b0f00'],
            blockExplorerUrls: ['https://explorer-mainnet.maticvigil.com'],
        }]
        /* eslint-disable */
        const tx = await ethereum.request({method: 'wallet_addEthereumChain', params:data}).catch()
    document.getElementById("message").innerHTML = "準備ができました。お支払いボタンを押すと、お支払いできます<br><br>"
}
