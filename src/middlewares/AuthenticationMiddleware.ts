/**
  Authentication Middleware: 
  Implements Ts.ED middleware for authentication, verifying credentials and access rights.
  
  Middleware Methods:
  - use(context: Context, credential: QueryParams): Verifies the provided credentials passed as a query.
  Functionality:
  - Parses and validates credentials including timestamp, signer, and signature.
  - Checks credential expiration and signer validity.
  - Verifies admin access based on the request path and signer's Ethereum address.
  - Handles authentication errors by returning appropriate responses.
 */

import { Context, QueryParams } from "@tsed/platform-params";
import { MiddlewareMethods, Middleware } from "@tsed/platform-middlewares";
import { ethers } from "ethers";
import {
  Account,
  Certificate,
  CustomerForm,
  AdminForm
} from "../types";
import { Governance } from "../constants";

let log: object = console.log;

@Middleware()
export class AuthenticationMiddleware implements MiddlewareMethods {
  use(@Context() context: Context, @QueryParams() credential: any) {
    const path = context.endpoint.propertyKey as string;
    const adminPaths: string[] = Governance.ADMIN_PATHS;
    const adminAccounts: string[] = Governance.ADMIN_ACCOUNTS;
    const credentialValidity: number =
      Governance.CREDENTIAL_VALIDITY_IN_SECONDS;

    const timestampPattern =
      /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}\.\d{3})Z$/;
    const ethAddressPattern = /^0x[0-9a-fA-F]{40}$/;
    const now: number = Math.floor(new Date().getTime() / 1000);

    let certificate: Certificate<CustomerForm> | Certificate<AdminForm>;
    let signedAt: number;
    let claimed: Account;
    let recovered: Account;
    let isAdminAccount: boolean;
    let isAdminPath: boolean;
    let timestamp: Date;

    try {
      certificate = JSON.parse(credential.certificate);

      if (!timestampPattern.test(certificate.timestamp.toString())) {
        throw new Error("Auth: Invalid timestamp");
      }

      signedAt = Math.floor(new Date(certificate.timestamp).getTime() / 1000);
      if (Math.abs(now - signedAt) > credentialValidity) {
        throw new Error("Auth: Expired credential");
      }

      claimed = JSON.parse(credential.signer);
      if (!ethAddressPattern.test(claimed.address)) {
        throw new Error("Auth: Invalid signer");
      }

      try {
        recovered = {
          address: ethers.utils.verifyMessage(
            credential.certificate,
            credential.signature
          )
        };
      } catch (error) {
        throw new Error("Auth: Invalid signature" + error.message);
      }

      if (recovered.address.toLowerCase() !== claimed.address.toLowerCase()) {
        throw new Error("Auth: False signer");
      }

      isAdminAccount = adminAccounts.includes(recovered.address);
      isAdminPath = adminPaths.includes(path);

      if (isAdminPath && !isAdminAccount) {
        throw new Error("Auth: Access denied");
      }
    } catch (error) {
      context.response.status(200).body({
        code: "ERROR",
        data: null,
        error: error.message
      });
    }
  }
}
