import React, { useState, useRef } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { FaCalendarAlt } from 'react-icons/fa';
import "react-datepicker/dist/react-datepicker.css";
import './BookingForm.css';

function BookingForm() {
    const [bookingData, setBookingData] = useState({
        tower: '',
        floor: '',
        room: '',
        date: null,
        time: '',
        comment: '',
    });

    const handleInputChange = (name, value) => {
        setBookingData(prevBookingData => (
            {
                ...prevBookingData,
                [name]: value
            }
        ));
    };

    const handleSelectChange = (selectedOption, actionMeta) => {
        handleInputChange(actionMeta.name, selectedOption.value);
    };

    const handleDateChange = (date) => {
        setBookingData({ ...bookingData, date });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(JSON.stringify(bookingData));
    };

    const handleClear = () => {
        setBookingData({
            tower: '',
            floor: '',
            room: '',
            date: null,
            time: '',
            comment: '',
        });
    };

    const towerOptions = [
        { value: 'A', label: 'Башня А' },
        { value: 'B', label: 'Башня Б' },
    ];

    const floorOptions = [...Array(25)].map((_, index) => (
        {
            value: `${index + 3}`,
            label: `${index + 3}`
        }
    ));

    const roomOptions = [...Array(10)].map((_, index) => (
        {
            value: `${index + 1}`,
            label: `${index + 1}`
        }
    ));

    const lastDayOfYear = new Date(new Date().getFullYear(), 11, 31);

    const datePickerRef = useRef(null);

    const handleDateIconClick = () => {
      datePickerRef.current.setFocus();
    };

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            height: "30px",
            fontSize: "13px",
            maxWidth: "350px",
            borderRadius: "4px",
            boxShadow: "none",
            borderColor: state.hasValue ? "#000" : "#a9a2a2",
            "&:hover": {
                boxShadow: "0 0 5px #a9a2a2",
                cursor: "pointer"
            }
        }),
        option: (provided, state) => ({
            ...provided,
            color: state.isSelected ? "#fff" : "#444",
            backgroundColor: state.isSelected ? "#0074d9" : "#fff",
            "&:hover": {
                backgroundColor: state.isSelected ? "#0074d9" : "#f1f1f1"
            }
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            color: "#a9a2a2",
            fontSize: "13px",
            "&:hover": {
                color: "#000",
                cursor: "pointer"
            }
        }),
        singleValue: (provided, { selectProps: { value } }) => ({
            ...provided,
            color: value !== '' ? "#000" : "#a9a2a2"
        })
    };

    return (
        <div className="booking">
            <form onSubmit={handleSubmit}
                className="booking__form">
                <h1 className="booking__title">Забронировать переговорную комнату</h1>
                <label htmlFor="tower"
                    className="booking__label">Башня:</label>
                <Select
                    id="tower"
                    name="tower"
                    value={towerOptions.filter(option => option.value === bookingData.tower)}
                    options={towerOptions}
                    onChange={handleSelectChange}
                    styles={customStyles}
                    placeholder="Выберите башню"
                    required
                />

                <label htmlFor="floor"
                    className="booking__label">Этаж:</label>
                <Select
                    id="floor"
                    name="floor"
                    value={floorOptions.filter(option => option.value === bookingData.floor)}
                    options={floorOptions}
                    onChange={handleSelectChange}
                    styles={customStyles}
                    placeholder="Выберите этаж"
                    required
                />

                <label htmlFor="room"
                    className="booking__label">Переговорная:</label>
                <Select
                    id="room"
                    name="room"
                    value={roomOptions.filter(option => option.value === bookingData.room)}
                    options={roomOptions}
                    onChange={handleSelectChange}
                    styles={customStyles}
                    placeholder="Выберите номер комнаты"
                    required
                />
                <div className="booking__container">
                    <label htmlFor="date"
                        className="booking__label">Дата:</label>
                    <DatePicker
                        className="booking__input"
                        selected={bookingData.date}
                        onChange={handleDateChange}
                        dateFormat="dd.MM.yyyy"
                        minDate={new Date()}
                        maxDate={lastDayOfYear}
                        required
                        showPopperArrow={false} 
                        ref={datePickerRef}
                    />
                    <div className="booking__icon-container">
                        <FaCalendarAlt className="booking__icon" 
                        onClick={handleDateIconClick}
                        />
                    </div></div>

                <label htmlFor="time"
                    className="booking__label">Время:</label>
                <input
                    className="booking__input"
                    id="time"
                    type="time"
                    value={bookingData.time}
                    onChange={(e) => handleInputChange("time", e.target.value)}
                    required
                />

                <label htmlFor="comment"
                    className="booking__label">Комментарий:</label>
                <textarea
                    id="comment"
                    value={bookingData.comment}
                    className="booking__input"
                    onChange={(e) => handleInputChange("comment", e.target.value)}
                    required
                />

                <button type="submit">Отправить</button>
                <button type="button" onClick={handleClear}>
                    Очистить
                </button>
            </form>
        </div>
    );
};

export default BookingForm;
