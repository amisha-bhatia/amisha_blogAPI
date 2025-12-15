const sendEmail = async (to, subject, html) => {
  console.log("=== Sending Email ===");
  console.log("To:", to);
  console.log("Subject:", subject);
  console.log("HTML:", html);
  console.log("====================");
};

module.exports = sendEmail;