 /* function calc()
{
    let qtyarr=document.getElementsByClassName('qty');
    let ratarr=document.getElementsByClassName('rat');
    let amtarr=document.getElementsByClassName('amt');

    for(let i=0;i<qtyarr.length;i++)
    {
        amtarr[i].value=qtyarr[i].value*ratarr[i].value;
    }

    let sum=0;
    for(let i=0;i<amtarr.length;i++)
    {
        sum=sum+Number(amtarr[i].value);
    }

    let q=0;
    for(let i=0;i<amtarr.length;i++)
    {
        q=q+Number(qtyarr[i].value);
    }

    document.getElementById('tp').value=sum;
    document.getElementById('tq').value=q;

    

}*/ 
function openmodal()
{
    let modal = document.getElementById("myModal");
    modal.style.display = "block";
}
 

function spanclick()
{
    let modal = document.getElementById("myModal");
    modal.style.display = "none";
}




var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope,$timeout,$http) {

        $scope.objbill={};
    
        $scope.objbill.arr=[];
       

    $scope.addrows=function()
    {
        let objtr={};
        objtr.icode="";
        objtr.qty=1;
        objtr.rate=0;
        objtr.amt=0;
        $scope.objbill.arr.push(objtr);
    }

    $scope.updateamount=function(x)
    {
        x.amt=x.rate*x.qty;
        $scope.updateallamts();
    }

    $scope.updateallamts=function()
    {
        $scope.objbill.tq=0;
        $scope.objbill.ta=0;
        for(let i=0;i<$scope.objbill.arr.length;i++)
        {
            $scope.objbill.tq= Number($scope.objbill.tq)+Number($scope.objbill.arr[i].qty);
            $scope.objbill.ta= Number($scope.objbill.ta)+Number($scope.objbill.arr[i].amt);
        }
    }

    $scope.tempdatareturn={};
    $scope.arritem=[];
    $scope.getitemlist=function()
    {

        $http.get("http://ap14.acsonnet.com:3000/getitemlist")
            .then(function(retdata) {
                $scope.tempdatareturn=retdata;


            $scope.arritem=retdata.data;
        });

    }


    $scope.getmybill=function()
    {

        $http({
            method: 'POST',
            url: 'http://ap14.acsonnet.com:3000/getmybill',
            data: $scope.objbill
        }).then(function successCallback(response) {
            console.log(response);
            $scope.objbill=response.data;
            
           
        })

    }

    $scope.savebill = function()
    {
        $http({
            method: 'POST',
            url: 'http://ap14.acsonnet.com:3000/savebilldata',
            data: $scope.objbill
        }).then(function successCallback(response) {
            console.log(response);
           
        })
    
    


    }
    
    $scope.getitemlist();

     $scope.lastitem={};
    $scope.openlist=function(x)
    {
        $scope.lastitem=x;
        openmodal();
    }

    $scope.sitem=function(y)
    {
        spanclick();
        $scope.lastitem.icode=y.name;
        $scope.lastitem.rate=y.rate;
        $scope.updateamount($scope.lastitem);
    }


});