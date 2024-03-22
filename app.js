function minBitsForTwosComplement(num) {
    if(num >= -128) return 8;
    else if(num >= -32768 ) return 16;
    else if (num >= -2147483648) return 32;
    else return 64;
}
function bitPadding(array, num){
    let numBits = minBitsForTwosComplement(num);
    let sizeArray = array.length;
            if(sizeArray % numBits != 0){
                let toFill = numBits - (sizeArray % numBits);
                for(let l = 0 ; l < toFill ; l++){
                    array.unshift(0);
                }
            }
    return array;
}

function bitNegation(array){
    sizeArray = array.length
            for(let i = 0 ; i < sizeArray ; i++){
                if( array[i] == 0){
                    array[i] = 1;
                }
                else array[i] = 0;
            }
    return array;        
}

function addOne(array){
    for(let k = sizeArray-1 ; k > 0 ; k--){
        if( array[k] == 0){
            array[k] = 1;
            //ukončím for cyklus
            break;
        }
        else{
            //to znamená že se array[index] == 1, tak musíme změnit hodnotu z 1 na 0 a v dalším cyklu se podívat na další bit
            array[k] = 0;
        }
    }
    return array;
}

function twosComplement(num, array){
    
    array = bitPadding(array, num)        
    
    array = bitNegation(array)       
            
    array = addOne(array)      
            
    return array
}

function decimalToBinary() {
    const convertBase = 2;
    let decimalInput = document.getElementById('decimalInput').value;
    let numericInput = Number(decimalInput);
    
    if (isNaN(numericInput)) {
        document.getElementById('binaryResult').innerText = "Chybný vstup. Zadejte znovu.";
    } 
    else if(numericInput == 0){
        document.getElementById('binaryResult').innerText = "Výsledek je: " + numericInput;
    }
    else{
        let isNegative = false;
        if(numericInput < 0){
            console.log("Negative");
            isNegative = true;
            numericInput = Math.abs(numericInput)
        }
        let array = [];
        let tempNum = numericInput;

        while(tempNum > 0){
            array.push(tempNum % convertBase);
            tempNum = Math.floor(tempNum / convertBase);
        }

        let result = array.reverse();
        if(isNegative){
            result = twosComplement(numericInput,result);
        }
    
        document.getElementById('binaryResult').innerText = "Výsledek je: " + result.join("");
    }
}
