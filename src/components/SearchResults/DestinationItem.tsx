import classNames from 'classnames';

import {Destination} from "@/domain";

import classes from "./SearchResults.module.css";

interface DestinationItemProps {
    isSelected: boolean;
    destination: Destination
    onSelectResult: () => void
    onHoverResult: () => void
}

export const DestinationItem = ({
                                    isSelected,
                                    destination,
                                    onSelectResult,
                                    onHoverResult
                                }: DestinationItemProps): JSX.Element =>
    <div
        className={classNames(classes.destination, isSelected && classes.destinationSelected)}
        key={destination.id}
        onClick={onSelectResult}
        onMouseEnter={onHoverResult}
    >{destination.name}</div>
