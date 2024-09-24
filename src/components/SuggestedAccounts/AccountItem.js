import classNames from 'classnames/bind';
// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './SuggestedAccounts.module.scss';
import AccountPreview from './AccountPreview/AccountPreview';

const cx = classNames.bind(styles);

function AccountItem() {
    const renderPreview = (props) => {
        return (
            <div tabIndex="-1" {...props}>
                <PopperWrapper>
                    <AccountPreview />
                </PopperWrapper>
            </div>
        );
    };

    return (
        <div>
            <Tippy interactive delay={[800, 0]} offset={[-20, 0]} placement="bottom" render={renderPreview}>
                <div className={cx('account-item')}>
                    <img
                        className={cx('avatar')}
                        src="https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/b2b0c654a9266e8b084cd824c2c4ef4e.jpeg?lk3s=a5d48078&nonce=9777&refresh_token=c5bb0b704f3ad88179b498fa4dd440b4&x-expires=1725523200&x-signature=llQH3w0HeMe6DC6BhC51f66HrfY%3D&shp=a5d48078&shcp=81f88b70"
                        alt="quoc"
                    />
                    <div className={cx('item-info')}>
                        <p className={cx('nickname')}>
                            <strong>quocnguyenphu</strong>
                            <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                        </p>
                        <p className={cx('name')}>Quoc NGuyen Phu</p>
                    </div>
                </div>
            </Tippy>
        </div>
    );
}

AccountItem.propTypes = {};

export default AccountItem;
