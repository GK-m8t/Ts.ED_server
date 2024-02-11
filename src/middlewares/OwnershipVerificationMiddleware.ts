/**
  Ownership Verification Middleware:
  Implements Ts.ED middleware for ownership verification of a resource.
  
  Middleware Methods:
  - use(context: Context, tokenId: PathParams, credential: QueryParams): Verifies ownership of a resource.
  Functionality:
  - Extracts the Ethereum account from the provided credential.
  - Utilizes OwnershipVerificationUtil to verify ownership of the specified resource (tokenId).
  - Responds with a 403 status if ownership verification fails, 500 for other errors.
 */

import { Context, PathParams, QueryParams } from "@tsed/platform-params";
import { MiddlewareMethods, Middleware } from "@tsed/platform-middlewares";

import { Account } from "../types";
import { OwnershipVerificationUtil } from "../utils";

let log: object = console.log;

@Middleware()
export class OwnershipVerificatonMiddleware implements MiddlewareMethods {
  constructor(private util: OwnershipVerificationUtil) {}
  async use(
    @Context() context: Context,
    @PathParams("tokenId") tokenId: string,
    @QueryParams() credential: any
  ) {
    const account: Account = JSON.parse(credential.signer);

    try {
      const result: boolean = await this.util.verifyOwnership(tokenId, account);
      if (!result) {
        context.response.status(403).body({
          message: "OwnerVerifError: Account not owner."
        });
      }
    } catch (error) {
      context.response.status(500).body({
        message: `OwnerVerifError: ${error.message}`
      });
    }
  }
}
