interface MessageProps {
    message: string;
}

const BASE_CLASS = 'destinations-app__search-results';

export const Message = ({message}: MessageProps): JSX.Element =>
    <div className={BASE_CLASS}>
        <div className={`${BASE_CLASS}__message`}>{message}</div>
    </div>

