import EasyPostClient from "@easypost/api";
import { PostalAddress } from "../types";

interface Response {
  code: string;
  data: PostalAddress | null;
}

let log: any = console.log;

export class AddressValidationUtil {
  private readonly apiKey: string;
  private readonly client: EasyPostClient;

  constructor() {
    this.apiKey = process.env.EASYPOST_API_KEY || "";
    this.client = new EasyPostClient(this.apiKey);
  }

  async validateAddress(address: PostalAddress): Promise<Response> {
    let wrappedAddress: any;
    let verificationResult: any;
    try {
      wrappedAddress = await this.client.Address.create(address);
    } catch (error) {
      throw error;
    }

    try {
      verificationResult = await this.client.Address.verifyAddress(
        wrappedAddress.id
      );
    } catch (error) {
      log("addrVer ", error.code);
      log("addrVer ", error.errors);
      throw new Error("AddrValError: Failed to verify address");
    }

    log("verifRes", verificationResult);

    const isInvalid: boolean =
      !verificationResult.verifications.delivery.success;
    if (isInvalid) {
      return { code: "ERROR", data: null };
    }

    const isDifferent: boolean = !this.compareAddresses(
      address,
      verificationResult
    );
    log("comparison", isDifferent);
    if (!isDifferent) {
      return { code: "OK", data: null };
    }

    const suggestedAddress: PostalAddress = {
      street1: verificationResult.street1 || "",
      street2: null,
      city: verificationResult.city || "",
      state: verificationResult.state || "",
      zip: verificationResult.zip || "",
      country: verificationResult.country || ""
    };

    return { code: "SUSPEND", data: suggestedAddress };
  }

  private compareAddresses(
    address: PostalAddress,
    verificationResult: any
  ): boolean {
    log("cmprAddr ", address);
    log("cmprAddr ", verificationResult);
    return (
      address.street1.toLowerCase() ===
        verificationResult.street1.toLowerCase() &&
      address.city.toLowerCase() === verificationResult.city.toLowerCase() &&
      address.state.toLowerCase() === verificationResult.state.toLowerCase() &&
      address.zip.toLowerCase() === verificationResult.zip.toLowerCase() &&
      address.country.toLowerCase() === verificationResult.country.toLowerCase()
    );
  }
}
