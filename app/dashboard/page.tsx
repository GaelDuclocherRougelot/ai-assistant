"use client";

// DashboardPage.js
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { addNote, getNotes } from "@/lib/notes";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import moment from "moment";
import "moment/locale/fr";
import { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("fr");
const localizer = momentLocalizer(moment);

const messages = {
	allDay: "Journée",
	previous: "Précédent",
	next: "Suivant",
	today: "Aujourd'hui",
	month: "Mois",
	week: "Semaine",
	day: "Jour",
	agenda: "Agenda",
	date: "Date",
	time: "Heure",
	event: "Événement",
	noEventsInRange: "Aucun événement dans cette plage.",
};

export default function DashboardPage() {
	const [selectedDate, setSelectedDate] = useState(new Date());
	//const [note, setNote] = useState("");
//	const [title, setTitle] = useState("");
//	const [mood, setMood] = useState("neutral");
	const [notes, setNotes] = useState([]);
	const [formData, setFormData] = useState({
		title: '',
		note: '',
		mood: '',
		noteTime: '', // Initialiser à une valeur par défaut si nécessaire
	  });
	  
	  const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData(prevState => ({
		  ...prevState,
		  [name]: value,
		}));
	  };
	// useEffect(() => {
	// 	const fetchNotes = async () => {
	// 		const notesList = await getNotes();
	// 		setNotes(notesList);
		
	// 	};
	// 	fetchNotes();
	// }, []);
	const handleSubmit = async (e) => {
    e.preventDefault();
    // Assurez-vous que l'heure est correctement formatée
    const noteTime = formData.noteTime ? formData.noteTime + ':00' : '00:00:00';
    // Utilisez selectedDate pour la date et ajoutez l'heure sélectionnée
    const fullDate = new Date(moment(selectedDate).format('YYYY-MM-DD') + 'T' + noteTime);

    try {
      await addNote({
        ...formData,
        date: fullDate, // Assurez-vous que votre fonction addNote gère correctement cet objet Date
      });

      toast({
        title: "Note enregistrée avec succès",
        description: "Votre note est disponible dans votre journal.",
      });

      resetForm();

	  const notesList = await getNotes();
	  const groupedNotes = groupNotesByDate(notesList);
	  const events = createEventsFromNotes(groupedNotes);
	  setNotes(events);
    } catch (error) {
      console.error("Error saving note:", error);
    }
};
	useEffect(() => {
		const fetchNotes = async () => {
			const notesList = await getNotes();
			console.log('Notes List:', notesList);
			const groupedNotes = groupNotesByDate(notesList);
			console.log('Grouped Notes:', groupedNotes); 
			const events = createEventsFromNotes(groupedNotes);
			console.log('Events:', events);
			setNotes(events);
		  };
		fetchNotes();
	  }, []);
	const handleSelectDate = (date) => {
		setSelectedDate(date);
	};

	
	const groupNotesByDate = (notes) => {
		const grouped = {};
	  
		notes.forEach((note) => {
		  // Convertir le Timestamp en objet Date
		  const date = note.date.toDate();
		  const dateStr = moment(date).startOf('day').format();
		  if (!grouped[dateStr]) {
			grouped[dateStr] = [];
		  }
		  grouped[dateStr].push(note);
		});
	  
		return grouped;
	  };
	  const createEventsFromNotes = (groupedNotes) => {
		let events = [];
		Object.entries(groupedNotes).forEach(([date, notes]) => {
		  notes.forEach(note => {
			const startDate = note.date.toDate(); 
			const endDate = new Date(startDate.getTime() + (60 * 60 * 1000)); 
	  
			events.push({
			  start: startDate,
			  end: endDate,
			  title: note.title || "Note sans titre",
			});
		  });
		});
	  
		return events;
	  };

	  const resetForm = () => {
		setFormData({
		  title: '',
		  note: '',
		  mood: '',
		  noteTime: '',
		});
	  };

	// const events = notes.map((note) => ({
	// 	start: new Date(note.date),
	// 	end: new Date(note.date),
	// 	title: note.title || "Note sans titre",
	// }));

	return (
		<div className="space-y-8 h-screen">
			<div className="bg-white p-6 rounded-lg shadow">
				<Calendar
					localizer={localizer}
					events={notes}
					startAccessor="start"
					endAccessor="end"
					style={{ height: 700 }}
					onSelectSlot={({ start }) => handleSelectDate(start)}
					selectable
					messages={messages}
					formats={{
						monthHeaderFormat: "MMMM YYYY",
						weekdayFormat: "dddd",
						dayHeaderFormat: "dddd D MMMM",
					}}
				/>
			</div>
			<div className="bg-white p-6 rounded-lg shadow">
				<h2 className="text-xl font-semibold mb-4">
					Ajouter une note pour le {moment(selectedDate).format("LL")}
				</h2>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label
							htmlFor="title"
							className="block text-sm font-medium text-gray-700"
						>
							Titre
						</label>
						<Input
							id="title"
							type="text"
							className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
							value={formData.title}
							onChange={(e) => setFormData({...formData, title: e.target.value})}
						/>
					</div>
					<div>
						<label
							htmlFor="note"
							className="block text-sm font-medium text-gray-700"
						>
							Note
						</label>
						<Textarea
							id="note"
							rows={4}
							className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
							value={formData.note}
							onChange={(e) => setFormData({...formData, note: e.target.value})}
						></Textarea>
					</div>
					<div>
					
						<div>
						<label
							htmlFor="noteTime"
							className="block text-sm font-medium text-gray-700"
						>
							Heure
						</label>
						<input
							type="time"
							id="noteTime"
							name="noteTime"
							className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
							value={formData.noteTime}
							onChange={(e) => setFormData({...formData, noteTime: e.target.value})}
							required
						/>
						</div>	
						<label
							htmlFor="mood"
							className="block text-sm font-medium text-gray-700"
						>
							Humeur
						</label>
						<Select onValueChange={(value) => setFormData({...formData, mood: value})}>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Selectionner une humeur" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Humeurs</SelectLabel>
									<SelectItem value="happy" className="p-2">
										😊 Heureux
									</SelectItem>
									<SelectItem value="neutral" className="p-2">
										😐 Neutre
									</SelectItem>
									<SelectItem value="sad" className="p-2">
										😢 Triste
									</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
					<button
						type="submit"
						className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
					>
						Enregistrer
					</button>
				</form>
			</div>
		</div>
	);
}
