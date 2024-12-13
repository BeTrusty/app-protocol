export interface AutoPen{
    nft: {
        tokenId: string
        contractAddress:string
        transactionHash: string
    },
    certificate: {
        serialNumber: string
        subject: string
        issuer: string
        validFrom:string
        validTo: string
        pemData: object
    }
}