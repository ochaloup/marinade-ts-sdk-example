import { Connection, PublicKey } from "@solana/web3.js";
import { Marinade, MarinadeConfig } from "chalda-marinade-ts-sdk";

// From testsuite
export const PROVIDER_URL = 'https://api.devnet.solana.com'
export const CONNECTION = new Connection(PROVIDER_URL, {
  commitment: 'confirmed',
})
export const REFERRAL_CODE = new PublicKey(
  'RFTpNa1t7k2R7MUZYJyhYHB4wGHbU1tzCHAShXcy2oL'
)
export const PARTNER_NAME = 'REF_TEST'


const main = async () => {
  try {
    const config = new MarinadeConfig({
      connection: CONNECTION,
      referralCode: REFERRAL_CODE,
    })
    const marinade = new Marinade(config)

    const { state } = await marinade.getReferralPartnerState()

    console.log("hello world");
  } catch (error) {
    console.log({ error });
  }
};

main();
