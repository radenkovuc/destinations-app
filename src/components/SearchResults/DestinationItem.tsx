import classNames from 'classnames';

import {Destination} from "@/domain";

const BASE_CLASS = 'destinations-app__search-results__destination';

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
        className={classNames(BASE_CLASS, isSelected && `${BASE_CLASS}--selected`)}
        key={destination.id}
        onClick={onSelectResult}
        onMouseEnter={onHoverResult}
    >{destination.name}</div>
