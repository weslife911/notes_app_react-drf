import { useQuery } from "@tanstack/react-query"
import { useNoteStore } from "../store/useNoteStore"

export const UseGetCategoriesQuery = () => {

    const { getCategories } = useNoteStore();
    
    return useQuery({
        queryKey: ["category"],
        queryFn: getCategories
    });

}

export const UseGetNotesQuery = () => {
    const { getNotes } = useNoteStore();

    return useQuery({
        queryKey: ["notes"],
        queryFn: getNotes
    });
};


export const UseGetNoteQuery = (id) => {
    const { getNote } = useNoteStore();
    return useQuery({
        queryKey: ["notes", { id: parseInt(id) }],
        queryFn: () => getNote(id)
    });
};