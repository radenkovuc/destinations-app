import classNames from 'classnames';

import classes from "./SearchResults.module.css";

interface MessageProps {
    message: string;
    isError?: boolean
}

export const Message = ({message, isError}: MessageProps): JSX.Element =>
    <div className={classes.container}>
        <div
            className={classNames(classes.message, isError && classes.messageError)}>{message}</div>
    </div>

