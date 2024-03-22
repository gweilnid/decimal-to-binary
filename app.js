function minBitsForTwosComplement(num) {
    if(num >= -128) return 8;
    else if(num >= -32768 ) return 16;
    else if (num >= -2147483648) return 32;
    else return 64;
}

function bitPadding(array, num){
    let numBits = minBitsForTwosComplement(num);
    let sizeArray = array.length;
    let toFill = 0;
    if(sizeArray % numBits != 0){
        toFill = numBits - (sizeArray % numBits);
    }
    for(let l = 0 ; l < toFill; l++){ // Adjusted to remove the additional 8 bits
        array.unshift(0);
    }
    return array;
}

function bitNegation(array){
    let sizeArray = array.length; // Added missing 'let' declaration
    for(let i = 0 ; i < sizeArray ; i++){
        if( array[i] == 0){
            array[i] = 1;
        }
        else array[i] = 0;
    }
    return array;        
}

function addOne(array){
    let sizeArray = array.length; // Added missing 'let' declaration
    for(let k = sizeArray-1 ; k >= 0 ; k--){ // Adjusted condition to include 0
        if( array[k] == 0){
            array[k] = 1;
            return array;
        }
        else{
            array[k] = 0;
        }
    }
    array.unshift(1); // Handles the case when all bits are 1
    return array;
}

function twosComplement(num, array){
    array = bitPadding(array, num);
    array = bitNegation(array);
    array = addOne(array);
    return array;
}

function getBits(num){
    const convertBase = 2;
    let array = [];
    let tempNum = num;

    while(tempNum > 0){
        array.push(tempNum % convertBase);
        tempNum = Math.floor(tempNum / convertBase);
    }
    
    return array.reverse();
}

function decimalToBinary() {
    let decimalInput = document.getElementById('decimalInput').value;
    let numericInput = Number(decimalInput);
    
    if (isNaN(numericInput)) {
        document.getElementById('binaryResult').innerText = "Chybný vstup. Zadejte znovu.";
    } 
    else if(numericInput == 0){
        document.getElementById('binaryResult').innerText = "Výsledek je: " + numericInput;
    }
    else{
        let isNegative = numericInput < 0; // Adjusted to use boolean directly
        if(isNegative){
            numericInput = Math.abs(numericInput);
        }
        let result = getBits(numericInput);
        if(isNegative){
            result = twosComplement(numericInput, result);
            document.getElementById('binaryResult').innerText = "Výsledek v dvojkovém doplňku je: " + result.join("");
        }
        else{
            document.getElementById('binaryResult').innerText = "Výsledek v binární soustavě je: " + result.join("");
        }
    }
}
