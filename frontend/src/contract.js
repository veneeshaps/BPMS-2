export const ABI = [
	{
		"inputs": [
			{
				"internalType": "string[][]",
				"name": "_bugs",
				"type": "string[][]"
			},
			{
				"internalType": "string[][]",
				"name": "_features",
				"type": "string[][]"
			}
		],
		"name": "addBugandFeature",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_desc",
				"type": "string"
			},
			{
				"internalType": "string[][]",
				"name": "_bugs",
				"type": "string[][]"
			},
			{
				"internalType": "string[][]",
				"name": "_features",
				"type": "string[][]"
			},
			{
				"internalType": "string",
				"name": "_version",
				"type": "string"
			}
		],
		"name": "approvePatch",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_desc",
				"type": "string"
			},
			{
				"internalType": "string[][]",
				"name": "_bugs",
				"type": "string[][]"
			},
			{
				"internalType": "string[][]",
				"name": "_features",
				"type": "string[][]"
			},
			{
				"internalType": "string",
				"name": "_version",
				"type": "string"
			}
		],
		"name": "rejectPatch",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_desc",
				"type": "string"
			},
			{
				"internalType": "string[][]",
				"name": "_bugs",
				"type": "string[][]"
			},
			{
				"internalType": "string[][]",
				"name": "_features",
				"type": "string[][]"
			},
			{
				"internalType": "string",
				"name": "_version",
				"type": "string"
			}
		],
		"name": "requestDeploy",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_desc",
				"type": "string"
			},
			{
				"internalType": "string[][]",
				"name": "_bugs",
				"type": "string[][]"
			},
			{
				"internalType": "string[][]",
				"name": "_features",
				"type": "string[][]"
			}
		],
		"name": "requestPatch",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_desc",
				"type": "string"
			},
			{
				"internalType": "string[][]",
				"name": "_bugs",
				"type": "string[][]"
			},
			{
				"internalType": "string[][]",
				"name": "_features",
				"type": "string[][]"
			},
			{
				"internalType": "string",
				"name": "_version",
				"type": "string"
			}
		],
		"name": "requestQA",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "approvedPatches",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "string[][]",
						"name": "bugs",
						"type": "string[][]"
					},
					{
						"internalType": "string[][]",
						"name": "features",
						"type": "string[][]"
					},
					{
						"internalType": "string",
						"name": "version",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "approved",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "deployed",
						"type": "bool"
					}
				],
				"internalType": "struct PatchFile[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "deployedPatches",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "string[][]",
						"name": "bugs",
						"type": "string[][]"
					},
					{
						"internalType": "string[][]",
						"name": "features",
						"type": "string[][]"
					},
					{
						"internalType": "string",
						"name": "version",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "approved",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "deployed",
						"type": "bool"
					}
				],
				"internalType": "struct PatchFile[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getBugs",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "priority",
						"type": "string"
					}
				],
				"internalType": "struct Bug[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getFeatures",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "priority",
						"type": "string"
					}
				],
				"internalType": "struct Feature[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "patchDetails",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "string[][]",
						"name": "bugs",
						"type": "string[][]"
					},
					{
						"internalType": "string[][]",
						"name": "features",
						"type": "string[][]"
					}
				],
				"internalType": "struct Patch[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "rejectedPatches",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "string[][]",
						"name": "bugs",
						"type": "string[][]"
					},
					{
						"internalType": "string[][]",
						"name": "features",
						"type": "string[][]"
					},
					{
						"internalType": "string",
						"name": "version",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "approved",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "deployed",
						"type": "bool"
					}
				],
				"internalType": "struct PatchFile[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "requestedPatches",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "string[][]",
						"name": "bugs",
						"type": "string[][]"
					},
					{
						"internalType": "string[][]",
						"name": "features",
						"type": "string[][]"
					},
					{
						"internalType": "string",
						"name": "version",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "approved",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "deployed",
						"type": "bool"
					}
				],
				"internalType": "struct PatchFile[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
export const contractAddress = "0x375f79b6cd2257ED35F8bb9D62EA095c5DB5cAC2";