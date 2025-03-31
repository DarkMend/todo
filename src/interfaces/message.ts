export interface IMessage {
  type?: "error" | "success" | null;
  body?: string;
}
