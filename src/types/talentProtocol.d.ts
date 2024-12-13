export interface TalentProtocol {
    passport: {
        activity_score: number
        calculating_score: boolean
        created_at: string
        human_checkmark: boolean
        identity_score: number
        last_calculated_at:string
        main_wallet: string
        main_wallet_changed_at: null |string,
        merged: boolean,
        nominations_received_count: number
        passport_id: number
        passport_profile: {
            bio: null | string
            data_sources: {}
            display_name: null | string
            image_url: null | string
            location: null | string
            name: null | string
            tags: string[]
        },
        passport_socials: string[]
        pending_kyc: boolean
        score: number
        skills_score: number
        socials_calculated_at: null
        user: null
        verified: boolean
        verified_wallets: string[
        ]
    }
}