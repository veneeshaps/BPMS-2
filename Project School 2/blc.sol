// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <0.9.0;

struct Bug {
    string name;
    string description;
    string priority;
}

struct Feature {
    string name;
    string description;
    string priority;
}

struct Patch {
    string name;
    string description;
    string[][] bugs;
    string[][] features;
}

struct PatchFile{
    string name;
    string description;
    string[][] bugs;
    string[][] features;
    string version;
    bool approved;
    bool deployed;
    string cid;
}

contract PatchManagement {
    Bug[] select_bugs;
    Bug[] Unassigned_bugs;
    Feature[] select_features;
    Feature[] Unassigned_features;
    Patch[] patches;
    PatchFile[] check_patches;
    PatchFile[] approved_patches;
    PatchFile[] rejected_patches;
    PatchFile[] deployed_patches;
    
    function addBugandFeature(string[][] memory _bugs, string[][] memory _features) public {
        for (uint i = 0; i < _bugs.length; i++) {
            Unassigned_bugs.push(Bug(_bugs[i][0], _bugs[i][1], _bugs[i][2]));
        }
        for (uint i = 0; i < _features.length; i++) {
            Unassigned_features.push(Feature(_features[i][0], _features[i][1], _features[i][2]));
        }
    }
    function getBugs() public view returns (Bug[] memory) {
        return Unassigned_bugs;
    }

    function getFeatures() public view returns (Feature[] memory) {
        return Unassigned_features;
    }

    function removeBug(uint index, Bug[] storage array) internal {
        if (index >= array.length) return;

        for (uint i = index; i < array.length-1; i++){
            array[i] = array[i+1];
        }
        array.pop();
    }

    function removeFeature(uint index, Feature[] storage array) internal {
        if (index >= array.length) return;

        for (uint i = index; i < array.length-1; i++){
            array[i] = array[i+1];
        }
        array.pop();
    }

    function removePatch(uint index, Patch[] storage array) internal {
        if (index >= array.length) return;

        for (uint i = index; i < array.length-1; i++){
            array[i] = array[i+1];
        }
        array.pop();
    }
    
    function removePatchFile(uint index, PatchFile[] storage array) internal {
        if (index >= array.length) return;

        for (uint i = index; i < array.length-1; i++){
            array[i] = array[i+1];
        }
        array.pop();
    }

    function requestPatch(string memory _name,string memory _desc,string[][] memory _bugs,string[][] memory _features) public {
        patches.push(Patch(_name,_desc,_bugs,_features));
        for (uint i=0;i<Unassigned_bugs.length;i++){
            for(uint j=0;j<_bugs.length;j++){
                if(keccak256(abi.encodePacked(Unassigned_bugs[i].name)) == keccak256(abi.encodePacked(_bugs[j][0]))){
                    removeBug(i, Unassigned_bugs);
                }
            }
        }
        for (uint i=0;i<Unassigned_features.length;i++){
            for(uint j=0;j<_features.length;j++){
                if(keccak256(abi.encodePacked(Unassigned_features[i].name)) == keccak256(abi.encodePacked(_features[j][0]))){
                    removeFeature(i, Unassigned_features);
                }
            }
        }
    }

    function requestQA(string memory _name,string memory _desc,string[][] memory _bugs,string[][] memory _features,string memory _version,string memory _cid)public{
        check_patches.push(PatchFile({name:_name,description:_desc,bugs:_bugs,features:_features,version:_version,approved:false,deployed:false,cid:_cid}));
        for (uint i=0;i<patches.length;i++){
            if(keccak256(abi.encodePacked(_name)) == keccak256(abi.encodePacked(patches[i].name))){
                removePatch(i, patches);
            }
        }
    }

    function approvePatch(string memory _name,string memory _desc,string[][] memory _bugs,string[][] memory _features,string memory _version,string memory _cid)public{
        approved_patches.push((PatchFile({name:_name,description:_desc,bugs:_bugs,features:_features,version:_version,approved:true,deployed:false,cid:_cid})));
        for (uint i=0;i<check_patches.length;i++){
            if(keccak256(abi.encodePacked(_name)) == keccak256(abi.encodePacked(check_patches[i].name))){
                removePatchFile(i, check_patches);
            }
        }
    }

    function rejectPatch(string memory _name,string memory _desc,string[][] memory _bugs,string[][] memory _features,string memory _version,string memory _cid)public{
        rejected_patches.push((PatchFile({name:_name,description:_desc,bugs:_bugs,features:_features,version:_version,approved:false,deployed:false,cid:_cid})));
        for (uint i=0;i<check_patches.length;i++){
            if(keccak256(abi.encodePacked(_name)) == keccak256(abi.encodePacked(check_patches[i].name))){
                removePatchFile(i, check_patches);
            }
        }
        for (uint i = 0; i < _bugs.length; i++) {
            Unassigned_bugs.push(Bug(_bugs[i][0], _bugs[i][1], _bugs[i][2]));
        }
        for (uint i = 0; i < _features.length; i++) {
            Unassigned_features.push(Feature(_features[i][0], _features[i][1], _features[i][2]));
        }
    }
    
    function requestDeploy(string memory _name,string memory _desc,string[][] memory _bugs,string[][] memory _features,string memory _version,string memory _cid)public {
        deployed_patches.push((PatchFile({name:_name,description:_desc,bugs:_bugs,features:_features,version:_version,approved:true,deployed:true,cid:_cid})));
        for (uint i=0;i<approved_patches.length;i++){
            if(keccak256(abi.encodePacked(_name)) == keccak256(abi.encodePacked(approved_patches[i].name))){
                removePatchFile(i, approved_patches);
            }
        }
        approved_patches.push((PatchFile({name:_name,description:_desc,bugs:_bugs,features:_features,version:_version,approved:true,deployed:true,cid:_cid})));
    }

    function requestedPatches()public view returns (PatchFile[] memory){
        return check_patches;
    }

    function approvedPatches() public view returns (PatchFile[] memory){
        return approved_patches;
    }

    function rejectedPatches() public view returns (PatchFile[] memory){
        return rejected_patches;
    }

    function deployedPatches() public view returns (PatchFile[] memory){
        return deployed_patches;
    }

    function patchDetails() public view returns (Patch[] memory) {
        return patches;
    }
}