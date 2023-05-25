import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { Marinade, MarinadeConfig, MarinadeReferralPartnerState } from "@marinade.finance/marinade-ts-sdk";
import { AnchorProvider, Program, Wallet } from "@coral-xyz/anchor";
import { MarinadeReferral, IDL } from "@marinade.finance/marinade-ts-sdk/programs/idl/types/marinade_referral";

// From testsuite
export const PROVIDER_URL = 'https://api.devnet.solana.com'
export const CONNECTION = new Connection(PROVIDER_URL, {
  commitment: 'confirmed',
})
export const REFERRAL_CODE = new PublicKey(
  'RFTpNa1t7k2R7MUZYJyhYHB4wGHbU1tzCHAShXcy2oL'
)
export const PARTNER_NAME = 'REF_TEST'
export const SDK_USER = Keypair.fromSecretKey(
  new Uint8Array([
    120, 45, 242, 38, 63, 135, 84, 226, 66, 56, 76, 216, 125, 144, 38, 182, 53,
    47, 169, 251, 128, 65, 185, 237, 41, 47, 64, 53, 158, 124, 64, 2, 132, 229,
    176, 107, 25, 190, 28, 223, 58, 136, 95, 237, 236, 176, 26, 160, 11, 12,
    131, 129, 21, 8, 221, 100, 249, 221, 177, 114, 143, 231, 102, 250,
  ])
)
export const PROVIDER = new AnchorProvider(CONNECTION, new Wallet(SDK_USER), {
  commitment: 'confirmed' /*, skipPreflight: true*/,
})


const main = async () => {
  try {
    const config = new MarinadeConfig({
      connection: CONNECTION,
      referralCode: REFERRAL_CODE,
    })
    const marinade = new Marinade(config)

    const referralProgram = new Program<MarinadeReferral>(
      IDL,
      config.marinadeReferralProgramId,
      PROVIDER
    )

    const { state } = await MarinadeReferralPartnerState.fetch2(referralProgram, config, REFERRAL_CODE)

    console.log("hello world", state.depositSolAmount.toString());
  } catch (error) {
    console.log({ error });
  }
};

main();
