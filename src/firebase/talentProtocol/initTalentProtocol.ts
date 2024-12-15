import { TalentProtocol } from '@/types/talentProtocol'

export const initTalentProtocol: TalentProtocol = {
  userId: '',
  passport: {
    activity_score: 0,
    calculating_score: false,
    created_at: '',
    human_checkmark: false,
    identity_score: 0,
    last_calculated_at: '',
    main_wallet: '',
    main_wallet_changed_at: null,
    merged: false,
    nominations_received_count: 0,
    passport_id: 0,
    passport_profile: {
      bio: null,
      data_sources: {},
      display_name: null,
      image_url: null,
      location: null,
      name: null,
      tags: []
    },
    passport_socials: [],
    pending_kyc: false,
    score: 0,
    skills_score: 0,
    socials_calculated_at: null,
    user: null,
    verified: false,
    verified_wallets: []
  }
}
