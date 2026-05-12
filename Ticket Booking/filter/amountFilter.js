app.filter('amountFilter', function(){
    //Filter to format the price to show in Rupees(₹)
    return function(amount){
        var filteredAmount = amount;
        var stringAmount = filteredAmount.toFixed(2);
        stringAmount = "₹".concat(stringAmount);
        return stringAmount;
    }
});