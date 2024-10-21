import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import AccountItem from './AccountItem';
import * as getUsersService from '~/services/getUsersService';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function SuggestedAccounts({ label }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const result = await getUsersService.usersLimit(showAll ? 15 : 5);
                setUsers(result);
            } catch (error) {
                console.error('Error fetching users: ', error);
            } finally {
                setLoading(false);
            }
        };

        fetchApi();
    }, [showAll]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>
            {users && users.length > 0 && users.map((result) => <AccountItem key={result.id} data={result} />)}
            {users.length <= 5 ? (
                <p onClick={() => setShowAll(true)} className={cx('more-btn')}>
                    See more
                </p>
            ) : (
                <p className={cx('more-btn')}>See all</p>
            )}
        </div>
    );
}

SuggestedAccounts.propTypes = {
    label: PropTypes.string.isRequired,
};

export default SuggestedAccounts;
