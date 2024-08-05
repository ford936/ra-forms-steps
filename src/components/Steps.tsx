import { useState } from "react";
import "./Steps.css";

interface IRecordsData {
  date: string;
  distance: number;
}

export default function Steps() {
  const [records, setRecords] = useState<IRecordsData[]>([]);
  const [date, setDate] = useState<string>("");
  const [distance, setDistance] = useState<number | "">("");
  const [editIndex, setEditIndex] = useState<number>(-1);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (date && distance) {
      const newRecords = [...records];
      const foundRecord = records.find((item) => item.date === date);

      if (foundRecord) {
        foundRecord.distance += Number(distance);
        setRecords(newRecords);
      } else {
        newRecords.push({ date, distance: Number(distance) });
      }
      newRecords.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setRecords(newRecords);
      setDate("");
      setDistance("");
      setEditIndex(-1);
    }
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handleDistanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDistance(event.target.value as number | "");
  };

  const saveEditedRecord = (event: React.FormEvent) => {
    event.preventDefault();

    if (editIndex >= 0) {
      const newRecords = [...records];

      newRecords[editIndex] = { date, distance: Number(distance) };
      newRecords.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setRecords(newRecords);
      setDate("");
      setDistance("");
      setEditIndex(-1);
    }
  };

  const handleEditRecord = (index: number) => {
    const recToEdit = records[index];
    setDate(recToEdit.date);
    setDistance(recToEdit.distance);
    setEditIndex(index);
  };

  const handleRemoveRecord = (index: number) => {
    const newRecords = records.filter((_, i) => i !== index);
    setRecords(newRecords);
  };

  return (
    <>
      <div className="inputs">
        <form className="tr" onSubmit={onSubmit}>
          <div className="inputs-headers">
            <h4 className="date-header">Дата</h4>
            <h4 className="km-header">Пройдено км</h4>
          </div>

          <input
            className="date-input"
            type="date"
            value={date}
            onChange={handleDateChange}
          />

          <input
            className="km-input"
            type="number"
            placeholder="Километры"
            step={0.1}
            min={0}
            value={distance}
            onChange={handleDistanceChange}
          />

          {editIndex === -1 ? (
            <button type="submit" className="td">
              Добавить
            </button>
          ) : (
            <button onClick={saveEditedRecord} className="td">
              Ok
            </button>
          )}
        </form>
      </div>
      <table style={{ marginTop: "50px" }} width={550}>
        <thead>
          <tr className="records-headers">
            <th scope="col">Дата</th>
            <th scope="col">Пройдено км</th>
            <th scope="col" colSpan={2}>
              Действия
            </th>
          </tr>
        </thead>
        <tbody className="records">
          {records.map((item, index) => (
            <tr key={index}>
              <td scope="row">{item.date.split("-").reverse().join(".")}</td>
              <td scope="row">{item.distance}</td>
              <td scope="row" onClick={() => handleEditRecord(index)}>
                ✎
              </td>
              <td scope="row" onClick={() => handleRemoveRecord(index)}>
                ✘
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}