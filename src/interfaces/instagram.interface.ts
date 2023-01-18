import { IgApiClient } from 'instagram-private-api';

export interface LoggedInUserProps {
    pk: number;
    username: string;
    is_verified: boolean;
    profile_pic_id: string;
    profile_pic_url: string;
    is_private: boolean;
    full_name: string;
    pk_id: string;
    account_badges: any[];
    has_anonymous_profile_picture: boolean;
    is_supervision_features_enabled: boolean;
    all_media_count: number;
    is_muted_words_global_enabled: boolean;
    is_muted_words_custom_enabled: boolean;
    is_muted_words_spamscam_enabled: boolean;
    fbid_v2: string;
    is_hide_more_comment_enabled: boolean;
    is_quiet_mode_enabled: boolean;
    last_seen_timezone: string;
    interop_messaging_user_fbid: string;
    bio_links: [];
    can_add_fb_group_link_on_profile: boolean;
    external_url: string;
    allowed_commenter_type: string;
    show_conversion_edit_entry: boolean;
    hd_profile_pic_url_info: {
        url: string;
        width: number;
        height: number;
    },
    hd_profile_pic_versions: any[];
    reel_auto_archive: string;
    biography: string;
    can_link_entities_in_bio: boolean;
    biography_with_entities: any;
    show_fb_link_on_profile: boolean;
    primary_profile_link_type: number;
    has_biography_translation: boolean;
    gender: number;
    email: string;
    can_hide_category: boolean,
    can_hide_public_contacts: boolean,
    should_show_category: boolean,
    category: string;
    category_id: number;
    is_category_tappable: boolean,
    should_show_public_contacts: boolean,
    is_eligible_for_smb_support_flow: boolean,
    is_eligible_for_lead_center: boolean,
    is_experienced_advertiser: boolean,
    lead_details_app_id: string;
    is_business: boolean,
    professional_conversion_suggested_account_type: number;
    account_type: number;
    direct_messaging: string;
    can_claim_page: boolean,
    can_crosspost_without_fb_token: boolean,
    profile_visits_count: number;
    profile_visits_num_days: number;
    instagram_location_id: string;
    address_street: string;
    business_contact_method: string;
    city_id: number;
    city_name: string;
    contact_phone_number: string;
    is_profile_audio_call_enabled: boolean;
    latitude: number;
    longitude: number;
    public_email: string;
    public_phone_country_code: string;
    public_phone_number: string;
    zip: string;
    page_id: null;
    page_name: null;
    ads_page_id: null;
    ads_page_name: null;
    birthday: string;
    displayed_action_button_partner: null;
    smb_delivery_partner: null;
    smb_support_delivery_partner: null;
    displayed_action_button_type: null;
    smb_support_partner: null;
    is_call_to_action_enabled: boolean;
    num_of_admined_pages: null;
    phone_number: string;
    country_code: number;
    national_number: number;
    custom_gender: string;
    trusted_username: string;
    trust_days: number;
    profile_edit_params: any;
    inputLogin: string;
    inputPassword: string;
    inputProxy?: string;
    verificationMode?: string;
}

export interface InstagramInstanceProps extends IgApiClient {
    loggedInUser: LoggedInUserProps;
    shortid?: string;
    db?: any;
}

export default InstagramInstanceProps;
