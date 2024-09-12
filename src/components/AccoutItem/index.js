import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import Image from '~/components/Image'
import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

function AccoutItem() {
    return (
        <div className={cx('wrapper')}>
            <Image
                src="https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/b2b0c654a9266e8b084cd824c2c4ef4e.jpeg?lk3s=a5d48078&nonce=9777&refresh_token=c5bb0b704f3ad88179b498fa4dd440b4&x-expires=1725523200&x-signature=llQH3w0HeMe6DC6BhC51f66HrfY%3D&shp=a5d48078&shcp=81f88b70"
                alt="Hoaa"
                className={cx('avatar')}
            />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>Nguyen Minh Hoa</span>
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                </h4>
                <span className={cx('username')}>Hoaa.nguyen</span>
            </div>
        </div>
    );
}

export default AccoutItem;
