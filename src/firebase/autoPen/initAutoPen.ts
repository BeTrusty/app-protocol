import { AutoPen } from "@/types/autoPen";

export const initAutoPen: AutoPen = {
    nft: {
        tokenId: "",
        contractAddress:"",
        transactionHash: "",
    },
    certificate: {
        serialNumber: "",
        subject: "",
        issuer: "",
        validFrom:"",
        validTo: "",
        pemData: []
    }
}