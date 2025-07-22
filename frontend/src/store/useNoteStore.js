import { create } from "zustand";
import axios from "axios";
import { toast } from "react-hot-toast";

export const useNoteStore = create((set, get) => ({
    noteAdded: false,
    notes: [],
    note: {},
    categories: [],
    
    addNote: async (note) => {
        const { addCategory } = get();
        try {
            const category = await addCategory(note.category);
            await axios.post("http://localhost:8000/api/v1/notes/", {
                title: note.title,
                content: note.content,
                category: category.id,
            });

            set({ noteAdded: true });
            toast.success("Note added successfully!");
        } catch (error) {
            console.error("Error adding note:", error);
            set({ noteAdded: false });
            toast.error("Failed to add note. Please try again.");
        } finally {
            set({ noteAdded: false });
        }
    },

    getNotes: async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/v1/notes/?format=json");
            set({ notes: response.data });
        } catch (error) {
            console.error("Error fetching notes:", error);
            toast.error("Failed to fetch notes. Please try again.");
        }
    },

    getNote: async (id) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/notes/${id}/?format=json`);
            set({ note: response.data });
        } catch (error) {
            console.error("Error fetching note:", error);
            toast.error("Failed to fetch note. Please try again.");
        }
    },

    editNote: async(id) => {
        
    },

    addCategory: async (category) => {
        try {
            const response = await axios.post("http://localhost:8000/api/v1/category/", { category });
            return response.data;
        } catch (error) {
            console.error("Error adding category:", error);
            toast.error("Failed to add category. Please try again.");
            throw error;
        }
    },

    getCategories: async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/v1/category/?format=json");
            set({ categories: response.data });
        } catch (error) {
            console.error("Error fetching categories:", error);
            toast.error("Failed to fetch categories. Please try again.");
        }
    },
}));