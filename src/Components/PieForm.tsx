import React, { ChangeEvent, Dispatch, FC } from 'react';
import { COLORS } from '../Common/color-constant';
import { PieChartData } from './App';
import '../styles/PieForm.css';

interface Props {
  setPieChartData: Dispatch<React.SetStateAction<PieChartData[]>>;
  pieChartData: Array<PieChartData>;
}

export const PieForm: FC<Props> = ({ setPieChartData, pieChartData }) => {
  const handleChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    const newArr: PieChartData[] = [...pieChartData];
    if (newArr[index].color === '')
      newArr[index].color = COLORS[Math.floor(Math.random() * COLORS.length)];
    switch (event.target.id) {
      case 'position':
        newArr[index].position = event.target.value;
        setPieChartData(newArr);
        break;
      case 'amount':
        newArr[index].amount = +event.target.value;
        setPieChartData(newArr);
        break;
      default:
        break;
    }
  };
  const addPosition = (): void => {
    setPieChartData((result) => [
      ...result,
      { position: '', amount: 0, color: '' },
    ]);
  };
  const removePosition = (index: number): void => {
    setPieChartData((res) => {
      const newArr: PieChartData[] = [...res];
      newArr.splice(index, 1);
      return newArr;
    });
  };
  return (
    <div className="pie-form">
      {pieChartData.map((item, index) => {
        return (
          <form key={index}>
            <div className="form-input">
              <label htmlFor="position">Position: </label>
              <input
                autoComplete="off"
                type="text"
                name="position"
                id="position"
                value={item.position}
                onChange={(event) => handleChange(index, event)}
              />
            </div>
            <div className="form-input">
              <label htmlFor="quantity">Quantity: </label>
              <input
                autoComplete="off"
                type="number"
                name="amount"
                id="amount"
                value={item.amount}
                onChange={(event) => handleChange(index, event)}
              />
            </div>
            <div>
              <input
                className="remove-btn"
                type="button"
                value="Remove"
                onClick={() => removePosition(index)}
              />
            </div>
          </form>
        );
      })}
      <input
        className="add-position"
        type="button"
        value="Add position"
        onClick={addPosition}
      />
    </div>
  );
};
