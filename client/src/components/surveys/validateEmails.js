const emailPattern =
  /^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(\s*,\s*[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})*$/;

export const validateEmails = (emails) => {
  console.log(emails);

  return emailPattern.test(emails)
    ? true
    : emails
        .split(",")
        .map((email) => email.trim())
        .filter((email) => !emailPattern.test(email));
};
