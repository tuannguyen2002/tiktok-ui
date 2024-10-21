import * as httpRequest from '~/utils/httpRequest';

export const usersLimit = async (limit = 5) => {
    try {
        const res = await httpRequest.getUsers(`/data?_limit=${limit}`);
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const users = async () => {
    try {
        const res = await httpRequest.getUsers(`/data`);
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
