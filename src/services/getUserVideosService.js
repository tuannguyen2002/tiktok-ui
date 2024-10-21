import * as httpRequest from '~/utils/httpRequest';

export const videos = async () => {
    try {
        const res = await httpRequest.getUserVideos('/user_video');
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
