module.exports = (result) =>  {
    const filedata = JSON.stringify(result);
    const fileInt = filedata.split('/uploads/')[1];
    return filename = fileInt.split('"')[0];
}


