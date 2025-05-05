"use client";

import React, { useState } from 'react';
import { Calendar, momentLocalizer, Event, View, NavigateAction } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useTasks } from '@/context/taskContext';
import 'react-datepicker/dist/react-datepicker.css';
import 'moment/locale/es';
moment.locale('es');

interface Task {
    _id: string;
    title: string;
    dueDate: string | number | Date;
    description?: string;
}

const localizer = momentLocalizer(moment);

const messagesEs = {
    today: 'Hoy',
    previous: 'Anterior',
    next: 'Siguiente',
    month: 'Mes',
    week: 'Semana',
    allDay: 'Todo el día',
    date: 'Fecha',
    time: 'Hora',
    event: 'Evento',
    noEventsInRange: 'No hay eventos en este rango',
};

const CalendarPageView: React.FC = () => {
    const { tasks } = useTasks();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentView, setCurrentView] = useState<'month' | 'week'>('month');
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const months = moment.monthsShort();
    const currentYear = currentDate.getFullYear();

    const events = tasks.map((task: Task) => ({
        title: task.title,
        start: new Date(task.dueDate),
        end: new Date(task.dueDate),
        allDay: false,
        resource: task,
    }));

    const handleNavigate = (newDate: Date, view: View, action: NavigateAction) => {
        setCurrentDate(newDate);
    };

    const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newMonth = parseInt(event.target.value, 10);
        setCurrentDate(new Date(currentDate.getFullYear(), newMonth, 1));
    };

    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newYear = parseInt(event.target.value, 10);
        setCurrentDate(new Date(newYear, currentDate.getMonth(), 1));
    };

    const handleViewChange = (newView: 'month' | 'week') => {
        setCurrentView(newView);
    };

    const handleSelectEvent = (event: Event) => {
        setSelectedTask(event.resource as Task);
    };

    const handleClosePreview = () => {
        setSelectedTask(null);
    };

    return (
        <div className="p-8">
            <h2 className="text-2xl font-semibold mb-4">Calendario de Tareas</h2>
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                    <select value={currentDate.getMonth()} onChange={handleMonthChange} className="mr-2">
                        {months.map((month, index) => (
                            <option key={index} value={index}>{month}</option>
                        ))}
                    </select>
                    <select value={currentDate.getFullYear()} onChange={handleYearChange} className="mr-2">
                        {Array.from({ length: 10 }, (_, i) => currentYear - 5 + i).map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Botones Mes y Semana MOVIDOS a esta ubicación (donde estaba Hoy/Anterior/Siguiente) */}
            <div className="flex items-center mb-4">
                <button
                    className={`mr-2 px-4 py-2 rounded ${currentView === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                    onClick={() => handleViewChange('month')}
                >
                    Mes
                </button>
                <button
                    className={`mr-2 px-4 py-2 rounded ${currentView === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                    onClick={() => handleViewChange('week')}
                >
                    Semana
                </button>
                {/* Controles "Hoy", "Anterior", "Siguiente" y visualización de fecha (originalmente aquí) se han reemplazado */}
            </div>

            {currentView === 'month' && (
                <div style={{ height: 600 }}>
                    <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        titleAccessor="title"
                        views={['month']}
                        defaultView="month"
                        date={currentDate}
                        onNavigate={handleNavigate}
                        onSelectEvent={handleSelectEvent}
                        messages={messagesEs}
                    />
                </div>
            )}

            {currentView === 'week' && (
                <div style={{ height: 600 }}>
                    <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        titleAccessor="title"
                        views={['week']}
                        defaultView="week"
                        date={currentDate}
                        onNavigate={handleNavigate}
                        onSelectEvent={handleSelectEvent}
                        messages={messagesEs}
                    />
                </div>
            )}

            {selectedTask && (
                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded shadow-md z-50">
                    <h3 className="text-lg font-semibold mb-2">{selectedTask.title}</h3>
                    <p>Fecha de Vencimiento: {moment(selectedTask.dueDate).format('LL')}</p>
                    {selectedTask.description && <p className="mb-2">Descripción: {selectedTask.description}</p>}
                    <button onClick={handleClosePreview} className="mt-4 px-4 py-2 bg-gray-300 rounded">Cerrar</button>
                </div>
            )}
        </div>
    );
};

export default CalendarPageView;