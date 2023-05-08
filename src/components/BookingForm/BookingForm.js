import React, { useState, useRef, useCallback } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { FaCalendarAlt } from 'react-icons/fa';
import "react-datepicker/dist/react-datepicker.css";
import './BookingForm.css';
import {
    towerOptions,
    floorOptions,
    roomOptions,
    timeOptions,
    lastDayOfYear
} from '../../utils/constants';
import InfoToolTip from '../InfoToolTip/InfoToolTip';

function BookingForm() {

    const [showPopup, setShowPopup] = useState(false);

    const [bookingData, setBookingData] = useState({
        tower: '',
        floor: '',
        room: '',
        date: '',
        time: '',
        comment: '',
    });

    // устанавливаем значение из выпадающего меню
    const handleSelectChange = useCallback((selectedOption, actionMeta) => {
        const { name, value } = actionMeta;
        setBookingData(prevBookingData => ({
            ...prevBookingData,
            [name]: value,
        }));
    }, []);

    // функция для выбора даты 
    const handleDateChange = useCallback((date) => {
        setBookingData(prevBookingData => ({ 
            ...prevBookingData, 
            date 
        }));
    }, []);

    //открыть календарь по клику на иконку календаря
    const datePickerRef = useRef(null);
    const handleDateIconClick = useCallback(() => {
        datePickerRef.current.setFocus();
    }, []);

    // функция для ввода текста в поле комментария
    const handleCommentChange = useCallback((event) => {
        const { value } = event.target;
        setBookingData(prevBookingData => ({
            ...prevBookingData,
            comment: value,
        }));
    }, []);

    // отправка данных формы
    const handleSubmit = useCallback((event) => {
        event.preventDefault();
        setShowPopup(true);
        console.log('Booking data:', bookingData);
    }, [bookingData]);
    
    // очищение всех полей формы
    const handleClear = useCallback(() => {
        setBookingData({
            tower: '',
            floor: '',
            room: '',
            date: '',
            time: '',
            comment: '',
        });
    }, []);

    // установить стили для полей react-select 
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            height: "30px",
            fontSize: "13px",
            maxWidth: "350px",
            borderRadius: "4px",
            boxShadow: "none",
            borderColor: state.hasValue ? "#000" : "#a9a2a2",
            transition: "box-shadow .3s ease-in-out",
            "&:hover": {
                boxShadow: "0 0 5px #a9a2a2",
                cursor: "pointer"
            },
            paddingLeft: "30px",
            caretColor: "transparent",
        }),
        menuList: (provided) => ({
            ...provided,
            padding: "10px",
            maxHeight: "170px",
            overflowY: "auto"
        }),
        option: (provided, state) => ({
            ...provided,
            color: state.isSelected ? "#fff" : "#444",
            backgroundColor: state.isSelected ? "#0074d9" : "#fff",
            "&:hover": {
                backgroundColor: state.isSelected ? "#0074d9" : "#f1f1f1",
                cursor: "pointer"
            },
            cursor: "pointer"
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
        singleValue: (provided, state) => ({
            ...provided,
            color: state.hasValue !== '' ? "#000" : "#a9a2a2"
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
                    value={bookingData.tower}
                    options={towerOptions}
                    onChange={handleSelectChange}
                    styles={customStyles}
                    placeholder="Выберите башню А или Б"
                    required
                />

                <label htmlFor="floor"
                    className="booking__label">Этаж:</label>
                <Select
                    id="floor"
                    name="floor"
                    value={bookingData.floor}
                    options={floorOptions}
                    onChange={handleSelectChange}
                    styles={customStyles}
                    placeholder="Выберите этаж с 3 по 27"
                    required
                />
                <label htmlFor="room"
                    className="booking__label">Переговорная:</label>
                <Select
                    id="room"
                    name="room"
                    value={bookingData.room}
                    options={roomOptions}
                    onChange={handleSelectChange}
                    styles={customStyles}
                    placeholder="Выберите номер комнаты с 1 по 10"
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
                        showPopperArrow={false}
                        ref={datePickerRef}
                        placeholderText="DD.MM.YYYY"
                        required
                    />
                    <div className="booking__icon-container">
                        <FaCalendarAlt className="booking__icon"
                            onClick={handleDateIconClick}
                        />
                    </div></div>

                <label htmlFor="time"
                    className="booking__label">Время:</label>
                <Select
                    id="time"
                    name="time"
                    value={bookingData.time}
                    options={timeOptions}
                    onChange={handleSelectChange}
                    styles={customStyles}
                    placeholder="Выберите время с 09:00 до 19:30"
                    required
                />

                <label htmlFor="comment"
                    className="booking__label">Комментарий:</label>
                <textarea
                    className="booking__comment-input"
                    id="comment"
                    name="comment"
                    value={bookingData.comment}
                    onChange={handleCommentChange}
                    placeholder="Что еще нам следует знать о вашей брони?"
                    maxLength={200}
                />

                <button
                    className="booking__button"
                    type="submit">Отправить</button>
                <button
                    className="booking__button"
                    type="button" onClick={handleClear}>
                    Очистить
                </button>
            </form>
            {showPopup && (<InfoToolTip isOpen={true} onClose={() => {
            setShowPopup(false) }}/>)}
        </div>
    );
};

export default BookingForm;
