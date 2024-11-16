function encryptText(){
    const plaintext = document.getElementById('plaintext').value;
    const key = document.getElementById('key').value;

    if(!key){
        alert("Please enter a key for encryption.");
        return;
    }

    const shift = calculateShift(key);
    const substitutedText = ceaserCipher(plaintext, shift);
    const result = transpositionEncrypt(substitutedText);

    document.getElementById('output').value = result;
}

function decryptText(){
    const ciphertext = document.getElementById('plaintext').value;
    const key = document.getElementById('key').value;

    if(!key){
        alert("Please enter the key for decryption.");
        return;
    }

    const shift = calculateShift(key);
    const transposedText = transpositionDecrypt(ciphertext);
    const result = ceaserCipher(transposedText, -shift);

    document.getElementById('output').value = result;
}

function ceaserCipher(text, shift){
    return text.split('').map(char => {
        const code = char.charCodeAt(0);
        if(code >= 65 && code <=90){
            //Uppercase letters
            return String.fromCharCode(((code - 65 + shift) % 26 + 26) % 26 + 65);
        }
        else if(code >= 97 && code <=122){
            return String.fromCharCode(((code - 97 + shift) % 26 + 26) % 26 + 97);
        }
        return char;
    }).join('');
}

function calculateShift(key){
    let shift = 0;
    for(let i =0; i< key.length; i++){
        shift += key.charCodeAt(i);
    }
    return shift % 26;
}

function transpositionEncrypt(text) {
    let transposedText = '';
    for (let i = 0; i < text.length; i += 2) {
        if (i + 1 < text.length) {
            transposedText += text[i + 1] + text[i];
        } else {
            transposedText += text[i];
        }
    }
    return transposedText;
}

function transpositionDecrypt(text) {
    return transpositionEncrypt(text);
}