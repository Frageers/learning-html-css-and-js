function factorial(num) {
    var result = 1;
    while (num > 1) {
        result *= num;
        num -= 1;
    }
    return result;
}

document.getElementById("submitNum").addEventListener("click", function() {
    var inputNum = document.getElementById("facNum").value;
    var result = factorial(parseInt(inputNum));
    alert("Factorial: " + result);
    location.reload()
});
