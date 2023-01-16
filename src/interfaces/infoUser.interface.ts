interface TargetUserInfoProps {
    pk: number;
    username: string;
    follow_friction_type: number;
    is_verified: boolean;
    profile_pic_id: string;
    profile_pic_url: string;
    pk_id: string;
    full_name: string;
    is_private: boolean;
    account_badges: [];
    has_anonymous_profile_picture: string;
    is_supervision_features_enabled: string;
    follower_count: number;
    media_count: number;
    following_count: number;
    following_tag_count: number;
    can_use_affiliate_partnership_messaging_as_creator: boolean;
    can_use_affiliate_partnership_messaging_as_brand: boolean;
    has_private_collections: boolean;
    show_account_transparency_details: boolean;
    has_music_on_profile: boolean;
    is_direct_roll_call_enabled: boolean;
    is_api_user: boolean;
    is_potential_business: boolean;
    fan_club_info: any;
    is_muted_words_global_enabled: boolean;
    is_muted_words_custom_enabled: boolean;
    is_muted_words_spamscam_enabled: boolean;
    fbid_v2: string;
    has_eligible_whatsapp_linking_category: boolean;
    whatsapp_number: string;
    is_whatsapp_linked: boolean;
    transparency_product_enabled: boolean;
    is_hide_more_comment_enabled: boolean;
    is_quiet_mode_enabled: boolean;
    last_seen_timezone: string;
    allow_tag_setting: string;
    allow_mention_setting: string;
    is_facebook_onboarded_charity: boolean;
    has_active_charity_business_profile_fundraiser: boolean;
    charity_profile_fundraiser_info: {
        pk: number;
        is_facebook_onboarded_charity: boolean;
        has_active_fundraiser: boolean;
        consumption_sheet_config: {
            can_viewer_donate: boolean;
            currency?: null;
            donation_url?: null;
            privacy_disclaimer?: null;
            donation_disabled_message: string;
            donation_amount_config: {
                donation_amount_selector_values: any[];
                default_selected_donation_value?: null;
                minimum_donation_amount?: null;
                maximum_donation_amount?: null;
                prefill_amount?: null;
                user_currency?: null
            },
            you_donated_message?: null;
            profile_fundraiser_id?: null;
            has_viewer_donated?: null
        }
    };
    interop_messaging_user_fbid: number;
    bio_links: [];
    can_add_fb_group_link_on_profile: boolean;
    can_follow_hashtag: boolean;
    show_insights_terms: boolean;
    external_url: string;
    show_shoppable_feed: boolean;
    shoppable_posts_count: number;
    merchant_checkout_style: string;
    seller_shoppable_feed_type: string;
    has_active_affiliate_shop: boolean;
    can_tag_products_from_merchants: boolean;
    is_auto_highlight_enabled: boolean;
    eligible_shopping_signup_entrypoints: any[];
    shopping_onboarding_state: string;
    can_influencers_tag_business_products: boolean;
    is_shopping_revoked_for_seller: boolean;
    can_merchant_use_shop_management: boolean;
    shop_management_access_state: string;
    is_eligible_for_product_tagging_null_state: boolean;
    eligible_catalog_management_entrypoints: [];
    is_seller_features_disabled: boolean;
    commerce_onboarding_config: any;
    is_igd_product_picker_enabled: boolean;
    is_eligible_for_affiliate_shop_onboarding: boolean;
    eligible_shopping_formats: [];
    needs_to_accept_shopping_seller_onboarding_terms: boolean;
    is_shopping_settings_enabled: boolean;
    is_shopping_community_content_enabled: boolean;
    is_shopping_auto_highlight_eligible: boolean;
    is_shopping_catalog_source_selection_enabled: boolean;
    is_eligible_to_show_fb_cross_sharing_nux: boolean;
    has_guides: boolean;
    has_highlight_reels: boolean;
    allowed_commenter_type: string;
    aggregate_promote_engagement: boolean;
    show_conversion_edit_entry: boolean;
    fbpay_experience_enabled: boolean;
    has_placed_orders: boolean;
    hd_profile_pic_url_info: any;
    hd_profile_pic_versions: any[];
    is_interest_account: boolean;
    is_needy: boolean;
    usertags_count: number;
    usertag_review_enabled: boolean;
    is_profile_action_needed: boolean;
    reel_auto_archive: string;
    total_ar_effects: 0;
    has_saved_items: boolean;
    total_clips_count: number;
    has_videos: boolean;
    total_igtv_videos: number;
    can_see_support_inbox_v1: boolean;
    can_boost_post: boolean;
    can_see_support_inbox: boolean;
    can_be_tagged_as_sponsor: boolean;
    is_allowed_to_create_standalone_nonprofit_fundraisers: boolean;
    is_allowed_to_create_standalone_personal_fundraisers: boolean;
    can_create_new_standalone_fundraiser: boolean;
    can_create_new_standalone_personal_fundraiser: boolean;
    biography: string;
    include_direct_blacklist_status: boolean;
    can_link_entities_in_bio: boolean;
    biography_with_entities: {
        raw_text: string;
        entities?: any[]
    };
    show_fb_link_on_profile: boolean;
    primary_profile_link_type: number;
    can_create_sponsor_tags: boolean;
    can_convert_to_business: boolean;
    can_see_organic_insights: boolean;
    is_eligible_for_smb_support_flow: boolean;
    is_eligible_for_lead_center: boolean;
    is_experienced_advertiser: boolean;
    lead_details_app_id: string;
    is_business: boolean;
    professional_conversion_suggested_account_type: number;
    account_type: number;
    direct_messaging: string;
    fb_page_call_to_action_id: string;
    can_claim_page: boolean;
    can_crosspost_without_fb_token: boolean;
    profile_visits_count: number;
    profile_visits_num_days: number;
    instagram_location_id: string;
    address_street: string;
    business_contact_method: string;
    city_id: number;
    city_name: string;
    contact_phone_number: number;
    is_profile_audio_call_enabled: boolean;
    latitude: number;
    longitude: number;
    public_email: string;
    public_phone_country_code: string;
    public_phone_number: string;
    zip: string;
    can_hide_category: boolean;
    can_hide_public_contacts: boolean;
    should_show_category: boolean;
    category: string;
    category_id: number;
    is_category_tappable: boolean;
    should_show_public_contacts: boolean;
    has_chaining: boolean;
    current_catalog_id: null;
    mini_shop_seller_onboarding_status: null;
    shopping_post_onboard_nux_type: null;
    ads_incentive_expiration_date: null;
    displayed_action_button_partner: null;
    smb_delivery_partner: null;
    smb_support_delivery_partner: null;
    displayed_action_button_type: null;
    smb_support_partner: null;
    is_call_to_action_enabled: boolean;
    num_of_admined_pages: 2;
    request_contact_enabled: boolean;
    robi_feedback_source: null;
    is_memorialized: boolean;
    open_external_url_with_in_app_browser: boolean;
    has_exclusive_feed_content: boolean;
    has_fan_club_subscriptions: boolean;
    pinned_channels_info: {
        pinned_channels_list: any[];
        has_public_channels: boolean
    };
    besties_count: 37;
    show_besties_badge: boolean;
    recently_bestied_by_count: 0;
    nametag: {
        mode: number;
        gradient: string;
        emoji: string;
        selfie_sticker: string;
    };
    about_your_account_bloks_entrypoint_enabled: boolean;
    auto_expanding_chaining: boolean;
    existing_user_age_collection_enabled: boolean;
    show_post_insights_entry_point: boolean;
    has_public_tab_threads: boolean;
    feed_post_reshare_disabled: boolean;
    auto_expand_chaining: boolean;
    is_new_to_instagram: boolean;
    highlight_reshare_disabled: boolean;
}

export default TargetUserInfoProps;