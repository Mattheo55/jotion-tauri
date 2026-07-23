import { Calendar as BigCalendar, momentLocalizer, View, Views } from 'react-big-calendar';
import moment from 'moment/min/moment-with-locales';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getSettings } from '@/service/SettingsService';
import { useEffect, useState } from 'react';
import { SettingsInterface } from '@/interface/settingsInterface';
import ICAL from 'ical.js';
import { fetch } from '@tauri-apps/plugin-http';

moment.locale('fr')
const localizer = momentLocalizer(moment)

export default function Calendar() {
  const [settings, setSettings] = useState<SettingsInterface |null>(null);
  const [events, setEvents] = useState([]);
  const [view, setView] = useState<View>(Views.WEEK);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    getSettings().then(setSettings);
  }, []);

  useEffect(() => {
    const fetchAndParseICal = async () => {
      if (!settings?.general.calendarUrl) return; 

      try {
        const response = await fetch(settings.general.calendarUrl, {
          method: 'GET',
        });
        const icalText = await response.text()

        const jcalData = ICAL.parse(icalText);
        const comp = new ICAL.Component(jcalData);
        
        const vevents = comp.getAllSubcomponents('vevent');
        
        const formattedEvents = vevents.map((vevent) => {
          const event = new ICAL.Event(vevent);
          return {
            id: event.uid,
            title: event.summary,
            start: event.startDate.toJSDate(),
            end: event.endDate.toJSDate(),
          };
        });

        setEvents(formattedEvents as any);
      } catch (error) {
        console.error("Erreur lors de la récupération du calendrier iCal:", error);
      }
    };

    fetchAndParseICal();
  }, [settings?.general.calendarUrl]);

  const minTime = new Date();
  minTime.setHours(7,0,0);

  return (
    <div className="bg-[#1C1C1C] w-full p-5 h-full">
        <p className="text-3xl font-bold select-none">Calendrier</p>

        <div className='h-full'>
            <BigCalendar
              localizer={localizer}
              events={events}
              startAccessor={"start"}
              endAccessor={"end"}
              className='h-full'
              view={view}
              min={minTime}
              onView={(newView) => setView(newView)}
              date={date}
              onNavigate={(newDate) => setDate(newDate)}
              messages={{
                next: "Suivant",
                previous: "Précendent",
                today: "Aujourd'hui"
              }}
            />
        </div>
    </div>
  )
}
