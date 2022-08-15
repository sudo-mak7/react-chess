import React, {FC} from 'react';
import {Cell} from "../models/Cell";

interface CellProps {
  cell: Cell
  selected: boolean
  click: (cell: Cell) => void
  whiteWins: boolean
  blackWins: boolean
}

const CellComponent: FC<CellProps> = ({cell,
                                        selected,
                                        click,
                                        whiteWins,
                                        blackWins
}) => {
  return (
    <div
      className={['cell',
        cell.color,
        selected ? 'selected' : '',
        cell.available && cell.figure ? 'target' : ''
      ].join(' ')}
      onClick={whiteWins || blackWins ? () => {} : () => {click(cell)}}
    >
      {cell.available && !cell.figure && <div className="available"></div>}
      {cell.figure?.pic && <img src={cell.figure.pic} alt='' />}
    </div>
  );
};

export default CellComponent;