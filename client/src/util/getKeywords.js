import punctuationMarks from  "./punctuationMarks";

export default (str) => {
  str = str.trim();
  let strWithoutPunc = "";
  for (let i in str) {
    if (punctuationMarks.includes(str[i])) {
      strWithoutPunc += " ";
    } else {
      strWithoutPunc += str[i].toLowerCase();
    }
  }
  return strWithoutPunc.split(" ");
};