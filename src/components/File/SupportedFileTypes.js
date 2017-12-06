const supportedFiles = [
    "image/png", 
    "image/jpeg", 
    "image/gif", 
    "image/webp"
];

export function isValidFile(mimeType){
    return (supportedFiles.indexOf(mimeType) !== -1);
}