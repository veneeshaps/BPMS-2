// SPDX-Licence-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract SolidtyTest {
    struct Patch{
        string[] bugs;
        string[] features;
    }
    struct AllPatch{
        string[] patches;
    }
    string[] all_patches;
    mapping(string=>Patch) patches;
    function addPatch(string memory _patchName,string[] memory _bugs,string[] memory _features)public{
        all_patches.push(_patchName);
        patches[_patchName] = Patch(_bugs,_features);
    }
    function getPatchDetails(string memory _patchName)public view returns(Patch memory){
        return patches[_patchName];
    }
    function allPatches()public view returns(AllPatch memory){
        return AllPatch(all_patches);
    }
}