exports = async function(body){
  return body.trim().split(/\s+/).length >= 300;
};