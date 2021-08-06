module.exports = (result) => {
  const filedata = JSON.stringify(result);
  if (filedata.includes("/uploads/")) {
    const fileInt = filedata.split("/uploads/")[1];
    return (filename = fileInt.split('"')[0]);
  } else {
    return (filename = "nofile");
  }
};