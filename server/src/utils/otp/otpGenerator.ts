export default function generateOTP() {
  let final = "";
  for (let count = 0; count < 4; count++) {
    const num = parseInt(Math.random() * 10 + "");
    final += num.toString();
  }
  return final;
}
