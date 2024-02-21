///Loop through headers from one message to get a basic "sender" object: {email, name?}
export default function getSenderFromHeaders(headers) {
  if (!Array.isArray(headers) || headers.length === 0) return;

  let sender;

  headers.forEach((header) => {
    if (sender) return;

    if (header.name === "From") {
      const headerValue = header.value;

      const senderParseRegex = /^(.*)<(.*)>$/; //parse name and email from senders with format "name <email@xyz.com>"
      const match = senderParseRegex.exec(headerValue);

      const name = match ? match[1] : null;
      const email = match ? match[2] : headerValue;

      sender = {
        name,
        email,
      };
    }
  });

  if (sender) return { ...sender };
}
