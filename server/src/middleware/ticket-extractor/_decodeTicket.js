export async function decodeTicket(ticket) {
  const payload = await ticket.getPayload();

  const userId = payload.sub;
  if (!userId) {
    throw new Error("ticket payload is missing the 'sub' field");
  }

  const gTicket = {
    email: payload.email,
    isEmailVerified: payload.email_verified,
    name: payload.name,
    picture: payload.picture,
  };

  return { gTicket, userId };
}

export default { decodeTicket };
