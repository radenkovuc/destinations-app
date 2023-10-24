import classNames from 'classnames';

interface MessageProps {
    message: string;
    isError?: boolean
}

const BASE_CLASS = 'destinations-app__search-results';

export const Message = ({message, isError}: MessageProps): JSX.Element =>
    <div className={BASE_CLASS}>
        <div
            className={classNames(`${BASE_CLASS}__message`, isError && `${BASE_CLASS}__message--error`)}>{message}</div>
    </div>

