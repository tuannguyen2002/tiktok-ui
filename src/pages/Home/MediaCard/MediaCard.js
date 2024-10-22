import styles from '../Home.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import * as getUserVideosServices from '~/services/getUserVideosService';
import * as getUserServices from '~/services/getUsersService';
import { Link } from 'react-router-dom';
import Button from '~/components/Button';
import MediaActionBar from '../MediaActionBar';
import { SoundButton, SoundMuteButton } from '~/components/Icons';

const cx = classNames.bind(styles);

function MediaCard() {
    const videoRef = useRef([]);
    const [mutedStatus, setMutedStatus] = useState([]);
    const [videosWithUserInfo, setVideosWithUserInfo] = useState([]);

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
        setMutedStatus(new Array(videosWithUserInfo.length).fill(false));
    }, [videosWithUserInfo]);

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
    };

    const handleMuted = (index) => {
        const video = videoRef.current[index];
        video.muted = !video.muted;
        const newMutedStatus = [...mutedStatus];
        newMutedStatus[index] = video.muted;
        setMutedStatus(newMutedStatus);
    };

    return (
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
                                muted={mutedStatus[index]}
                                loop
                            />
                            <div className={cx('sound-icon')} onClick={() => handleMuted(index)}>
                                {mutedStatus[index] ? <SoundMuteButton /> : <SoundButton />}
                            </div>
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

                            <MediaActionBar key={result.id} data={result} />
                        </div>
                    </div>
                ))
            ) : (
                <p>No videos available</p>
            )}
        </div>
    );
}

export default MediaCard;
