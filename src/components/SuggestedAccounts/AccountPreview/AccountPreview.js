import classNames from 'classnames/bind';
import styles from './AccountPreview.module.scss';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Image from '~/components/Image';
import { formatNumber } from '~/utils/formatNumber';

const cx = classNames.bind(styles);

function AccountPreview({ dataPreview }) {
    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <Image className={cx('avatar')} src={dataPreview.avatar} alt={dataPreview.full_name} />
                <Button className={cx('follow-btn')} primary>
                    Follow
                </Button>
            </header>
            <div className={cx('body')}>
                <p className={cx('nickname')}>
                    <strong>{dataPreview.nickname}</strong>
                    {dataPreview.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                </p>
                <p className={cx('name')}>{dataPreview.full_name}</p>
                <p className={cx('analytics')}>
                    <strong className={cx('value')}>{formatNumber(dataPreview.followers_count)} </strong>
                    <span className={cx('label')}>Follower</span>
                    <strong className={cx('value')}>{formatNumber(dataPreview.likes_count)} </strong>
                    <span className={cx('label')}>Like</span>
                </p>
            </div>
        </div>
    );
}

export default AccountPreview;
