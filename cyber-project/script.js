// Predefined substitution keys for uppercase and lowercase letters
const predefinedKeyUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const predefinedKeyLower = 'abcdefghijklmnopqrstuvwxyz';

// Function to parse user input key and remove duplicates and spaces
function generateSubstitutionKey(userKey) {
    // Remove spaces from the user key
    let cleanedKey = userKey.replace(/\s+/g, '').toLowerCase();
    
    // Create a set to remove duplicates
    let uniqueChars = new Set(cleanedKey);
    
    // Convert back to string after removing duplicates
    cleanedKey = Array.from(uniqueChars).join('');
    
    // Create the final key by joining the predefined key with the user key
    let finalKeyUpper = cleanedKey + predefinedKeyUpper.replace(new RegExp(`[${cleanedKey}]`, 'g'), '');
    let finalKeyLower = cleanedKey + predefinedKeyLower.replace(new RegExp(`[${cleanedKey}]`, 'g'), '');
    
    return { finalKeyUpper, finalKeyLower };
}

// Substitution encryption using the generated key
function substitutionEncrypt(text, key) {
    return text.split('').map(char => {
        if (key.finalKeyUpper.includes(char)) {
            return key.finalKeyUpper[predefinedKeyUpper.indexOf(char)];
        } else if (key.finalKeyLower.includes(char)) {
            return key.finalKeyLower[predefinedKeyLower.indexOf(char)];
        }
        return char;
    }).join('');
}

// Substitution decryption using the generated key
function substitutionDecrypt(text, key) {
    return text.split('').map(char => {
        if (key.finalKeyUpper.includes(char)) {
            return predefinedKeyUpper[key.finalKeyUpper.indexOf(char)];
        } else if (key.finalKeyLower.includes(char)) {
            return predefinedKeyLower[key.finalKeyLower.indexOf(char)];
        }
        return char;
    }).join('');
}

// Transposition encryption (swapping adjacent characters)
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

// Transposition decryption (same as encryption because it reverses swaps)
function transpositionDecrypt(text) {
    return transpositionEncrypt(text);
}

// Main encryption function
function encryptText() {
    const text = document.getElementById("inputText").value;
    const keyString = document.getElementById("keyText").value;
    
    // Generate substitution key based on user input
    const substitutionKey = generateSubstitutionKey(keyString);
    
    // Apply substitution encryption and then transposition encryption
    const substitutedText = substitutionEncrypt(text, substitutionKey);
    const encryptedText = transpositionEncrypt(substitutedText);
    
    // Display the encrypted text
    document.getElementById("outputText").value = encryptedText;
}

// Main decryption function
function decryptText() {
    const text = document.getElementById("inputText").value;
    const keyString = document.getElementById("keyText").value;
    
    // Generate substitution key based on user input
    const substitutionKey = generateSubstitutionKey(keyString);
    
    // Apply transposition decryption and then substitution decryption
    const transposedText = transpositionDecrypt(text);
    const decryptedText = substitutionDecrypt(transposedText, substitutionKey);
    
    // Display the decrypted text
    document.getElementById("outputText").value = decryptedText;
}
