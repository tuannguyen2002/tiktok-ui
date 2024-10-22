import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import MediaCard from './MediaCard';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('home-wrapper')}>
            <div className={cx('wrapper-collum')}>
                <MediaCard />
            </div>
        </div>
    );
}

export default Home;
