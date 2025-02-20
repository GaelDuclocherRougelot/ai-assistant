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
	const [note, setNote] = useState("");
	const [title, setTitle] = useState("");
	const [mood, setMood] = useState("neutral");
	const [notes, setNotes] = useState([]);

	useEffect(() => {
		const fetchNotes = async () => {
			const notesList = await getNotes();
			setNotes(notesList);
		};

		fetchNotes();
	}, []);

	const handleSelectDate = (date) => {
		setSelectedDate(date);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await addNote({
				title: title,
				date: selectedDate,
				note: note,
				mood: mood,
			});
			toast({
				title: "Note enregistrée avec succès",
				description: "Votre note est disponible dans votre journal.",
			});
			resetForm();
		} catch (error) {
			console.error("Error saving note:", error);
		}
	};

	const resetForm = () => {
		setNote("");
		setTitle("");
		setMood("neutral");
	};

	const events = notes.map((note) => ({
		start: new Date(note.date),
		end: new Date(note.date),
		title: note.title || "Note sans titre",
	}));

	return (
		<div className="space-y-8">
			<div className="bg-white p-6 rounded-lg shadow">
				<Calendar
					localizer={localizer}
					events={events}
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
							value={title}
							onChange={(e) => setTitle(e.target.value)}
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
							value={note}
							onChange={(e) => setNote(e.target.value)}
						></Textarea>
					</div>
					<div>
						<label
							htmlFor="mood"
							className="block text-sm font-medium text-gray-700"
						>
							Humeur
						</label>
						<Select onValueChange={(value) => setMood(value)}>
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
