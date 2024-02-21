import { google } from "googleapis";

export function createGmailClient() {
  const gmailClient = google.gmail("v1");

  return {
    gmailClient,
    messagesClient: gmailClient?.users?.messages,
  };
}

export default {
  createGmailClient,
};
