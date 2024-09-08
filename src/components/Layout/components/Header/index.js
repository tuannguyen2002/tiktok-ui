import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass, faCircleNotch} from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button';
import styles from './Header.module.scss'
import images from '~/assets/images'
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccoutItem from '~/components/AccoutItem';

const cx = classNames.bind(styles)

function Header() {

    const [searchResult, setSearchResult] = useState([])

    useEffect(() => {
        setTimeout(() => {
            setSearchResult([1,2,3])
        }, 0)
    },[])

    return <header className={cx('wrapper')}>
        <div className={cx('inner')}>
            <div className={cx('logo')}>
                <img src={images.logo} alt='Tiktok' />
            </div>

            <Tippy
                interactive
                visible={searchResult.length > 0}
                render={attrs => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Accouts</h4>
                            <AccoutItem />
                            <AccoutItem />
                            <AccoutItem />
                            <AccoutItem />
                            <AccoutItem />
                        </PopperWrapper>
                    </div>
                )}
            >
                <div className={cx('search')}>
                    <input placeholder='Search accouts and videos' spellCheck={false}/>
                    <button className={cx('clear')}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                        <FontAwesomeIcon className={cx('loading')} icon={faCircleNotch} />
                    <button className={cx('search-btn')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
            </Tippy>
            <div className={cx('actions')}>
                <Button text>Upload</Button>
                <Button primary>Log in</Button>
            </div>
        </div>
    </header>
}

export default Header;