// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <0.9.0;

struct Bugs{
    string bug_name;
    string bug_description;
    string bug_priority;
}

struct Features{
    string feature_name;
    string feature_description;
    string feature_priority;
}

struct PatchDev{
    string time;
    string patch_name;
    string patch_description;
    Bugs[] selected_bugs;
    Features[] selected_features;
    string ver;
    string file_name;
    bytes file;
}
contract BMPS{
    Bugs[] bug_arr;
    Features[] feat_arr;
    PatchDev[] patch_arr;


    function reporting(string[][] memory bugs, string[][] memory features) public{
         for(uint i=0;i<=bugs.length;i++){
             Bugs memory temp = Bugs(bugs[i][0],bugs[i][1],bugs[i][2]);
             bug_arr.push(temp);
         }
         for(uint i=0;i<=features.length;i++){
             Features memory temp = Features(features[i][0],features[i][1],features[i][2]);
             feat_arr.push(temp);
         }
    }

    function admin_read() public view returns(Bugs[] memory , Features[] memory){
        return(bug_arr,feat_arr);
    }

    function patch_request(string memory _time,string memory pname, string memory pdec, string[][] memory bugs, string[][] memory features) public{
        PatchDev memory temp = PatchDev(_time,pname,pdec);
        for(uint i=0;i<bugs.length;i++){
            Bugs 
        }
    }
}
