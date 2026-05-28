import axios from "axios";
import { GraphQLError } from "graphql";

export function handleError(error: unknown): never {
  if (error == null) throw new Error("Unrecoverable error!! Error is null!");
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    if (status === 404) {
      throw new GraphQLError("Pokemon not found", {
        extensions: { code: "NOT_FOUND" },
      });
    }
    if (status && status >= 500) {
      throw new GraphQLError("Pokemon API unavailable", {
        extensions: { code: "UPSTREAM_API_ERROR" },
      });
    }
  }
  throw new GraphQLError("Unexpected server error", {
    extensions: { code: "INTERNAL_SERVER_ERROR" },
  });
}
