import { create } from "zustand";
import axios from "axios";
import { toast } from "react-hot-toast";

export const useNoteStore = create((set, get) => ({
    noteAdded: false,
    noteDeleted: false,
    notes: [],
    note: {},
    categories: [],
    
    addNote: async (note) => {
        const { addCategory } = get();
        try {
            const category = await addCategory(note.category);
            await axios.post("https://notes-app-react-drf-som3.onrender.com/api/v1/notes/", {
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
            const response = await axios.get("https://notes-app-react-drf-som3.onrender.com/api/v1/notes/?format=json");
            set({ notes: response.data });
        } catch (error) {
            console.error("Error fetching notes:", error);
            toast.error("Failed to fetch notes. Please try again.");
        }
    },

    getNote: async (id) => {
        try {
            const response = await axios.get(`https://notes-app-react-drf-som3.onrender.com/api/v1/notes/${id}/?format=json`);
            set({ note: response.data });
        } catch (error) {
            console.error("Error fetching note:", error);
            toast.error("Failed to fetch note. Please try again.");
        }
    },

    editNote: async (id, data) => {
    const { editCategory } = get();
    try {
        if (data.category_id) {
            await editCategory(data.category_id, data.category);
        }
        
        const response = await axios.put(`https://notes-app-react-drf-som3.onrender.com/api/v1/notes/${id}`, {
            title: data.title,
            content: data.content,
            category: data.category
        });
        
        if (response.status === 200) {
            toast.success("Note edited successfully");
        }
    } catch (error) {
        console.error("Error editing note:", error);
        toast.error("Failed to edit note. Please try again.");
    }
},

    deleteNote: async(id) => {
        return await axios.delete(`https://notes-app-react-drf-som3.onrender.com/api/v1/notes/${id}`)
        .then(() => {
            toast.success("Note deleted successfully");
            set({noteDeleted: true});
        })
        .catch((e) => {
            toast.error("Error while deleting notes");
        });
    },

    addCategory: async (category) => {
        try {
            const response = await axios.post("https://notes-app-react-drf-som3.onrender.com/api/v1/category/", { category });
            return response.data;
        } catch (error) {
            console.error("Error adding category:", error);
            toast.error("Failed to add category. Please try again.");
            throw error;
        }
    },

    getCategories: async () => {
        try {
            const response = await axios.get("https://notes-app-react-drf-som3.onrender.com/api/v1/category/?format=json");
            set({ categories: response.data });
        } catch (error) {
            console.error("Error fetching categories:", error);
            toast.error("Failed to fetch categories. Please try again.");
        }
    },

    editCategory: async (id, category) => {
        try {
            await axios.put(`https://notes-app-react-drf-som3.onrender.com/api/v1/category/${id}/`, { category });
        } catch (error) {
            console.error("Error editing category:", error);
            toast.error("Failed to edit category. Please try again.");
        }
    },

    deleteCategory: async(id) => {
        return await axios.delete(`https://notes-app-react-drf-som3.onrender.com/api/v1/category/${id}/`)
        .catch((e) => {
            console.log("Error in deleting category", e);
        });
    },

}));