import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import Image from '~/components/Image';
import { LikeVideo, AddButton } from '~/components/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faCommentDots, faMusic, faPlay, faShare } from '@fortawesome/free-solid-svg-icons';
import * as getUserVideosServices from '~/services/getUserVideosService';
import * as getUserServices from '~/services/getUsersService';
import { Link } from 'react-router-dom';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Home() {
    const videoRef = useRef([]);
    const [videosWithUserInfo, setVideosWithUserInfo] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const videoData = await getUserVideosServices.videos();

                const userData = await getUserServices.users();

                const combinedData = videoData.map((video) => {
                    const user = userData.find((user) => user.id === video.user_id);
                    return {
                        ...video,
                        avatar: user?.avatar,
                        nickname: user?.nickname,
                        full_name: user?.full_name,
                    };
                });

                setVideosWithUserInfo(combinedData);
            } catch (error) {
                console.error('Error fetching videos: ', error);
            }
        };

        fetchApi();
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const video = entry.target;
                    if (entry.isIntersecting) {
                        video.play().catch((err) => {
                            console.error('Error: ', err);
                        });
                    } else {
                        video.pause();
                    }
                });
            },
            { threshold: 1 },
        );

        const currentVideos = videoRef.current;

        currentVideos.forEach((video) => {
            if (video) {
                observer.observe(video);
            }
        });

        return () => {
            currentVideos.forEach((video) => {
                if (video) {
                    observer.unobserve(video);
                }
            });
        };
    }, [videosWithUserInfo]);

    const handleVideo = (index) => {
        const video = videoRef.current[index];
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className={cx('home-wrapper')}>
            <div className={cx('wrapper-collum')}>
                <div className={cx('wrapper-collum-list')}>
                    {Array.isArray(videosWithUserInfo) && videosWithUserInfo.length > 0 ? (
                        videosWithUserInfo.map((result, index) => (
                            <div key={index.id} className={cx('wrapper')}>
                                <div className={cx('main-content')}>
                                    <video
                                        className={cx('content')}
                                        ref={(el) => (videoRef.current[index] = el)}
                                        src={result.video_path}
                                        onClick={() => handleVideo(index)}
                                        loop
                                    />
                                    {!isPlaying && (
                                        <FontAwesomeIcon
                                            icon={faPlay}
                                            className={cx('pause-btn')}
                                            onClick={() => handleVideo(index)}
                                        />
                                    )}
                                    <div className={cx('media-card-bottom')}>
                                        <div className={cx('author-title')}>
                                            <div className={cx('author-container')}>
                                                <Link to={`/`} className={cx('link')}>
                                                    <h3>{result.full_name}</h3>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className={cx('decryption')}>
                                            <div className={cx('decryption-conteiner')}>
                                                <div className={cx('decryption-content')}>
                                                    <h1>
                                                        <span>{result.title} </span>
                                                        {Array.isArray(result.hashtag) &&
                                                            result.hashtag.map((tag) => (
                                                                <Link to={`/`} className={cx('link')} key={tag}>
                                                                    <strong>{tag} </strong>
                                                                </Link>
                                                            ))}
                                                        <Button textOnly>more</Button>
                                                    </h1>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('sound')}>
                                            <FontAwesomeIcon icon={faMusic} className={cx('music-icon')} />
                                            <Link to={`/`} className={cx('link')}>
                                                {result.sound}
                                            </Link>
                                        </div>
                                    </div>

                                    <div className={cx('content-action-bar')}>
                                        <div className={cx('avatar-wrapper')}>
                                            <Image
                                                className={cx('user-avatar')}
                                                src={result.avatar}
                                                alt={result.full_name}
                                            />
                                            <div className={cx('follow')}>
                                                <AddButton />
                                            </div>
                                        </div>

                                        <button className={cx('action-btn')}>
                                            <span className={cx('icon-btn')}>
                                                <LikeVideo />
                                            </span>
                                            <strong>{result.likes_count}</strong>
                                        </button>

                                        <button className={cx('action-btn')}>
                                            <span className={cx('icon-btn')}>
                                                <FontAwesomeIcon icon={faCommentDots} className={cx('icon')} />
                                            </span>
                                            <strong>{result.comments_count}</strong>
                                        </button>

                                        <button className={cx('action-btn')}>
                                            <span className={cx('icon-btn')}>
                                                <FontAwesomeIcon icon={faBookmark} className={cx('icon')} />
                                            </span>
                                            <strong>{result.save_count}</strong>
                                        </button>

                                        <button className={cx('action-btn')}>
                                            <span className={cx('icon-btn')}>
                                                <FontAwesomeIcon icon={faShare} className={cx('icon')} />
                                            </span>
                                            <strong>{result.share_count}</strong>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No videos available</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
