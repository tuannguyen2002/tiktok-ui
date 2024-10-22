import styles from '../Home.module.scss';
import classNames from 'classnames/bind';
import Image from '~/components/Image';
import { LikeVideo, AddButton } from '~/components/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faCommentDots, faShare } from '@fortawesome/free-solid-svg-icons';
import { formatNumber } from '~/utils/formatNumber';

const cx = classNames.bind(styles);

function MediaActionBar({ data }) {
    return (
        <div className={cx('content-action-bar')}>
            <div className={cx('avatar-wrapper')}>
                <Image className={cx('user-avatar')} src={data.avatar} alt={data.full_name} />
                <div className={cx('follow')}>
                    <AddButton />
                </div>
            </div>

            <button className={cx('action-btn')}>
                <span className={cx('icon-btn')}>
                    <LikeVideo />
                </span>
                <strong>{formatNumber(data.likes_count)}</strong>
            </button>

            <button className={cx('action-btn')}>
                <span className={cx('icon-btn')}>
                    <FontAwesomeIcon icon={faCommentDots} className={cx('icon')} />
                </span>
                <strong>{formatNumber(data.comments_count)}</strong>
            </button>

            <button className={cx('action-btn')}>
                <span className={cx('icon-btn')}>
                    <FontAwesomeIcon icon={faBookmark} className={cx('icon')} />
                </span>
                <strong>{formatNumber(data.save_count)}</strong>
            </button>

            <button className={cx('action-btn')}>
                <span className={cx('icon-btn')}>
                    <FontAwesomeIcon icon={faShare} className={cx('icon')} />
                </span>
                <strong>{formatNumber(data.share_count)}</strong>
            </button>
        </div>
    );
}

export default MediaActionBar;
