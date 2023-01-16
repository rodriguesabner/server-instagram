interface FollowingProps {
    pk: number;
    username: string;
    is_verified: boolean;
    profile_pic_id: string;
    profile_pic_url: string;
    pk_id: string;
    is_private: boolean;
    full_name: string;
    account_badges: any[];
    has_anonymous_profile_picture: boolean;
    latest_reel_media: number;
    is_favorite: boolean;
}

export default FollowingProps;
