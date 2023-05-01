      //connect to metemask
      let account;
      
      //connect to contract
      //read data from contract
      const readContract = async () => {
        const data = await window.contract.methods.returnDetails().call();
        console.log(typeof(data));
        console.log(data);
    //     let something =`<ul>`
    //       for(let i in data){
    //         something+=`<li>${data[i]}</li>`;
    //       }
    //       something+=`</ul>`;
    //     document.getElementById("dataArea").innerHTML = something;
         }
      const changeContract = async (bugs,features,teamid,patchid) => {
        if(window.ethereum !== "undefined") {
            const accounts = await ethereum.request({ method: "eth_requestAccounts"});
            account = accounts[0];
            console.log(account);
            // document.getElementById("accountArea").innerHTML = account;
            // alert(`account is ${account}`);
          }
          const ABI = [
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "_string1",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "_string2",
                        "type": "string"
                    },
                    {
                        "internalType": "string[]",
                        "name": "_array1",
                        "type": "string[]"
                    },
                    {
                        "internalType": "string[]",
                        "name": "_array2",
                        "type": "string[]"
                    }
                ],
                "name": "setArrays",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "array1",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "array2",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "returnDetails",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    },
                    {
                        "internalType": "string[]",
                        "name": "",
                        "type": "string[]"
                    },
                    {
                        "internalType": "string[]",
                        "name": "",
                        "type": "string[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "string1",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "string2",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ]
        
                const Address = "0xb8Cb549B50f004B239D2c9bF19A9f5E6Ff2756f5";
                window.web3 =await new Web3(window.ethereum);
                window.contract = await new window.web3.eth.Contract(ABI , Address);
        // const string1=document.getElementById('Teamid').value;
        // const string2=document.getElementById('Patch ID').value;
        await window.contract.methods.setArrays(bugs,features,teamid,patchid).send({from: account });
        
      }
    