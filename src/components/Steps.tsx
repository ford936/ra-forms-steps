import React, { useState } from 'react';
import './Steps.css';

interface DistanceData {
  date: string;
  distance: number;
}

const Steps: React.FC = () => {
  const [distances, setDistances] = useState<DistanceData[]>([]);
  const [newDate, setNewDate] = useState<string>('');
  const [newDistance, setNewDistance] = useState<number | ''>('');

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewDate(event.target.value);
  };

  const handleDistanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewDistance(event.target.value as number | '');
  };

  const handleAddDistance = () => {
    if (newDate && newDistance !== '') {
      const existingIndex = distances.findIndex((item) => item.date === newDate);

      if (existingIndex !== -1) {
        const updatedDistances = [...distances];
        updatedDistances[existingIndex].distance += Number(newDistance);
        setDistances(updatedDistances);
      } else {
        setDistances([...distances, { date: newDate, distance: Number(newDistance) }]);
      }

      setNewDate('');
      setNewDistance('');
    }
  };

  const handleRemoveDistance = (index: number) => {
    const updatedDistances = distances.filter((_, i) => i !== index);
    setDistances(updatedDistances);
  };

  const sortedDistances = [...distances].sort((a, b) => {
    return new Date(b.date.split('.').reverse().join('-')).getTime() - new Date(a.date.split('.').reverse().join('-')).getTime();
  });

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleAddDistance();
    }
  };

  return (
    <>
      <div className='title'>
        <h4>Дата (ДД.ММ.ГГГГ)</h4>
        <h4>Пройдено км</h4>
      </div>
      <form className='input'>
        <input type="text" value={newDate} onChange={handleDateChange} onKeyDown={handleKeyDown} />
        <input type="number" step="0.1" value={newDistance} onChange={handleDistanceChange} onKeyDown={handleKeyDown} />
        <button type="button" onClick={handleAddDistance}>Добавить</button>
      </form>
      <div className='title-result'>
        <p style={{ paddingRight: '10px' }}>Дата (ДД.ММ.ГГГГ)</p><p style={{ paddingRight: '10px' }}>Пройдено км</p><p style={{ paddingRight: '10px' }}>Действия</p>
      </div>
      <div className='output'>
        {sortedDistances.map((item, index) => (
          <div key={index}>
            <span style={{ marginRight: '70px' }}>{item.date}</span>
            <span style={{ marginRight: '70px' }}>{item.distance}</span>
            <span onClick={() => handleRemoveDistance(index)} style={{ cursor: 'pointer' }}>✎ ✘</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Steps;