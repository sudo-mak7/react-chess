import React, {FC} from 'react';
import {Figure} from "../models/figures/Figure";

interface LostFiguresProps {
  title: string
  figures: Figure[]
}

const LostFigures: FC<LostFiguresProps> = ({title, figures}) => {
  return (
    <div className="outline lost-figures-field">
      <h3>{title.toUpperCase()}</h3>
      <div className="sidebar-figures-area">
        {figures.map(figure =>
          <div
            className="lost-figures"
            key={figure.id}
          >
            {figure.pic && <img className="sidebar-figures" src={figure.pic}/>}
          </div>
        )}
      </div>
    </div>
  );
};

export default LostFigures;