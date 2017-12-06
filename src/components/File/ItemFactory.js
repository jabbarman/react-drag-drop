export function newItem(file) {

    return {
        file: file,
        key: file.name + Date.now(),
        title: formatTitle(file.name)
    }; 

}

export function formatTitle(fileName){
    let ext = (fileName.lastIndexOf('.') > 0) ? fileName.lastIndexOf('.') : fileName.length;
    return fileName.slice(0, ext);
}