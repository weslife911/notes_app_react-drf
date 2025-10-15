import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNoteStore } from "../store/useNoteStore"

export const UseCreateNoteMutation = () => {

    const { addNote } = useNoteStore();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => addNote(data),
        onSettled: async() => {
            await queryClient.invalidateQueries({ queryKey: ["notes"] });
        }
    });
}

export const UseCreateCategoryMutation = () => {
    const { addCategory } = useNoteStore();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => addCategory(data),
        onSettled: async() => {
            await queryClient.invalidateQueries({ queryKey: ["category"] });
        }
    });
}

export const UseDeleteNoteMutation = (id) => {
    const { deleteNote } = useNoteStore();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => deleteNote(id),
        onSettled: async() => {
            await queryClient.invalidateQueries({ queryKey: ["notes"] });
        }
    });
}

export const UseDeleteCategoryMutation = (id) => {
    const { deleteCategory } = useNoteStore();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => deleteCategory(id),
        onSettled: async() => {
            await queryClient.invalidateQueries({ queryKey: ["category"] });
        }
    });
}